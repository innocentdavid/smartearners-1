import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FaLessThan } from 'react-icons/fa'

export default function Profile() {
  const [user, setUser] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

  const router = useRouter()

  const [ticket, setTicket] = useState(3000)
  const [amountDeposited] = useState(ticket)

  return (
    <div className="relative h-screen">
      <Head>
        <title>Profile - Smart Earners</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between items-center border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="cursor-pointer" onClick={() => { router.back() }}><FaLessThan size="20px" /></div>

        <div className="flex items-center gap-5 text-[.8rem] ">
          <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav> 

      <header className="bg-gray-800 text-white py-3 px-5 font-[Poppins]">
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto <a href="#" className="text-[#ffa500]">Please click here to buy tickets if needed.</a></li>
        </ul>
      </header>

      <main className="mt-5 px-5">
        <div className="flex justify-between mt-5">
          <div>Buy Tickets:</div>
          <input type="text" name="ticket" id="ticket" placeholder={ticket} className="w-[100px] text-end outline-none border-b border-[#ffa500] " />
        </div>

        <div className="flex justify-between mt-5">
          <div>Deposit Amount:</div>
          <div>N3000</div>
        </div>

        <div className="flex justify-end mt-5">( 1Ticket = 1N )</div>

        <div className="bg-[#ffa500] text-white h-[40px] w-full flex justify-center items-center mt-8 text-lg font-bold rounded-[10px]">Deposit</div>

        <p className="text-center mt-5"><a href="#" className="text-[#ffa500] underline">I paid, but I didn't get ticket?</a></p>
      </main>
    </div>
  )
}
