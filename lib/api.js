// publishedAt desc, _updatedAt desc

import client, { previewClient } from './sanity'

export const postFields = `
  _id,
  publishedAt,
  _createdAt,
  _updatedAt,
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getAllInvestmentPlan() {
  const res = await client.fetch(`*[_type == "investmentPlan" && title != 'Signup Bonus'] | order(title asc)`,
  ).catch(error => {
    // console.log('getAllInvestmentPlan', error)
  })
  if (res) {
    return res
  }
  return null
}

export async function getUser(tel) {
  const res = await client.fetch(
    `*[_type == "user" && tel == $tel] | order(_createdAt desc)[0]`,
    { tel }
  ).catch(error => {
    // console.log('getUser', error)
  })

  if (res) {
    return res
  }
  return null
}

export async function getOrders() {
  const order = await client.fetch(`*[_type == "order"] | order(_createdAt desc)`
  ).catch(error => {
    console.log('getOrders error', error)
  })

  if (order) {
    return order
  }
  return null
}

export async function buyInvestmentPlan(plan, user) {
  var message = "success"
  const da = plan?.da
  const res = await client.create({
    _type: 'order',
    planId: plan?._id,
    planTitle: plan?.title,
    percentage: plan?.percentage,
    da: plan?.da,
    dr: plan?.dr,
    returnPeriod: plan?.returnPeriod,
    drTime: plan?.drTime,
    userId: user?._id,
    userTel: user?.Tel
  })
    .catch(error => {
      // console.log('buyInvestmentPlan', error)
    })

  const res2 = await client
    .patch(user?.id)
    .dec({ myTicket: da })
    .commit()
    .catch(error => {
      console.log('update user profile', error)
    })

  return { message }
}

export async function depositWithBalance(user, amount) {
  var message = "success"
  const res = await client
    .patch(user?.id)
    .dec({ balance: amount })
    .inc({ myTicket: amount })
    .commit()
    .catch(error => {
      console.log('getUser', error)
    })

  // log it to the ticket record and balance record
  console.log(res)
  return { message }
}

export async function updateUserPortfolio(user) {
  const order = await client.fetch(`*[_type == "order"] | order(_createdAt desc)`
  ).catch(error => {
    console.log('userInvestments error', error)
  })

  console.log(order)

  const lastChecked = user?.lastChecked
  const today = new Date()
  console.log('today, lastChecked ==>>')
  console.log(today, lastChecked)

  // if((today - lastChecked) > 24){
  //   const userInvestments = await client.fetch(`*[_type == "order" && user._ref == $id] | order(_createdAt desc)`,
  //   {id: user._id}
  //   ).catch(error => {
  //     console.log('userInvestments error', error)
  //   })
  //   console.log(userInvestments)
  // }
}
