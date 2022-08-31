import { userAndReferrerFields } from '../../lib/functions'
import client from './config'

export default async function user(req, res) {
  const b = JSON.parse(req.body)
  
  if(b[0] === 'getAllRfCommisionByUser') {
    const userId = b[1]

    const data = await client.fetch(`*[_type == "rfCommission" && referrer._ref == $userId] | order(_createdAt desc){
      '_id': _id,
      'level': level,
      'depositedAmount': depositedAmount,
      'commission': commission,
      ${userAndReferrerFields}
    }`, { userId }
    ).catch(error => {
      console.log('getAllRfCommisionByUser error', error)
      return res.status(500).json({ message: "error", error })
    })
    if (data) {
      return res.status(200).json({ message: "success", data })
    }
    return res.status(500).json({ message: "error" })
  }

  res.status(200).json({ message: '...' })
}