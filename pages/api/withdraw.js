import { hasWithdrawToday } from '../../lib/functions'
import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  if (b[0] === 'withdraw') {
    const user = b[1]
    const amount = b[2]

    // user can only withdraw once a day
    if (hasWithdrawToday(user?._id)) {
      return res.status(500).json({ message: 'You can only withdraw once a day, try again tomorrow.' })
    }

    // if(!canUserWithdraw(user?._id)){
    //   return res.status(500).json({ message: 'You cannot withdraw at this minute.' })
    // }

    // createWithdrawal Record
    await client.create({
      _type: 'withdraw',
      amount,
      data: new Date(),
      status: false,
      userId: user?._id,
      userTel: user?.tel
    })
      .catch(error => {
        console.log('createWithdrawal Record', error)
        res.status(500).json({ message: error })
      })
    return res.status(200).json({ message: 'success' })
  }

  res.status(200).json({ message: '...' })
}