import { getUser, getUserById } from '../../lib/api'
import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  // index investNow()
  if (b[0] === 'buyInvestmentPlan') {
    const plan = b[1]
    const u = b[2]
    await getUserById(u?._id)
    await getUserById(u?._id)
    await getUserById(u?._id)
    await getUserById(u?._id)
    const user = await getUserById(u?._id)
    console.log(user)

    // console.log(user?.myTicket, plan?.da)
    // return res.status(500).json({ message: 'unexpected' })

    if (!user?.myTicket || user.myTicket <= 0) {
      res.status(500).json({ message: 'unexpected' })
    }

    if (user?.myTicket >= plan?.da) {
      const userValidRefers = await client.fetch(`*[_type == "validRef" && referrer._ref == $userId] | order(_createdAt desc)`, { userId: user._id }
      ).catch(error => {
        // console.log('getAllBalanceRecord error', error)
        // return res.status(500).json({ message: "error", error })
      })

      if (plan.title === 'Level 07' && userValidRefers?.length < 3) {
        return res.status(500).json({ message: "You must have 3 active level 3 members" })
      }

      if (plan.title === 'Level 08' && userValidRefers?.length < 4) {
        return res.status(500).json({ message: "You must have 3 active level 4 members" })
      }

      // const createOrder = 
      await client.create({
        _type: 'order',
        planId: plan?._id,
        planTitle: plan?.title,
        percentage: plan?.percentage,
        da: plan?.da,
        dr: plan?.dr,
        active: true,
        returnPeriod: plan?.returnPeriod,
        drTime: plan?.drTime,
        userId: user?._id,
        userTel: user?.tel
      })
        .catch(error => {
          console.log('update user profile', error)
          res.status(500).json({ message: error })
        })
      // console.log('createOrder', createOrder)

      // const update Tbalance = 
      await client.patch(user?._id).dec({ myTicket: plan.da }).set({lastPurchaseDate: new Date()}).commit()
        .catch(error => {
          // console.log('update user profile', error)
          res.status(500).json({ message: 'error', error })
        })

      res.status(200).json({ message: 'success' })
    }
    res.status(500).json({ message: 'error' })
  }

  //updateAccount.js
  if (b[0] === 'addBankDetails') {
    const userId = b[1]
    const data = b[2]
    await client
      .patch(userId)
      .set({ accountNumber: parseInt(data.number), accountName: data.name, bank: data.bank })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
        return res.status(500).json({ message: 'failed', error })
      })
    return res.status(200).json({ message: 'success' })
  }

  // page == profile.js through lib/api.js
  if (b[0] === 'updateUserPortfolio') {
    const u = b[1]
    const item = b[2]
    const user = await getUserById(u?._id)
    // update user
    let a = await client
      .patch(user._id)
      .inc({ roi: item.dr })
      .set({ lastChecked: new Date() })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
        return res.status(500).json({ message: 'failed', error })
      })
    // console.log("aaaaaaaaaa", a)

    if (a) {
      // create daily return record
      let b = await client.create({
        _type: 'dailyReturn',
        user: { _type: 'reference', _ref: user._id },
        investmentPlan: { _type: 'reference', _ref: item.planId },
      }).catch(error => {
        console.log('dailyReturn', error)
      })
      // console.log('bbbbbbbbbbbbbbbbbbbbbbbb', b)

      // create Balance Record for user
      const c = await client.create({
        _type: 'record', title: item.planTitle, category: 'balanceRecord', type: 'income', amount: item.dr, remaining: 0, userId: user._id, userTel: user.tel
      }).catch(error => {
        console.log('cccccccccccccc', error)
      })
      // console.log('cccccccccccccccc', c)

      // give referrer 2% of the earning
      if (user?.referrer?._ref) {
        const dr = parseInt(item.dr)
        const commission = 0.02 * dr

        let e = await client
          .patch(user.referrer?._ref)
          .inc({ ri: commission })
          .commit()
          .catch(error => {
            console.log('eeeeeeeeeeeeeee', error)
            // return res.status(500).json({ message: 'failed', error })
          })
        // console.log('eeeeeeeeeeeeeee', e)

        // create BalanceRecord for referrer
        const d = await client.create({
          _type: 'record', title: 'L12%Commission', category: 'balanceRecord', type: 'income', amount: commission, remaining: 0, userId: user.referrer?._ref,
        }).catch(error => {
          console.log('dddddddddddddddddd', error)
          // return res.status(500).json({ message: 'failed', error })
        })
        // console.log('ddddddddd', d)


        // irc Record for referrer
        const f = await client.create({
          _type: 'irc', user: { _type: 'reference', _ref: user._id }, referrer: { _type: 'reference', _ref: user?.referrer._ref }, commission
        }).catch(error => {
          // console.log('update user profile', error)
          // return res.status(500).json({ message: 'failed', error })
        })
        console.log('fffffffffffffff', f)
      }
    }

    return res.status(200).json({ message: 'success' })
  }

  if (b[0] === 'depositWithBalance') {
    const u = b[1]
    const user = await getUserById(u?._id)
    const amount = b[2]

    const resp = await client
      .patch(user?._id)
      .dec({ tbalance: amount })
      .inc({ myTicket: amount })
      .commit()
      .catch(error => {
        console.log('depositWithBalance error', error)
        res.status(500).json({ message: 'An error occured', error })
      })
    // console.log(resp)
    return res.status(200).json({ message: 'success' })
  }

  if (b[0] === 'paymentProof') {
    const u = b[1]
    const user = await getUserById(u?._id)
    const amount = b[2]
    const imageUrl = b[3]

    await client.create({
      _type: 'paymentProof',
      amount, imageUrl,
      approved: "pending",
      userId: user?._id,
      userTel: user?.tel,
    }).catch(error => {
      console.log('paymentProof', error)
      return res.status(500).json({ message: "an error occured", error })
    })
    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'declineProof') {
    const itemId = b[1]

    await client
      .patch(itemId)
      .set({ approved: 'declined' })
      .commit()
      .catch(error => {
        // console.log('declineProof', error)
        return res.status(500).json({ message: "error", error })
      })
    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'approvePayment') {
    const itemId = b[1]
    const userId = b[2]
    const user = await getUserById(userId)
    const amount = b[3]
    const referrerId = user?.referrer?._ref
    const UserWasValid = user.isValid

    // credit user's 'myTicket' and make user a valid user
    const resp = await client
      .patch(userId)
      .inc({ myTicket: amount })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        return res.status(500).json({ message: "an error occured", error })
      })

    // return res.status(200).json({ message: "success", user })

    if (!resp) {
      return res.status(500).json({ message: "an error occured", resp })
    }

    await client
      .patch(itemId)
      .set({ approved: "approved" })
      .commit()
      .catch(error => {
        // console.log('update user profile', error)
        return res.status(500).json({ message: "an error occured", error })
      })


    // if user was not valid then this is his new time to be validated, so add him to valid refer
    try {
      if (!UserWasValid && referrerId) {
        await client.create({
          _type: 'validRef',
          user: { _type: 'reference', _ref: userId, },
          referrer: { _type: 'reference', _ref: referrerId, },
        }).catch(error => {
          console.log('paymentProof', error)
          // res.status(500).json({ message: "an error occured", error })
        })

        await client
          .patch(userId)
          .set({ isValid: true })
          .commit()
          .catch(error => {
            console.log('update user profile', error)
            // return res.status(500).json({ message: "an error occured", error })
          })
      }
    } catch (error) {
      console.log('aaaaaaaaaaa', error)
    }


    // commission....
    try {
      if (referrerId) {
        // Level 1 commission
        const commission1 = (10 * amount) / 100
        await createRfCommision(user, referrerId, commission1, amount, 1)

        const user1 = await client.fetch(`*[_type == "user" && _id == $id] | order(_createdAt asc)[0]`,
          { id: referrerId }
        ).catch(error => {
          console.log('user2222222222', error)
          // return res.status(500).json({ message: 'an error occured', error })
        })

        // Level 2 commission
        if (user1?.referrer?._id) {
          const commission2 = (5 * amount) / 100
          await createRfCommision(user, user1.referrer._id, commission2, amount, 2)

          // Level 3 commission
          const user2 = await client.fetch(`*[_type == "user" && _id == $id] | order(_createdAt asc)[0]`,
            { id: user1.referrer._id }
          ).catch(error => {
            console.log('user33333333333', error)
            // return res.status(500).json({ message: 'an error occured', error })
          })
          if (user2?.referrer?._id) {
            const commission3 = (2 * amount) / 100
            await createRfCommision(user, user2.referrer._id, commission3, amount, 3)
          }
        } else {
          // return res.status(500).json({ message: 'an error occured', error })
        }

      }
    } catch (error) {
      console.log(error)
    }

    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'getValidRefers') {
    const referrerId = b[1]
    // return res.status(500).json({ message: "error", referrerId })
    const refer = await client.fetch(`*[_type == "validRef" && referrer._ref == $referrerId] | order(_createdAt desc)
      {
        'date': _createdAt,
        'tel': user->{tel}
      }`, { referrerId }
    ).catch(error => {
      // console.log('getrefers error', error)
      // return res.status(500).json({ message: "error", error })
    })
    if (refer) {
      return res.status(200).json({ message: "success", refer })
    }
    return res.status(500).json({ message: "error" })
  }

  if (b[0] === 'getAllBalanceRecord') {
    const userId = b[1]
    const data = await client.fetch(`*[_type == "record" && userId == $userId] | order(_createdAt desc)`, { userId }
    ).catch(error => {
      console.log('getAllBalanceRecord error', error)
      return res.status(500).json({ message: "error", error })
    })
    if (data) {
      return res.status(200).json({ message: "success", data })
    }
    return res.status(500).json({ message: "error" })
  }

  if (b[0] === 'getAllPaymentRecord') {
    const userId = b[1]
    const data = await client.fetch(`*[_type == "paymentProof" && userId == $userId] | order(_createdAt desc)`, { userId }
    ).catch(error => {
      console.log('getAllPaymentRecord error', error)
      return res.status(500).json({ message: "error", error })
    })
    if (data) {
      return res.status(200).json({ message: "success", data })
    }
    return res.status(500).json({ message: "error" })
  }

  res.status(200).json({ message: '...' })
}

const createRfCommision = async (user, referrerId, commission, amount, level) => {
  console.log({ user, referrerId, commission, amount, level })
  if (user && referrerId) {
    // update referrer
    await client
      .patch(referrerId)
      .inc({ ri: commission })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
      })

    await client.create({
      _type: 'rfCommission',
      commission, depositedAmount: amount, level,
      user: { _type: 'reference', _ref: user._id },
      referrer: { _type: 'reference', _ref: referrerId },
    }).catch(error => {
      console.log('update user profile', error)
    })
    return { message: 'success' }
  }
  return { message: 'user does not have a referral' }
}

const createRfCommisionForTwoPercentage = async (user, commission, depositedAmount, level) => {
  if (user.referrer) {
    // update referrer
    await client
      .patch(user.referrer._id)
      .inc({ ri: commission })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
      })

    await client.create({
      _type: 'rfCommission',
      commission, depositedAmount, level,
      user: { _type: 'reference', _ref: user._id },
      referrer: { _type: 'reference', _ref: user.referrer._id },
    }).catch(error => {
      console.log('update user profile', error)
    })
    return { message: 'success' }
  }
  return { message: 'user does not have a referral' }
}