import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getUser } from '../lib/api'
import { useAppContext } from '../context/AppContext'

export default function Profile() {
  const router = useRouter()
  const { status, data } = useSession();
  const { user } = useAppContext()

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
          <title>Profile - SMART ENERGY</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART ENERGY</div>

          <div className="flex items-center gap-5 text-[.8rem] ">
            <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
            <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
          </div>
        </nav>

        <header className="bg-gray-800 text-white py-3 px-5 font-[Poppins]">
          <div className="flex items-center justify-end gap-1 font-Josefin">
            <div className="text-[#ffa500]"><AiOutlineUser size="20px" /></div>
            {user?.tel ? <div>My ID: <span>{user?.tel}</span></div> :
              <div className="flex items-center gap-2">
                <div className="text-xs py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/login') }}>Log in / Sign up</div>
              </div>}
          </div>
        </header>

        <main className="mt-8 font-Josefin text-xs">
          <div className="flex flex-wrap mb-8">
            <Link href="/deposit">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Buy Ticket</div>
              </a>
            </Link>
            <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Download App</div>
              </a>
            </Link>
            <Link href="/team">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">My Referrak Link</div>
              </a>
            </Link>

            <Link href="/team">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">My Team</div>
              </a>
            </Link>
            <Link href="/withdraw">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Withdraw</div>
              </a>
            </Link>
            <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Bind Bank Card</div>
              </a>
            </Link>

            <Link href="#">
              <a className="w-1/2 md:w-1/3 flex justify-center items-center">
                <div className="w-full text-center mx-8 my-4 py-3 px-3 border-2 border-[#ffa600] hover:bg-[#ffa600]">Payment Issue</div>
              </a>
            </Link>
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
            <Link href="#">
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
