import client from './config'
import bcrypt from 'bcrypt'

export default async function createUser(req, res) {
  const { tel, password } = JSON.parse(req.body)
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        const newUser = await client.create({
          _type: 'user',
          tel,
          password: hash,
          level: 1,
          roi: 0,
          ri: 0,
          tbalance: 0
        })
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
          userTel: newUser?.Tel
        })

        const updateTbalance = await client
          .patch(newUser?._id)
          .dec({ tbalance: 300 })
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
          remaining: 300
        })

      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Couldn't create user`, err })
      }
      return res.status(200).json({ message: 'success' })
    });
  });
}