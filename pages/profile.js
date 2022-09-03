import Head from 'next/head'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Footer from '../components/footer'
import { AiOutlineUser } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import AuthContext from '../context/authContext'
import { signOut } from "next-auth/react"
import { getUserById, updateUserPortfolio } from '../lib/api'

export default function Profile() {
  const router = useRouter()
  const { status, data } = useSession();
  const {user, setUser} = useContext(AuthContext)
  const [canMine, setCanMine] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status])

  useEffect(() => {
    if (user) {
      if (!user?.lastChecked) {
        setCanMine(true)
        return;
        // const resgisteredAt = new Date(user._createdAt).getTime()
        // const now = new Date().getTime()
        // const gap = now - resgisteredAt
        // const dif = Math.floor(gap/(1000*3600*24))
        // if(dif >= 1){
        //   setCanMine(true)
        //   return
        // }
        // return
      }
      const lastChecked = new Date(user?.lastChecked).getTime()
      if (lastChecked) {
        const now = new Date().getTime()
        const gap = now - lastChecked
        const dif = (gap) / (1000 * 3600 * 24)
        if (Math.floor(dif) >= 1) {
          setCanMine(true)
        } else {
          setCanMine(false);
        }
      }
    }
  }, [user])

  const mine = async () => {
    // console.log(user)
    if (!user?._id) {
      alert('You have to login first!')
      router.push('/')
      return;
    }
    if (canMine) {
      document.querySelector('#generalLoading').classList.remove('hidden')
      document.querySelector('#generalLoading').classList.add('grid')
      const res = await updateUserPortfolio(user)
      const u = await getUserById(user?._id)
      console.log(u)
      if (res?.message === 'success') {
        setCanMine(false)
        setTimeout(async () => {
          const u1 = await getUserById(user._id)
          const u2 = await getUserById(user._id)
          const u3 = await getUserById(user._id)
          router.reload();
        }, 10000);
        alert('You have successfully mined all your reward')
      } else {
        alert("An error occured! please try again")
        router.reload();
      }
      // document.querySelector('#generalLoading').classList.remove('grid')
      // document.querySelector('#generalLoading').classList.add('hidden')
    }
  }

  if (status === 'loading') {
    return (
      <div className="fixed top-0 left-0 w-full h-screen grid place-items-center z-[999999999] text-white" style={{ background: 'rgba(0,0,0,.8)' }}>
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
          <title>Profile - SMART EARNERS</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center uppercase">SMART Earners</div>

          <div className="flex items-center gap-5 text-[.8rem] ">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/deposit') }}>Ticket <strong>{user?.myTicket}</strong></div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/withdraw') }}>Balance <strong className="">₦<span>{
            user?.tbalance + user?.ri + user?.roi + user?.vrs
            }</span></strong></div>
          </div>
        </nav>

        <header className="bg-gray-800 text-white py-3 px-5 font-[Poppins]">
          <div className="flex items-center justify-end gap-1 font-Josefin">
            <div className="text-[#ffa500]"><AiOutlineUser size="20px" /></div>
            {user?.tel ? <div className="flex items-center gap-3">My ID: <span>{user?.tel}</span><FiLogOut className="cursor-pointer" onClick={() => { signOut(); router.push('/login') }} /></div> :
              <div className="flex items-center gap-2">
                <div className="text-xs py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/login') }}>Log in / Sign up</div>
              </div>}
          </div>
        </header>

        <main className="mt-8 font-Josefin text-xs">
          <div className="flex flex-col items-center mb-6">
            <div className="text-center text-lg">Check in daily to mine your rewards</div>

            {canMine ? <button type="button" className="bg-[#ffaa00] h-6 w-[6rem] cursor-pointer"
              onClick={mine}>Mine now</button> :
              <button type="button" className="bg-gray-400 h-6 w-[6rem] cursor-pointer"
                onClick={() => { alert("You can't mine right now, check back later"); }}>Mine now</button>}
          </div>

          <div className="flex flex-wrap mb-8">
            <Link href="/deposit">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Buy Ticket</div>
              </a>
            </Link>
            {/* <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Download App</div>
              </a>
            </Link> */}
            <Link href="/team">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">My Referrak Link</div>
              </a>
            </Link>

            <Link href="/withdraw">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Withdraw</div>
              </a>
            </Link>
            <Link href="/team">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">My Team</div>
              </a>
            </Link>
            <Link href="/updateAccount">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Update Account Details</div>
              </a>
            </Link>

            {/* <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Payment Issue</div>
              </a>
            </Link> */}

            {/* <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Balance Record</div>
              </a>
            </Link>
            <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Ticket Record</div>
              </a>
            </Link> */}
            <Link href="/orders">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">My Orders</div>
              </a>
            </Link>
            <Link href="/withdraw?p=1#record">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Balance Records</div>
              </a>
            </Link>
            <Link href="/withdraw?p=0#record">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Withraw Records</div>
              </a>
            </Link>
            <Link href="/withdraw?p=2#record">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Payment Records</div>
              </a>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=2349135060837&text=hello, ">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Customer Support</div>
              </a>
            </Link>
            {/* <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">About Us</div>
              </a>
            </Link> */}
          </div>
        </main>

        <Footer />
      </div>
    )
  }
}
