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
    // update user balance - dec
    await client
      .patch(user._id)
      .dec({ tbalance: amount })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        res.status(500).json({ message: 'An error occured', error })
      })

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

  if (b[0] === 'approveWithdraw') {
    const itemId = b[1]
    const user = b[2]
    const amount = b[3]
    const userId = user?._id
    const referrerId = user?.referrer?._ref
    const UserWasValid = user?.isValid

    if (!itemId) {
      return res.status(500).json({ message: "an error occured", error })
    }

    await client
      .patch(itemId)
      .set({ status: true })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        return res.status(500).json({ message: "an error occured", error })
      })

    // if user was not valid then this is his new time to be validated, so add him to valid refer and credit his referrer if any
    if (!UserWasValid) {
      await client.create({
        _type: 'validRef',
        user: { _type: 'reference', _ref: userId, },
        referrer: { _type: 'reference', _ref: referrerId, },
      }).catch(error => {
        // console.log('paymentProof', error)
        // return res.status(500).json({ message: "an error occured", error })
      })
      if (referrerId) {
        await client
          .patch(referrerId)
          .inc({ myTicket: amount })
          .commit()
          .catch(error => {
            // console.log('update user profile', error)
          })
      }

    }

    // commission....
    return res.status(200).json({ message: "success" })
  }

  res.status(200).json({ message: '...' })
}