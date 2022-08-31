export const userAndReferrerFields = `
  'user': user->{_id, tel, level, myTicket, referrer, roi, ri, vrs, tbalance, lastChecked, isAdmin, isValid, lastWithdrawDate, isAdmin},
  'referrer': referrer->{_id, tel, level, myTicket, referrer, roi, ri, vrs, tbalance, lastChecked, isAdmin, isValid, lastWithdrawDate, isAdmin},
`

export const hasWithdrawToday = async (userLastWithdrawDate) => {
  // const lastWithdrawDate = new Date('2022-08-28T21:53:49.722Z').getTime()
  //     const today = new Date().getTime()
  //     const gap = today - lastWithdrawDate
  //     const dayDiff = gap/(1000*3600*24)
  //     return `${today} - ${lastWithdrawDate} = ${gap} - ${Math.floor(dayDiff)}`
  if (!userLastWithdrawDate) {
    return false
  } else {
    const lastWithdrawDate = new Date(userLastWithdrawDate).getTime()
    const today = new Date().getTime()
    const gap = today - lastWithdrawDate
    const dayDiff = gap / (1000 * 3600 * 24)
    // gap >= 1 ? true : false;
    if (Math.floor(dayDiff) >= 1) {
      return false;
    }
    return true;
  }
}

export const getAllWithDrawRecord = async (userId) => {
  var generalLoading = document.querySelector('#generalLoading')
  generalLoading.classList.remove('hidden')
  generalLoading.classList.add('grid')
  if (userId) {
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify(['getWithdrawRecord', userId]),
        type: 'application/json'
      })
      if (response.status == 200) {
        const res = await response.json()
        generalLoading.classList.remove('grid')
        generalLoading.classList.add('hidden')
        return { message: 'success', res };
      }
    } catch (err) {
      console.log(err)
      generalLoading.classList.remove('grid')
      generalLoading.classList.add('hidden')
      return { message: 'error', err };
    }
  } else {
    generalLoading.classList.remove('grid')
    generalLoading.classList.add('hidden')
    return { message: 'You have to login to be here' };
  }
}

export const getAllBalanceRecord = async (userId) => {
  document.querySelector('#generalLoading').classList.remove('hidden')
  document.querySelector('#generalLoading').classList.add('grid')
  if (userId) {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['getAllBalanceRecord', userId]),
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
      return { message: 'error', err };
    }
  }
  else {
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
    return { message: 'You have to login to be here' };
  }
}

// bonus.js
export const getAllRfCommisionByUser = async (userId) => {
  document.querySelector('#generalLoading').classList.remove('hidden')
  document.querySelector('#generalLoading').classList.add('grid')
  if (userId) {
    try {
      const response = await fetch('/api/rfcommission', {
        method: 'POST',
        body: JSON.stringify(['getAllRfCommisionByUser', userId]),
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
      return { message: 'error', err };
    }
  }
  else {
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
    return { message: 'You have to login to be here' };
  }
}