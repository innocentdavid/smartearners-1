import { hasWithdrawToday } from '../../lib/functions'
import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  if (b[0] === 'withdraw') {
    const user = b[1]
    const amount = b[2]

    // user can only withdraw once a day
    console.log('hasWithdrawToday(user?._id)', await hasWithdrawToday(user?.lastWithdrawDate))
    if (await hasWithdrawToday(user?.lastWithdrawDate)) {
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

  if(b[0] === 'getWithdrawRecord') {
    const userId = b[1]
    const data = await client.fetch(`*[_type == "withdraw" && userId == $userId] | order(_createdAt desc)`, { userId }
    ).catch(error => {
      console.log('getWithdrawRecord error', error)
      return res.status(500).json({ message: "error", error })
    })
    if (data) {
      return res.status(200).json({ message: "success", data })
    }
    return res.status(500).json({ message: "error" })
  }

  res.status(200).json({ message: '...' })
}