import moment from "moment"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BsArrowUp } from 'react-icons/bs'
import AuthContext from "../context/authContext"
import { getAllIrc } from "../lib/functions"

export default function Investmentreturn() {
  const router = useRouter()
  const { status, data } = useSession();
  const user = useContext(AuthContext)
  const [records, setRecords] = useState()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status])

  const getTotalDetails = (array) => {
    var tc = 0
    if (array) {
      array?.forEach(item => {
        tc += item.commission
      });
    }
    return { tc }
  }

  useEffect(() => {
    const fetch = async () => {
      let res = await getAllIrc(user._id)
      if (res.message == 'success') {
        const data = res.res.data
        console.log(data)
        setRecords(data)
      }
    }
    if (user) {
      fetch()
    }
  }, [user])

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
      <>
        <Head>
          <title>{"20% Share of Lv.1's Daily Return"} - Smart Earners</title>
          <meta name="description" content="20% Share of Lv.1's Daily Return" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex justify-between items-center px-8 py-2">
          <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>

          <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
            <div className="flex flex-col items-center text-center text-[.8rem]">{"I've"} earned <strong className="font-Josefin text-lg">{getTotalDetails(records).tc}</strong></div>
            {/* <div className="border-r border-[#fff3dc] h-[60%]"></div> */}
            {/* <div className="flex flex-col items-center text-center text-[.6rem]">{"I'm earning"} <br /> today <strong className="font-Josefin text-lg">₦<span>{user?.balance}</span></strong></div> */}
          </div>
        </nav>

        <header className="bg-[#242931] text-[#fff] py-4 px-5 font-Josefin text-[14px] md:text-center">
          <div className="flex items-center gap-4">
            <div className=""><img src="/images/901789.png" width="20px" height="20px" /></div>
            <div className="font-bold text-[.9rem] md:text-[1rem] -mb-1">{`2% Share of Lv.1's Daily Return`}</div>
          </div>

          <p className="mt-3 text-[.75rem]">{"When your Level 1 referrals start to obtain daily return from his investment plans, you will obtain a 2% extra share of that return on a daily basis as well."}</p>
        </header>

        <section className="mt-4">
          <div className="">
            <ul className="flex w-full text-[#333] text-[.8rem]">
              <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[10%]"><p>sn</p> </li>
              <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[30%]"><p>Time</p> </li>
              <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[30%]"><p>Downlink</p></li>
              <li className="font-['Metric-Regular'] flex flex-col justify-center items-center text-center w-[30%]">
                <p>My<br /> Commission</p>
              </li>
            </ul>
          </div>
          <br />

          {records?.map((record, index) => {
            return (<>
              <div key={record._id} className="">
                <ul className="flex w-full text-[#333] text-[.8rem]">
                  <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[10%]"><p>{index+1}</p> </li>
                  <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[30%]"><p>{moment(new Date(record._createdAt)).format('MM-D-YY')}</p> </li>
                  <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[30%]"><p>{record.user.tel}</p></li>
                  <li className="font-['Metric-Regular'] flex flex-col justify-center items-center text-center w-[30%]">
                    <p>{record.commission}</p>
                  </li>
                </ul>
              </div>
            </>)
          })}
        </section>
      </>
    )
  }
}