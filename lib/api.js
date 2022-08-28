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
  const res = await client.fetch(`*[_type == "investmentPlan" && title != 'Signup Bonus'] | order(_createdAt asc)`,
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

export async function createRecord(title, category, type, amount, remaining, userId, userTel) {
  var message = 'success'
  const createRecord = await client.create({
    _type: 'record', title, category, type, amount, remaining, userId, userTel
  })
    .catch(error => {
      // console.log('update user profile', error)
    })
  return { message }
}

export async function updateUserPortfolio(user) {
  if (user && user._id) {
    const lastChecked = new Date(user?.lastChecked)
    var lcMonth = lastChecked?.getUTCMonth() + 1;
    const tMonth = new Date().getUTCMonth() + 1;
    var lcDay = lastChecked?.getUTCDay() + 1;
    const tDay = new Date().getUTCDay() + 1;

    // if(tMonth > lcMonth || tDay > lcDay){
    const userInvestments = await client.fetch(`*[_type == "order" && userId == $id] | order(_createdAt desc)`,
      { id: user._id }
    ).catch(error => {
      console.log('userInvestments error', error)
    })
    userInvestments.forEach(async (item) => {
      // console.log(item)
      // await client
      //   .patch(user._id)
      //   .inc({ roi: item.dr })
      //   .commit()
      //   .catch(error => {
      //     console.log('update user profile', error)
      //   })
      // const r = await createRecord(item.planTitle, 'balanceRecord', 'income', item.dr, 0, user._id, user.tel)
      // console.log(r)
    });
  }
  // }    
}
