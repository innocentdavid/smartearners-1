import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getUser } from '../lib/api'

export default function Profile() {
  const router = useRouter()
  const { status, data } = useSession();
  const [user, setUser] = useState(null)
  const version = process.env.NODE_ENV

  // console.log('data =>', data)
  useEffect(() => {
    if (status === 'unauthenticated') {
      version === 'production' && router.replace('/login')
      alert('not loged in')
    }

    if (data && data.user.token) {
      const dataN = data?.user?.token
      // const u = { ...dataN, balance: dataN.ri + dataN.roi }
      // dataN?.tel && setUser(u)

      const fetch = async () => {
        document.querySelector('#generalLoading').classList.remove('hidden')
        document.querySelector('#generalLoading').classList.add('grid')
        const cuser = await getUser(dataN.tel)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        if (cuser) {
          const u = { ...cuser, balance: cuser?.ri + cuser?.roi }
          console.log(u)
          setUser(u)
        }else{
          version === 'production' && router.replace('/login')
      alert('not loged in')
        }
      }
      fetch()
    }else{
      version === 'production' && router.replace('/login')
      alert('not loged in')
    }
  }, [status, data, router])

  if (status === 'loading') {
    return (
      <div className="fixed top-0 left-0 w-full h-screen grid place-items-center z-[999999999] text-white" style={{ background: 'rgba(0,0,0,.8)'}}>
      <div className="text-2xl md:text-3xl lg:text-5xl flex items-center gap-3">
        <img src="/images/withdraw-1.png" alt="" width="20px" height="20px" className="animate-spin" />
        <span>Loading<span className="animate-ping">...</span></span>
      </div>
    </div>
    )
  }


  if (status === 'authenticated') {
    return (
      <div className="relative h-screen">
        <Head>
          <title>Profile - Smart Earners</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

          <div className="flex items-center gap-5 text-[.8rem] ">
            <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
            <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
          </div>
        </nav>

        <header className="bg-gray-800 text-white py-3 px-5 font-[Poppins]">
          <div className="flex items-center justify-end gap-1">
            <div className="text-[#ffa500]"><AiOutlineUser size="20px" /></div>
            {/* <div>My ID: <span>{user?.userName}</span></div> */}
            <div className="flex items-center gap-2">
              <div className="text-xs py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/login') }}>Log in / Sign up</div>
              {/* <div className="text-sm py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/signup') }}>Sign up</div> */}
            </div>
          </div>
        </header>

        <main className="mt-5">

        </main>

        <Footer />
      </div>
    )
  }
}
