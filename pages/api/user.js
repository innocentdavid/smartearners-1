import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  if (b[0] === 'buyInvestmentPlan') {
    const plan = b[1]
    const user = b[2]

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

  if (b[0] === 'updateUserPortfolio') {
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
        // createRecord
        const createRecord = await client.create({
          _type: 'record', title: item.planTitle, category: 'balanceRecord', type: 'income', amount: item.da, remaining: 0, userId: user._id, userTel: user.tel
        })
          .catch(error => {
            console.log('update user profile', error)
          })
        console.log(createRecord)

        // update user
        await client
          .patch(user._id)
          .inc({ roi: item.dr })
          .commit()
          .catch(error => {
            console.log('update user profile', error)
          })
      });
    }
  }

  console.log(b[0])
  if (b[0] === 'getOrders') {
    const orders = await client.fetch(`*[_type == "order"] | order(_createdAt desc)`
    ).catch(error => {
      console.log('getOrders error', error)
      res.status(500).json({ message: 'An error occured', error })
    })
    console.log(orders)
    return res.status(200).json(orders)
  }

  res.status(200).json({ message: '...' })
}
