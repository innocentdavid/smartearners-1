import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/authContext"
import { getAllPaymentProofs, getAllWithdrawRequest } from "../../lib/api"
import { MdOutlineSwitchRight } from 'react-icons/md'
import { BsArrowUp, BsPatchCheckFill } from 'react-icons/bs'
import Head from "next/head"
import Link from "next/link"
import moment from "moment"
import { useSession } from 'next-auth/react';

export default function Admin({ allPaymentProofs, allWithdrawRequest }) {
  const router = useRouter()
  const user = useContext(AuthContext)
  const { status } = useSession();
  const tabsData = [
    { label: "Proof Of Payment", content: "" },
    { label: "Withdraw Request", content: "" },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return;
    }

    if (status === 'authenticated' && user && !user.isAdmin) {
      router.push('/')
      return;
    }
  }, [status, user])

  // hello

  const clearAllOrder = () => {
    const mutations = [
      {
        "delete": {
          "query": "*[_type == 'order']",
        }
      },
    ]

    const tokenWithWriteAccess = '';

    fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}?dryRun=false`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      },
      body: JSON.stringify({ mutations })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  const approveWithdraw = async (itemId, amount) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify(['approveWithdraw', itemId, user, amount]),
        type: 'application/json'
      })
      if (response.status == 200) {
        router.reload();
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      }
    } catch (err) {
      console.log(err)
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  const approvePayment = async (itemId, amount) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['confirmProof', itemId, user, amount]),
        type: 'application/json'
      })
      if (response.status == 200) {
        router.reload();
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      }
    } catch (err) {
      console.log(err)
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  if (user?.isAdmin) {
    return (
      <div>
        <Head>
          <title>Backend</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="flex items-center px-8 py-5 border-b border-gray-300 relative">
          <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>
          <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase text-center ">Smart Energy Dashboard</div>
        </header>

        {/* <div className="my-5 mx-5"><div className="h-7 w-28 text-center text-xs bg-black text-white cursor-pointer" onClick={clearAllOrder}>clearAllOrder</div></div> */}

        <section className="mt-16 mb-8 px-4">
          <div className="bg-gray-400 px-[3px] py-[3px] rounded-[10px] flex items-center justify-center text-[.9rem]">
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`font-bold w-full pt-4 pb-2 text-center rounded-[10px] transition-colors duration-300 ${idx === activeTabIndex
                    ? "bg-white"
                    : "hover:bg-gray-200 text-white"
                    }`}
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex(idx)}>
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="py-4">
            {activeTabIndex == 0 ? <>
              <section className="px-2">
                <table className="pb-[20px] w-full">
                  <thead className="">
                    <tr className="bg-[#333] font-semibold text-white text-xs">
                      <td></td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">DATE</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">USER</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">AMOUNT</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">PROOF</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">APP<br className="md:hidden" />ROVED</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="h-3"></tr>
                    {allPaymentProofs?.map((data, index) => {
                      return (
                        <tr key={index} className={`${(index + 1) % 2 === 0 && "bg-[#f5f5f5]"} px-10`}>
                          <td className="p-1 font-[fona] text-center text-[.8rem]">{index + 1}</td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{moment(data._createdAt).format('MM-D-YY')}</td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{data.userTel}</td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦{data.amount}</td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] relative">
                            <Link href={data.imageUrl}><a target="_blank">
                              <img src={data.imageUrl} alt="" width="40px" height="30px" className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" />
                            </a></Link>
                          </td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center relative">
                            {data.approved ? <BsPatchCheckFill className="text-[#ffa600] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" /> : <MdOutlineSwitchRight className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] cursor-pointer"
                              onClick={() => { approvePayment(data._id, data.amount) }}
                            />}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </section>
            </> : <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                  <div></div>
                  <div>Time</div>
                  <div className="text-gray-200">|</div>
                  <div>User</div>
                  <div className="text-gray-200">|</div>
                  <div>Amount</div>
                  <div className="text-gray-200">|</div>
                  <div>Status</div>
                  <div className="text-gray-200">|</div>
                  <div>Approve</div>
                </div>
              </div>
              <br />

              {allWithdrawRequest?.map((request, index) => {
                return (<>
                  <div key={request._id} className="">
                    <div className="flex justify-around items-center text-xs md:text-base mt-2 text-black">
                      <div>{index + 1}</div>
                      <div>{moment(new Date(request?._createdAt)).format('MM-D-YY')}</div>
                      <div className="text-gray-200">|</div>
                      <div>{request.userTel}</div>
                      <div className="text-gray-200">|</div>
                      <div>₦{request.amount}</div>
                      <div className="text-gray-200">|</div>
                      <div>{request.status ? <span className="text-green-700">Confirmed</span> : <span className="text-yellow-700">Pending</span>}</div>
                      <div className="text-gray-200">|</div>
                      <div className="relative">{request.status ? <BsPatchCheckFill className="text-[#ffa600] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl" /> : <MdOutlineSwitchRight className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl cursor-pointer"
                        onClick={() => { approveWithdraw(request._id, request.amount) }}
                      />}</div>
                    </div>
                  </div>
                </>)
              })}
            </>}
          </div>
        </section>



      </div>
    )
  }
  return (<>You are not allowed here!</>)
}

export async function getStaticProps(context) {
  const allPaymentProofs = await getAllPaymentProofs();
  const allWithdrawRequest = await getAllWithdrawRequest();

  return {
    props: { allPaymentProofs, allWithdrawRequest },
    revalidate: 1
  }
}