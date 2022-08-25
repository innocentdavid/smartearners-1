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
    console.log('getAllInvestmentPlan', error)
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
    console.log('getUser', error)
  })

  if (res) {
    return res
  }
  return null
}

// export async function createUser(tel, password) {

// }