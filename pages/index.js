import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BiTrendingUp } from 'react-icons/bi'
import Footer from '../components/footer'
import Slider from '../components/slider'
import { getAllInvestmentPlan } from '../lib/api'
import AuthContext from '../context/authContext';

export default function Home({ allInvestmentPlan }) {
  const [plans] = useState(allInvestmentPlan)
  const { status, data } = useSession();
  const user = useContext(AuthContext)
  console.log(user)
  // const user = null
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status])

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
          <title>Smart Energy</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-4 md:px-36">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center uppercase cursor-pointer">SMART Energy</div>

          <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
            <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/deposit') }}>Ticket <strong className="font-bold font-Josefin select-none">{user?.myTicket ? user?.myTicket : 0}</strong></div>
            <div className="border-r border-[#fff3dc] h-[60%]"></div>
            <div onClick={() => { router.push('/withdraw') }} className="flex flex-col items-center">Balance <strong className="font-bold font-Josefin select-none">N<span>{user?.balance}</span></strong></div>
          </div>
        </nav>

        <header className="text-center mb-5 md:w-full overflow-x-hidden ">
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

            <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/#investmentPlan') }}>
              <div className="rounded-[15px] w-[40px] h-[40px] bg-[#fff3dc] text-black flex justify-center items-center "><BiTrendingUp size="20px" /></div>
              <div className="text-[.8rem] font-bold font-['Poppins'] mt-1 ">Invest&nbsp;Now</div>
            </div>
          </section>

          <section className="text-center bg-[#fff3dc] py-3 mt-16 mb-6" id="investmentPlan">
            <div className="text-2xl font-semibold font-['metric-medium'] ">Our Investment Plans</div>
          </section>

          <section className="my-5 px-5 flex flex-col md:flex-row flex-wrap justify-center items-center md:gap-10">
            {plans?.map((plan, index) => {
              return <PlanCard key={plan?._id} user={user} id={index + 1} plan={plan} title={plan?.title} returnPeriod={plan?.returnPeriod} percentage={plan?.percentage} da={plan?.da} router={router} />
            })}
          </section>
        </main>

        <Footer />
      </div>
    )
  }
}

const PlanCard = ({ user, id, plan, title, percentage, da, returnPeriod, router }) => {
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

  const investNow = async () => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    if (user) {
      // console.log(user.myTicket, plan.da)
      if (user?.myTicket && user.myTicket < plan.da) {
        alert('You do not have enough ticket, get more ticket to continue');
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        router.push('/deposit')
        return
      }
      // const res = await buyInvestmentPlan(plan, user)
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(['buyInvestmentPlan', plan, user]),
          type: 'application/json'
        })
        const res = await response.json()
        console.log(res.message)
        res.message && alert(res?.message)
        router.push('/orders')
      } catch (err) {
        console.log(err)
      }
      router.push('/orders')
      hideModal()
    }else{
      alert('You have to log in first!')
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  return (<>
    <div className="mb-8 w-full md:w-fit cursor-pointer" onClick={() => { showModal() }}>
      <div className="h-[60px] px-4 flex justify-between md:gap-16 items-center bg-[#ffa600] text-white rounded-t-[10px]">
        <div className="font-bold font-[poppins] ">SMART <br /> Energy</div>
        <div className="flex items-center md:gap-2 gap-1 font-bold text-sm md:text-base ">
          {/* <div>PC-{id}</div>  */}
          <div>{title}</div>
          <div className="text-[#eee]">|</div> <div>Total <span className="font-[fona]">{totalReturnPercentage}</span>%</div>
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
          <div className="font-bold font-[poppins] ">SMART <br /> Energy</div>
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

          <div className="bg-[#ffa600] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold cursor-pointer" onClick={() => { investNow() }}>Invest Now</div>

          <p className="mt-2 font-Josefin">( My Ticket <span>{user?.myTicket}</span> )</p>
        </div>
      </div>
    </div>

  </>)
}

export async function getStaticProps({ preview = false }) {
  const allInvestmentPlan = await getAllInvestmentPlan();

  return {
    props: { allInvestmentPlan },
    revalidate: 1
  }
}