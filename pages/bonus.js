import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsArrowUp, BsArrowRight } from 'react-icons/bs'
import { AiOutlineShareAlt } from 'react-icons/ai'

export default function Bonus() {
  const router = useRouter()
  const [user, setUser] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

  return (
    <>
      <Head>
        <title>14%+5%+1% / One-Time Commission - Smart Earners</title>
        <meta name="description" content="14%+5%+1% / One-Time Commission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between items-center px-8 py-2">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>

        <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">I've <br /> earned <strong className="font-Josefin text-lg">{user?.roi}</strong></div>
          <div className="border-r border-[#fff3dc] h-[60%]"></div>
          <div className="flex flex-col items-center">I'm earning <br /> today <strong className="font-Josefin text-lg">₦<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="bg-[#242931] text-[#fff] py-4 px-5 font-Josefin text-[14px]">
        <div className="flex items-center gap-4">
          <div className=""><AiOutlineShareAlt size="25px" /></div>
          <div className="font-bold text-[.9rem] md:text-[1rem]">14%+5%+1% / One-Time Commission</div>
        </div>

        <p className="mt-3 text-[.75rem]">When your Level 1 referrals make a payment, you will obtain 14% of his payment amount as referral commission immediately. And you obtain 5% of your Level 2's payment amount, and 1% of your Level 3's.</p>
      </header>

      <main className="max-w-[767px]">
        <TableCard router={router} level="1" />
        <TableCard router={router} level="2" />
        <TableCard router={router} level="3" />
      </main>
    </>
  )
}

const TableCard = ({ level, router }) => {

  return (
    <section className="text-[#333]">
      <div className="py-6 px-5 flex justify-between items-center">
        <div>
          <div className="text-[16px] font-['Metric-Medium'] leading-[17px] ">Referral</div>
          <div className="font-bold text-[1.3rem]">Level {level}</div>
        </div>

        <div className="py-2 px-6 text-center text-[17px] font-[Metric] border border-[#ffa600] text-[#ffa600] font-semibold rounded-[10px] flex items-center gap-3 cursor-pointer hover:text-[black]" onClick={() => { router.push(`/referral/${level}`) }}>Details <div className="stroke-[#ffa600] stroke-[1]"><BsArrowRight /></div></div>
      </div>

      <table className="pb-[20px] w-full">
        <tbody id="level1">
          <tr className="bg-[#f5f5f5]">
            <td></td>
            <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">Referral<br />number</td>
            <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">Deposit<br />amount</td>
            <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">My<br />commission</td>
          </tr>
          <tr>
            <td className="p-1 font-[fona] text-center text-[.8rem]">
              Total
            </td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
          </tr>
          <tr className="bg-[#f5f5f5]">
            <td className="p-1 font-[fona] text-center text-[.8rem]">
              Today
            </td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-[20px] h-[8px] bg-[#f8f8f8] my-[5px] "></div>
    </section>
  )
}