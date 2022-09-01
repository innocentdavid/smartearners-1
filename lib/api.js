// publishedAt desc, _updatedAt desc
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
  const res = await client.fetch(`*[_type == "withdraw"] | order(status asc, _createdAt desc)[0...50]`,
  ).catch(error => {
    console.log('getAllWithdrawRequest', error)
  })
  if (res) {
    return res
  }
  return null
}

export async function getAllPaymentProofs() {
  const res = await client.fetch(`*[_type == "paymentProof"] | order(_createdAt desc)[0...50]`,
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
  const order = await client.fetch(`*[_type == "order" && userId == $userId] | order(_createdAt desc)`, { userId }
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
export async function updateUserPortfolio(user) {
  if (user && user._id) {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['updateUserPortfolio', user]),
        type: 'application/json'
      })
      if (response.status == 200) {
        const res = await response.json()
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return { message: 'success', res };
      }
    } catch (err) {
      console.log(err)
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
      return { message: 'An error occured!', err };
    }
  } else {
    return { message: 'You have to login to be here' };
  }
}
