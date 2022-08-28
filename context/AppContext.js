import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser, updateUserPortfolio } from '../lib/api'

const AppContext = createContext();

// export const appContext = () => useContext(AppContext)

export const AppWrapper = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // if (status === 'unauthenticated') {
    //   setLoading(false)
    //   router.replace('/login')
    // }

    if (data && data.user.token) {
      const dataN = data?.user?.token
      var u = { ...dataN, myTicket: 0, balance: dataN.tbalance + dataN.ri + dataN.roi }
      if (dataN.myTicket) {
        u = { ...dataN, myTicket: dataN.myTicket, balance: dataN.tbalance + dataN.ri + dataN.roi }
      }
      dataN?.tel && setUser(u)

      // const query = '*[_type == "user" && id = $id]'
      // const params = { id: dataN._id }
      // const subscription = client.listen(query, params)
      // .subscribe((update) => {
      //   console.log(update)
      //   const userData = update.result
      //   console.log('userData',userData)
      //   setUser(userData)
      // })

      // return subscription.unsubscribe()

      const fetch = async () => {
        const cuser = await getUser(dataN.tel)
        if (cuser) {
          var u = { ...cuser, balance: cuser.tbalance + cuser?.ri + cuser?.roi }
          if (!cuser.myTicket) {
            u = { ...cuser, myTicket: 0, balance: cuser.tbalance + cuser.ri + cuser.roi }
          }
          // console.log(u)
          setUser(u)
        }

        if (u) {
          // await updateUserPortfolio(u)
        //   try {
        //     const response = await fetch('/api/user', {
        //       method: 'POST',
        //       body: JSON.stringify(['updateUserPortfolio', user]),
        //       type: 'application/json'
        //     })
        //     const res = await response.json()
        //     console.log(res.message)
        //   } catch (err) {
        //     console.log(err)
        //   }
        }
      }
      fetch()
      setLoading(false)
    }
  }, [status, data, router])

  return (
    <AppContext.Provider value={{ user, status, data }}>
      {loading ? null : children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}
