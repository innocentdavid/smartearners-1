import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiTrendingUp } from 'react-icons/bi'
import Footer from '../components/footer'
import Slider from '../components/slider'

export default function Home() {
  const router = useRouter()
  const [user] = useState({
    userName: '0x9***384', myTicket: 0, balance: 350
  })

  const [plans] = useState([
    { id: 1, percentage: 10, da: 3000 },
    { id: 2, percentage: 11, da: 6000 },
    { id: 3, percentage: 12, da: 10000 },
    { id: 4, percentage: 13, da: 30000 },
    { id: 5, percentage: 14, da: 60000 },
    { id: 6, percentage: 15, da: 150000 },
    { id: 7, percentage: 17, da: 500000 },
    { id: 8, percentage: 20, da: 1000000 }
  ])

  return (
    <div className="relative h-screen">
      <Head>
        <title>Smart Earners</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-4 md:px-36">
        <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

        <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
          <div className="border-r border-[#fff3dc] h-[60%]"></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="text-center mb-5 md:w-full overflow-hidden ">
        <Slider />
      </header>

      <main className="">
        <section className="flex flex-wrap items-center justify-between md:justify-evenly gap-1 md:px-6 px-3 my-5">
          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#fff3dc] text-white flex justify-center items-center  cursor-pointer" onClick={() => { router.push('/withdraw') }}>
              <img src="/images/icons8-naira-48.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] mt-1 ">Withdraw</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#fff3dc] text-white flex justify-center items-center  cursor-pointer" onClick={() => { router.push('/team') }}>
              <img src="/images/icons8-share-50.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] mt-1 ">Referral</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#fff3dc] text-white flex justify-center items-center  cursor-pointer" onClick={() => { router.push('/#support') }}>
              <img src="/images/icons8-comments-50.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] mt-1 ">Support</div>
          </div>

          <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/#') }}>
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#fff3dc] text-black flex justify-center items-center "><BiTrendingUp size="20px" /></div>
            <div className="text-[.8rem] font-bold font-['Poppins'] mt-1 ">Invest&nbsp;Now</div>
          </div>
        </section>

        <section className="text-center bg-[#fff3dc] py-3 mt-16 mb-6">
          <div className="text-2xl font-semibold font-['metric-medium'] ">Our Investment Plans</div>
        </section>

        <section className="my-5 px-5 flex flex-col md:flex-row flex-wrap justify-center items-center md:gap-10">
          {plans?.map(plan => {
            return <PlanCard key={plan?.id} user={user} id={plan?.id} percentage={plan?.percentage} da={plan?.da} />
          })}
        </section>
      </main>

      <Footer />
    </div>
  )
}


const PlanCard = ({ user, id, percentage, da }) => {
  const returnPeriod = 60
  const dailyReturn = (percentage / 100) * da
  const totalReturn = ((percentage / 100) * da) * returnPeriod
  const totalReturnPercentage = percentage * returnPeriod;
  const returnTiming = '22:55-23:25'

  const showModal = () => {
    const modal = document.querySelector(`#selector${id}`)
    modal.classList.remove('hidden')
  }

  const hideModal = () => {
    const modal = document.querySelector(`#selector${id}`)
    modal.classList.add('hidden')
  }

  return (<>
    <div className="mb-8 w-full md:w-fit cursor-pointer" onClick={() => { showModal() }}>
      <div className="h-[60px] px-4 flex justify-between md:gap-16 items-center bg-[#ffa600] text-white rounded-t-[10px]">
        <div className="font-bold font-[poppins] ">SMART <br /> EARNERS</div>
        <div className="flex items-center md:gap-2 gap-1 font-bold text-sm md:text-base ">
          <div>PC-{id}</div> <div className="text-[#eee]">|</div> <div>Total <span className="font-[fona]">{totalReturnPercentage}</span>%</div>
        </div>
      </div>

      <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem]">
        <div className="flex justify-between ">
          <div className="">
            <div className="text-gray-500">Deposit Amount</div>
            <div className="font-bold font-[fona] ">{da}</div>
          </div>

          <div className="text-end">
            <div className="text-gray-500">Daily Return</div>
            <div className="flex items-center gap-2 font-bold">
              <div className="font-[fona]">N{dailyReturn}</div> <div className="text-[#eee]">|</div> <div className="font-[fona]">{percentage}%</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <div className="">
            <div className="text-gray-500">Return Period</div>
            <div className="font-bold font-[fona] "><span className="font-[fona]">{returnPeriod}</span> Days</div>
          </div>

          <div className="text-end">
            <div className="text-gray-500">Total Return</div>
            <div className="flex items-center gap-2 font-bold">
              <div className="font-[fona]">N{totalReturn}</div> <div className="text-[#eee]">|</div> <div className="font-[fona]">{percentage * returnPeriod}%</div>
            </div>
          </div>
        </div>

        <div className="bg-[#ffa600] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold font-[fona]">{da}</div>
      </div>
    </div>

    {/* modal */}
    <div id={`selector${id}`} className="hidden fixed z-[9999]">
      <div onClick={() => { hideModal() }} className="z-[4] cursor-pointer fixed top-0 left-0 w-screen h-screen grid place-items-center bg-[rgba(0,0,0,.4)] text-white font-['Poppins']" title="close">
      </div>

      {/* <div className="z-[5] fixed lg:bottom-[140px] md:bottom-[120px] bottom-[95px] left-[1px] md:left-[30%] lg:left-[40%] "> */}
      <div className="z-[5] fixed top-[50%] md:top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:translate-y-[-30%] w-[90%] lg:w-[60%] ">

        <div className="h-[70px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa600] text-white rounded-t-[10px]">
          <div className="font-bold font-[poppins] ">SMART <br /> EARNERS</div>
          <div className="text-end">
            <div className="text-black font-semibold">PLEASE</div>
            <div className="text-2xl font-bold">CONFIRM</div>
          </div>
        </div>

        <div className="px-4 py-4 text-center shadow-lg rounded-b-[10px] text-[.9rem] md:text-base lg:text-xl bg-[#fff] text-black">
          <div className="">
            <p className="mb-2">Item : <span className="text-[#ffa600] font-[600]">Daily {percentage}% investment Plus</span></p>
            <p className="mb-2">Deposit Amount : <span className="text-[#ffa600] font-[600]">{da}</span></p>
            <p className="mb-2">Daily Return : <span className="text-[#ffa600] font-[600]">{dailyReturn}</span></p>
            <p className="mb-2">Total Return : <span className="text-[#ffa600] font-[600]">{totalReturn}</span></p>
            <p className="mb-2">Return Period : <span className="text-[#ffa600] font-[600]">{returnPeriod} Days</span></p>
            <p className="mb-2">Return Timing : <span className="text-[#ffa600] font-[600]">{returnTiming}</span></p>
            <p className="text-[#ffa600] font-[600]">( Review first daily return 24h after deposit )</p>
          </div>

          <div className="bg-[#ffa600] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold cursor-pointer">Invest Now</div>

          <p className="mt-2">( My Ticket <span>{user?.myTicket}</span> )</p>
        </div>
      </div>
    </div>
    
  </>)
}