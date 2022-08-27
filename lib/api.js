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

export async function Invest(planId, userId) {
  return 'success'
}

export async function depositWithBalance(user, amount){
  var message = "success"
  const res = await client
  .patch(user?.id)
  .dec({balance: amount})
  .inc({myTicket: amount})
  .commit()
  .catch(error => {
    console.log('getUser', error)
  })

  // log it to the ticket record and balance record
  console.log(res)
  return { message }
}

// export async function createUser(tel, password) {

// }