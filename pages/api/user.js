import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  if (b[0] === 'buyInvestmentPlan') {
    const plan = b[1]
    const user = b[2]

    console.log(user?.myTicket, plan?.da)

    if (user?.myTicket >= plan?.da) {
      const createOrder = await client.create({
        _type: 'order',
        planId: plan?._id,
        planTitle: plan?.title,
        percentage: plan?.percentage,
        da: plan?.da,
        dr: plan?.dr,
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

      const updateTbalance = await client.patch(user?._id).dec({ myTicket: plan.da }).commit()
        .catch(error => {
          console.log('update user profile', error)
          res.status(500).json({ message: error })
        })
      // console.log('updateTbalance', updateTbalance)

      res.status(200).json({ message: 'success' })
    }

    res.status(500).json({ message: 'error' })
  }

  if (b[0] === 'updateUserPortfolio') {
    // page == 
    const user = b[1]
    const lastChecked = new Date(user?.lastChecked)
    var lcMonth = lastChecked?.getUTCMonth() + 1;
    const tMonth = new Date().getUTCMonth() + 1;
    var lcDay = lastChecked?.getUTCDay() + 1;
    const tDay = new Date().getUTCDay() + 1;

    if (tMonth > lcMonth || tDay > lcDay) {
      const userInvestments = await client.fetch(`*[_type == "order" && userId == $id] | order(_createdAt desc)`,
        { id: user._id }
      ).catch(error => {
        console.log('userInvestments error', error)
      })
      userInvestments.forEach(async (item) => {
        const lastRoi = user.roi
        const lastUpdated = new Date(item._updatedAt)
        const today = new Date()        
        const gapFromCreatedDate = today - lastUpdated
        const totalEarning = gapFromCreatedDate * item.dr
        const newEarning = totalEarning - lastRoi;
        // update the users earning with the difference or gap between the createdAt and current date 
        // update user
        await client
          .patch(user._id)
          .set({ roi: totalEarning })
          .commit()
          .catch(error => {
            console.log('update user profile', error)
          })

        if(user.referrer?._ref){

        }

        // createRecord
        const createRecord = await client.create({
          _type: 'record', title: item.planTitle, category: 'balanceRecord', type: 'income', amount: newEarning, remaining: totalEarning, userId: user._id, userTel: user.tel
        })
          .catch(error => {
            console.log('update user profile', error)
          })
        console.log(createRecord)


      });
    }
  }

  if (b[0] === 'depositWithBalance') {
    const user = b[1]
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
    const user = b[1]
    const amount = b[2]
    const imageUrl = b[3]

    await client.create({
      _type: 'paymentProof',
      amount, imageUrl,
      approved: false,
      userId: user?._id,
      userTel: user?.tel,
    }).catch(error => {
      console.log('paymentProof', error)
      return res.status(500).json({ message: "an error occured", error })
    })
    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'confirmProof') {
    const itemId = b[1]
    const userId = b[2]
    const amount = b[3]
    const UserWasValid = b[4]
    const referrerId = b[5]

    await client
      .patch(itemId)
      .set({ approved: true })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
      })

    // credit user's 'myTicket' and make user a valid user
    await client
      .patch(userId)
      .inc({ myTicket: amount })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
      })

    // if user was not valid then this is his new time to be validated, so add him to valid refer and credit his referrer if any
    if (!UserWasValid && referrerId) {
      await client.create({
        _type: 'validRef',
        user: { _type: 'reference', _ref: userId, },
        referrer: { _type: 'reference', _ref: referrerId, },
      }).catch(error => {
        console.log('paymentProof', error)
        return res.status(500).json({ message: "an error occured", error })
      })

      await client
        .patch(referrerId)
        .inc({ myTicket: amount })
        .commit()
        .catch(error => {
          console.log('update user profile', error)
        })
    }

    // commission....
    return res.status(200).json({ message: "success" })
  }

  if (b[0] === 'getValidRefers') {
    const referrerId = b[1]
    const refer = await client.fetch(`*[_type == "validRef" && referrer._ref == $referrerId] | refer(_createdAt desc)
      {
        'date': _createdAt,
        'tel': user->{tel}
      }`, { referrerId }
    ).catch(error => {
      console.log('getrefers error', error)
      return res.status(500).json({ message: "error", error })
    })
    if (refer) {
      return res.status(200).json({ message: "success", refer })
    }
    return res.status(500).json({ message: "error", error })
  }






  if (b[0] === 'confirmedPayment') {
    const user = b[1]
    const data = b[2]
    const depositedAmount = data.da

    // update user
    await client
      .patch(user._id)
      .inc({ da: depositedAmount })
      .commit()
      .catch(error => {
        console.log('update user profile', error)
        return res.status(500).json({ message: 'an error occured', error })
      })

    if (user.referrer) {
      // Level 1 commission
      const commission1 = (10 * depositedAmount) / 100
      await createRfCommision(user, commission1, depositedAmount, 1)

      // Level 2 commission
      const user2 = await client.fetch(`*[_type == "user" && _id == $id] | order(_createdAt asc)[0]`,
        { id: user.referrer._id }
      ).catch(error => {
        // console.log('getAllInvestmentPlan', error)
        return res.status(500).json({ message: 'an error occured', error })
      })
      if (user2) {
        const commission2 = (5 * depositedAmount) / 100
        await createRfCommision(user2, commission2, depositedAmount, 2)
      } else {
        return res.status(500).json({ message: 'an error occured', error })
      }

      // Level 3 commission
      const user3 = await client.fetch(`*[_type == "user" && _id == $id] | order(_createdAt asc)[0]`,
        { id: user.referrer._id }
      ).catch(error => {
        // console.log('getAllInvestmentPlan', error)
        return res.status(500).json({ message: 'an error occured', error })
      })
      if (user3) {
        const commission3 = (2 * depositedAmount) / 100
        await createRfCommision(user3, commission3, depositedAmount, 3)
      }
      return res.status(500).json({ message: 'an error occured', error })
    }
    return res.status(200).json({ message: 'success' })
  }

  res.status(200).json({ message: '...' })
}

const createRfCommisionForTwoPercentage = async (referrer, commission, depositedAmount, level) => {
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

const createRfCommision = async (user, commission, depositedAmount, level) => {
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
