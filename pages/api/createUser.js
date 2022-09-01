import client from './config'
import bcrypt from 'bcrypt'
// import { createRecord } from '../../lib/api';

async function getUser(tel) {
  const res = await client.fetch(
    `*[_type == "user" && tel == $tel] | order(_createdAt desc)[0]`,
    { tel }
  ).catch(error => {
    // console.log('getUser', error)
  })

  if (res) {
    return res
  }
  return null
}

export default async function createUser(req, res) {
  const { tel, password, rf } = JSON.parse(req.body)
  const u = await getUser(tel);
  if(!u){
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        try {
          var data = {}
          if (rf) {
            data = {
              _type: 'user', tel, password: hash, level: 1, roi: 0, ri: 0, myTicket: 0, vrs: 0, tbalance: 300, referrer: { _type: 'reference', _ref: rf, },
            }
          } else {
            data = {
              _type: 'user', tel, password: hash, level: 1, roi: 0, ri: 0, myTicket: 0, vrs: 0, tbalance: 300,
            }
          }
  
          const newUser = await client.create(data)
          // console.log(newUser)
  
          // const create bonus Order = 
          await client.create({
            _type: 'order',
            planId: 'drafts.a73d9975-f00c-4078-81c2-209ac7776584',
            planTitle: 'Signup Bonus',
            percentage: 1,
            da: 5000,
            dr: 50,
            active: true,
            returnPeriod: 365,
            drTime: newUser?._createdAt,
            userId: newUser?._id,
            userTel: newUser?.tel
          })
  
          // const createBalanceRecord = 
          await client.create({
            _type: 'record',
            title: 'Signup Bonus',
            category: 'balanceRecord',
            type: 'income',
            amount: 300,
            remaining: 300,
            userId: newUser._id,
            userTel: newUser.tel,
          })
  
          if (rf) {
            // const create_Referral_Record = 
            await client.create({
              _type: 'referral',
              user: { _type: 'reference', _ref: newUser?._id, },
              referrer: { _type: 'reference', _ref: rf, },
            }).catch(err => {
              console.log(err)
            })
          }
  
        } catch (err) {
          console.error(err)
          return res.status(500).json({ message: `Couldn't create user`, err })
        }
        return res.status(200).json({ message: 'success' })
      });
    });
  }else{
    return res.status(409).json({ message: 'User already exist!' })
  }
}