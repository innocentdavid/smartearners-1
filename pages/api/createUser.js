import client from './config'
import bcrypt from 'bcrypt'

export default async function createUser(req, res) {
  const { tel, password } = JSON.parse(req.body)
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        await client.create({
          _type: 'user',
          tel,
          password: hash,
          level: 1,
          roi: 0,
          ri: 0,
          publishedAt: new Date()
        })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Couldn't create user`, err })
      }
      return res.status(200).json({ message: 'success' })
    });
  });
}