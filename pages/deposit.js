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
        <title>Deposit</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between items-center border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="cursor-pointer" onClick={() => { router.back() }}><FaLessThan size="17px" /></div>

        <div className="flex items-center gap-5 text-[.8rem] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong className="text-lg">{user?.myTicket}</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="text-lg">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="bg-gray-800 text-white py-3 px-5 font-['Matric-Light'] text-[16px]">
        <ul>
          <li>All investment plans at Phoenix can only be purchased with tickets. Please click on any of packages below to buy some tickets first before you invest:</li>
        </ul>
      </header>

      <main className="mt-3">
        <div className="font-[fona] text-[18px]">
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] bg-[#ffa600] text-white border-r">3000</div> 
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px]">3000</div>
          </div>
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px]">3000</div>
          </div>
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] text-sm">Enter Amount</div>
          </div>
        </div>

        <div className="px-5">
          <div className="flex justify-between mt-5">
            <div>Buy Tickets:</div>
            <input type="number" name="ticket" id="ticket" placeholder={ticket} className="w-[100px] text-end outline-none border-b border-[#ffa500] font-[fona] " />
          </div>

          <div className="flex justify-between mt-5">
            <div>Deposit Amount:</div>
            <div className="font-bold font-[fona]">N3000</div>
          </div>

          <div className="flex justify-end font-[fona] mt-5">( 1Ticket = 1N )</div>

          <div className="bg-[#ffa500] text-white h-[40px] w-full flex justify-center items-center mt-8 text-lg font-bold rounded-[10px] font-[fona]">Deposit</div>

          <p className="text-center mt-5"><a href="#" className="text-[#ffa500] underline">{`I paid, but I didn't get ticket?`}</a></p>
        </div>
      </main>
    </div>
  )
}
