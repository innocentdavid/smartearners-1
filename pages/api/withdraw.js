import { getUserById } from '../../lib/api'
import { hasWithdrawToday } from '../../lib/functions'
import client from './config'

export default async function withdraw(req, res) {
  const b = JSON.parse(req.body)
  if (b[0] === 'withdraw') {
    const u = b[1]
    const user = await getUserById(u?._id)
    const amount = b[2]

    // user can only withdraw once a day
    console.log('hasWithdrawToday(user?._id)', await hasWithdrawToday(user?.lastWithdrawDate))
    if (await hasWithdrawToday(user?.lastWithdrawDate)) {
      return res.status(500).json({ message: 'You can only withdraw once a day, try again tomorrow.' })
    }

    // if(!canUserWithdraw(user?._id)){
    //   return res.status(500).json({ message: 'You cannot withdraw at this minute.' })
    // }

    // update user balance - dec
    await client
      .patch(user._id)
      .dec({ tbalance: amount })
      .set({ lastWithdrawDate: new Date() })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        res.status(500).json({ message: 'An error occured', error })
      })

    // createWithdrawal Record
    await client.create({
      _type: 'withdraw',
      amount,
      status: 'pending',
      userId: user?._id,
      userTel: user?.tel,
      accNo: user?.accountNumber,
      accName: user?.accountName,
      bank: user?.bank,
    }).catch(error => {
      // console.log('createWithdrawal Record', error)
      res.status(500).json({ message: 'An error occured', error })
    })

    return res.status(200).json({ message: 'success' })
  }

  if (b[0] === 'getWithdrawRecord') {
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
  // change status to string
  if (b[0] === 'declineWithdraw') {
    const itemId = b[1]
    const amount = b[2]
    const user = b[3]
    
    if (!itemId) {
      return res.status(500).json({ message: "an error occured", error })
    }

    await client
      .patch(user._id)
      .inc({ tbalance: amount })
      .set({ lastWithdrawDate: new Date() })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        res.status(500).json({ message: 'An error occured', error })
      })

    // approve the withdrawal
    await client
      .patch(itemId)
      .set({ status: 'declined' })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        return res.status(500).json({ message: "an error occured", error })
      })
    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'approveWithdraw') {
    const itemId = b[1]
    if (!itemId) {
      return res.status(500).json({ message: "an error occured", error })
    }

    // approve the withdrawal
    await client
      .patch(itemId)
      .set({ status: 'approved' })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        return res.status(500).json({ message: "an error occured", error })
      })
    return res.status(200).json({ message: "success" })
  }

  res.status(200).json({ message: '...' })
}