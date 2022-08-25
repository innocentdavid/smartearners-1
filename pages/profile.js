import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/footer'
import { AiOutlineUser } from 'react-icons/ai'
import { useRouter } from 'next/router'

export default function Profile() {
  const router = useRouter()
  const [user] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

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
            <div className="text-sm py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/login') }}>Log in</div>
            <div className="text-sm py-1 px-3 border border-[#ffa600] cursor-pointer" onClick={() => { router.push('/signup') }}>Sign up</div>
          </div>
        </div>
      </header>

      <main className="mt-5">

      </main>

      <Footer />
    </div>
  )
}
