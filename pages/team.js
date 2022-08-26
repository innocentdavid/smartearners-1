import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { FcMoneyTransfer } from 'react-icons/fc'

export default function Team() {
  const router = useRouter()
  const [user, setUser] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

  const showModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.remove('hidden')
  }

  const hideModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.add('hidden')
  }

  return (
    <div className="relative h-screen">
      <Head>
        <title>Team - Smart Earners</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-[30%] right-0 flex items-center gap-2 rounded-l-[30px] px-3 py-2 bg-[#ffa500] text-white font-['Metric-Light'] cursor-pointer" style={{ boxShadow: '0px 0px 14px -3px #707377' }} onClick={() => { showModal() }}>
        <div className=""><AiOutlineShareAlt /></div>
        <div className="">My Link</div>
      </div>

      <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-4 md:px-36">
        <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

        <div className="flex flex-col items-end">
          <div className="text-white flex items-center gap-1">
            <FcMoneyTransfer /> <div className="">Total Referral Income</div>
          </div>
          <div className="font-josefin font-bold">0 NGN</div>
        </div>
        {/* <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
          <div className="border-r border-[#fff3dc] h-[60%]"></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
        </div> */}
      </nav>

      <header className="bg-[#242931] text-[#fff] py-3 px-5 font-Josefin text-[14px]">
        <div>{`The referral income you obtain from "My Team" consist of 3 parts below.`} <span className="text-[#ffa500] select-none cursor-pointer" onClick={() => { showModal() }}>Please click here to buy tickets if needed.</span></div>
      </header>

      <main className="mt-5 px-5 max-w-[500px]">
        <div>
          <div className="">
            <div style={{ fontFamily: "Metric-SemiBold" }} className="text-[17px] md:text-[19px] text-black font-bold ">• 14%+5%+1% / One-Time Commission</div>
            <p className="font-['Metric Light'] text-[14px] text-[#242931] mb-[15px] ">{`When your Level 1 referrals make a payment, you will obtain 14% of his payment amount as referral commission immediately. And you obtain 5% of your Level 2's payment amount, and 1% of your Level 3's.`}</p>
            <div className="py-3 text-center text-[17px] md:text-[19px] font-[fona] mb-8 border border-[#ffa600] text-[#ffa600] font-semibold rounded-[10px] cursor-pointer" onClick={() => { router.push('/bonus') }}>Check my stats in this part</div>
          </div>

          <div className="">
            <div className="font-['Metric-SemiBold'] text-[17px] md:text-[19px] text-black font-bold ">{`• 20% Share of Lv.1's Daily Return`}</div>
            <p className="font-['Metric Light'] text-[14px] text-[#242931] mb-[15px] ">{`When your Level 1 referrals start to obtain daily return from his investment plans, you will obtain a 20% extra share of that return on a daily basis as well.`}</p>
            <div className="py-3 text-center text-[19px] font-[fona] mb-8 border border-[#ffa600] text-[#ffa600] font-semibold rounded-[10px] cursor-pointer" onClick={() => { router.push('/investreturn') }}>Check my stats in this part</div>
          </div>

          <div className="">
            <div className="font-['Metric-SemiBold'] text-[19px] text-black font-bold ">{`• ₦300 Per Valid Refer`}</div>
            <p className="font-['Metric Light'] text-[14px] text-[#242931] mb-[15px] ">{`You will obtain ₦300 as bonus when any of your Level 1 referrals make a payment and become a valid member. This bonus is only given for one time on the same referral.`}</p>
            <div className="py-3 text-center text-[19px] font-[fona] mb-8 border border-[#ffa600] text-[#ffa600] font-semibold rounded-[10px] cursor-pointer" onClick={() => { router.push('/pervalidrefer') }}>Check my stats in this part</div>
          </div>
        </div>
      </main>

      <Footer />


      <div id="modal" className="hidden fixed">
        <div onClick={() => { hideModal() }} className="z-[4] cursor-pointer fixed top-0 left-0 w-screen h-screen grid place-items-center bg-[rgba(0,0,0,.1)] text-white font-['Poppins']" title="close">
        </div>

        <div className="z-[5] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] mx-auto">
          <div className="h-[70px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa500] text-white rounded-t-[10px]">
            <div className="font-bold font-[poppins] ">SMART <br /> EARNERS</div>
            <div className="text-end">
              <div className="text-black font-semibold">COPY YOUR</div>
              <div className="text-2xl font-bold">REFERRAL LINK</div>
            </div>
          </div>

          <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem] bg-[#fff] text-black">
            <div className="">
              <p>Please copy your exclusive referral link:</p>
              <p><a href={`http://smartearners.com/?rf=${user?.id}`}>http://smartearners.com/?rf={user?.id}</a></p>
            </div>

            <div className="bg-[#ffa500] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold cursor-pointer">Copy</div>
          </div>
        </div>
      </div>

    </div>
  )
}
