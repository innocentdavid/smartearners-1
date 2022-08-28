import client from './config'
import bcrypt from 'bcrypt'
import { createRecord } from '../../lib/api';

export default async function createUser(req, res) {
  const { tel, password, rf } = JSON.parse(req.body)
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        var data = {}
        if (rf) {
          data = {
            _type: 'user', tel, password: hash, level: 1, lastChecked: new Date(), roi: 0, ri: 0, myTicket: 0, tbalance: 0, referrer: { _type: 'reference', _ref: rf, },
          }
        } else {
          data = {
            _type: 'user', tel, password: hash, level: 1, lastChecked: new Date(), roi: 0, ri: 0, myTicket: 0, tbalance: 0,
          }
        }

        const newUser = await client.create()
        console.log(newUser)

        const createOrder = await client.create({
          _type: 'order',
          planId: 'drafts.a73d9975-f00c-4078-81c2-209ac7776584',
          planTitle: 'Signup Bonus',
          percentage: 1,
          da: 5000,
          dr: 50,
          returnPeriod: 365,
          drTime: newUser?._createdAt,
          userId: newUser?._id,
          userTel: newUser?.tel
        })

        const updateTbalance = await client
          .patch(newUser?._id)
          .inc({ tbalance: 300 })
          .commit()
          .catch(error => {
            console.log('update user profile', error)
          })

        const createBalanceRecord = await client.create({
          _type: 'record',
          title: 'Signup Bonus',
          category: 'balanceRecord',
          type: 'income',
          amount: 300,
          remaining: 300,
          userId: newUser._id,
          userTel: newUser.tel,
        })

        const create_Referral_Record = await client.create({
          _type: 'referral',
          user: { _type: 'reference', _ref: newUser?._id, },
          referrer: { _type: 'reference', _ref: rf, },
        })

      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Couldn't create user`, err })
      }
      return res.status(200).json({ message: 'success' })
    });
  });
}