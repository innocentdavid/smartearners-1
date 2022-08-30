import { getUser } from './api'
import client, { previewClient } from './sanity'

export const hasWithdrawToday = async (userId) => {
  const user = await getUser(userId);

  if (user) {
    if (user?.lastWithdrawDate) {
      const lastWithdrawDate = new Date(user.lastWithdrawDate).getTime()
      const today = new Date().getTime()
      const gap = today - lastWithdrawDate
      gap >= 1 ? true : false;
      if (gap >= 1) {
        return true;
      }
      return false;
    } else {
      return true
    }
  } else {
    return { message: 'user does not exist!' }
  }
}

export const getAllWithDrawRecord = async (userId) => {
  document.querySelector('#generalLoading').classList.remove('hidden')
  document.querySelector('#generalLoading').classList.add('grid')
  try {
    const response = await fetch('/api/withdraw', {
      method: 'POST',
      body: JSON.stringify(['getWithdrawRecord', userId]),
      type: 'application/json'
    })
    if (response.status == 200) {
      const res = response.json()
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
      return res;
    }
  } catch (err) {
    console.log(err)
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
    return;
  }
}