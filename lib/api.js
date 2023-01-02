// publishedAt desc, _updatedAt desc
import { groq } from 'next-sanity'
import { checkUserInvestments } from '../pages/api/user'
import { userAndReferrerFields } from './functions'
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

export async function getAllWithdrawRequest() {
  const res = await client.fetch(`*[_type == "withdraw" && status != 'declined'] | order(status desc, _createdAt desc)[0...100]`,
  ).catch(error => {
    console.log('getAllWithdrawRequest', error)
  })
  if (res) {
    return res
  }
  return null
}

export async function getAllPaymentProofs() {
  const res = await client.fetch(`*[_type == "paymentProof" && approved != 'declined'] | order(approved desc, _createdAt desc)[0...100]`,
  ).catch(error => {
    // console.log('getAllInvestmentPlan', error)
  })
  if (res) {
    return res
  }
  return null
}

export async function getUserById(id) {
  const res = await getClient().fetch(
    groq`*[_type == "user" && _id == $id] | order(_createdAt desc)[0]`,
    { id }
  ).catch(error => {
    // console.log('getUser', error)
  })

  if (res) {
    return res
  }
  return null
}

export async function getUser(tel) {
  const res = await getClient().fetch(
    groq`*[_type == "user" && tel == $tel] | order(_createdAt desc)[0]`,
    { tel }
  ).catch(error => {
    // console.log('getUser', error)
  })

  if (res) {
    return res
  }
  return null
}

export async function getCompanyDetails() {
  const res = await client.fetch(`*[_type == "company"] | order(_createdAt desc)[0]`
  ).catch(error => {
    console.log('getCompanyDetails error', error)
    return { message: 'an error occured', order }
  })
  // console.log(order)

  if (res) {
    return { message: 'success', res }
  }
  return null
}

export async function getOrders(userId) {
  const order = await client.fetch(`*[_type == "order" && userId == $userId && active == true] | order(_createdAt desc)`, { userId }
  ).catch(error => {
    console.log('getOrders error', error)
  })
  // console.log(order)

  if (order) {
    return { message: 'success', order }
  }
  return null
}

export async function getValidRefers(referrerId) {
  console.log(referrerId)
  const refer = await client.fetch(`*[_type == "validRef" && referrer._ref == $referrerId] | refer(_createdAt desc)
  {
    'date': _createdAt,
    'tel': user->{tel}
  }`, { referrerId }
  ).catch(error => {
    console.log('getrefers error', error)
  })
  // console.log(refer)

  if (refer) {
    return { message: 'success', refer }
  }
  return null
}

export async function fetchRfCommission(level, userId) {
  const resp = await client.fetch(`*[_type == "rfCommission" && referrer._ref == $userId && level == $level] | order(_createdAt desc){
      '_id': _id,
      'level': level,
      'depositedAmount': depositedAmount,
      'commission': commission,
      '_createdAt': _createdAt,
      ${userAndReferrerFields}     
    }`, { userId, level: parseInt(level) }
  ).catch(error => {
    // console.log('fetchRfCommission', error)
    return { message: 'error', error }
  })
  // console.log(resp)

  if (resp) {
    return { message: 'success', resp }
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

// profile.js
export async function updateUserPortfolio(u) {
  if (u) {
    const user = await getUserById(u?._id)

    const lastChecked = new Date(user?.lastChecked).getTime()
    if (lastChecked) {
      const now = new Date().getTime()
      const gap = now - lastChecked
      const dif = (gap) / (1000 * 3600 * 24)
      if (Math.floor(dif) < 1) {
        return { message: 'You have mined already' }
      }
    }

    // const allInvestmentOrders = await client.fetch(`*[_type == "order" && planId  == 'drafts.a73d9975-f00c-4078-81c2-209ac7776584'] | order(_createdAt desc)`)

    // console.log({allInvestmentOrders})
    // var count = 1
    // allInvestmentOrders.forEach(async order => {
    //   if(count === 2000) return;
    //   count ++
    //   const r = await client
    //   .patch(order._id)
    //   .set({ returnPeriod: 20, planId: 'a73d9975-f00c-4078-81c2-209ac7776584' })
    //   .commit()
    //   .catch(error => {
    //     console.error(error);
    //   })
    //   console.log(r)  
    // });

    const userInvestments = await client.fetch(`*[_type == "order" && userId == $id && active == true] | order(_createdAt desc)`,
      { id: user._id }
    ).catch(error => {
      console.log('userInvestments error', error)
    })
    
    userInvestments.forEach(async item => {
      const order = await checkUserInvestments(item)
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(['updateUserPortfolio', user, order]),
          type: 'application/json'
        })
        if (response.status == 200) {
          const resp = await response.json()
          // console.log(resp)
          // return { message: 'success', res };
        }
      } catch (err) {
        console.log(err)
        return { message: 'An error occured!', err };
      }
    });

    return { message: 'success' };
  } else {
    return { message: 'You have to login to be here' };
  }
}
