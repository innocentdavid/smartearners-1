import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../context/authContext"
import { getAllPaymentProofs, getAllWithdrawRequest } from "../../lib/api"
import { MdCheck } from 'react-icons/md'
import { BsArrowUp, BsPatchCheckFill } from 'react-icons/bs'
import { BiCopy } from 'react-icons/bi'
import { TiTimes } from 'react-icons/ti'
import Head from "next/head"
import Link from "next/link"
import moment from "moment"
import { useSession } from 'next-auth/react';

export default function Admin() {
  const router = useRouter()
  const user = useContext(AuthContext)
  const { status } = useSession();
  const [allPaymentProofs, setAllPaymentProofs] = useState()
  const [allWithdrawRequest, setAllWithdrawRequest] = useState()
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

  useEffect(() => {
    const fetch = async () => {
      const app = await getAllPaymentProofs();
      const awr = await getAllWithdrawRequest();
      app && setAllPaymentProofs(app)
      awr && setAllWithdrawRequest(awr)
    }
    if (user) {
      fetch()
    }
  }, [user])

  const clearAll = () => {
    const mutations = [
      {
        "delete": {
          "query": "*[_type == 'paymentProof']",
        }
      },
      {
        "delete": {
          "query": "*[_type == 'withdraw']",
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

  const declineWithdraw = async (itemId, amount) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify(['declineWithdraw', itemId, amount, user]),
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

  const approveWithdraw = async (itemId) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify(['approveWithdraw', itemId]),
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

  const declinePayment = async (itemId) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['declineProof', itemId]),
        type: 'application/json'
      })
      if (response.status == 200) {
        const res = await response.json()
        if (res.message === 'success') {
          router.reload();
          document.querySelector('#generalLoading').classList.remove('grid')
          document.querySelector('#generalLoading').classList.add('hidden')
          return;
        } else {
          alert('Something went wrong!')
          console.log(response)
          console.log(res)
          return;
        }
      }
    } catch (err) {
      console.log(err)
      alert('something went wrong!');
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  const approvePayment = async (itemId, userId, amount) => {
    try {
      document.querySelector('#generalLoading').classList.remove('hidden')
      document.querySelector('#generalLoading').classList.add('grid')

      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['approvePayment', itemId, userId, amount]),
        type: 'application/json'
      })

      if (response.status == 200) {
        const res = await response.json()
        
        if (res.message === 'success') {
          alert('success')
          console.log(res)

          // router.reload();
          document.querySelector('#generalLoading').classList.remove('grid')
          document.querySelector('#generalLoading').classList.add('hidden')
          return;
        } else {
          alert('Something went wrong')
          console.log(res)
          return;
        }
      }
    } catch (err) {
      console.log(err)
      alert('something went wrong!')
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
    }
  }

  const showModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.remove('hidden')
  }

  const hideModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.add('hidden')
  }

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  if (user?.isAdmin) {
    return (<>
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

        {/* <div className="my-5 mx-5"><div className="h-7 w-28 text-center text-xs bg-black text-white cursor-pointer" onClick={clearAll}>clearAllOrder</div></div> */}

        <section className="mt-16 mb-8 px-4">
          <div className="bg-gray-400 px-[3px] py-[3px] rounded-[10px] flex items-center justify-center text-[.9rem] max-w-[600px] m-auto">
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
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">DATE/USER</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">AMOUNT</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">PROOF</td>
                      <td className="w-[27%] h-[38px] p-1 font-[fona] text-center">APP<br className="md:hidden" />ROVED</td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="h-3"></tr>
                    {allPaymentProofs?.map((data, index) => {
                      return (<>
                        <tr key={index} className={`${(index + 1) % 2 === 0 && "bg-[#f5f5f5]"} px-10`}>
                          <td className="p-1 font-[fona] text-center text-[.8rem]">{index + 1}</td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">
                            <div className="">{moment(data._createdAt).format('D-MM-YY')}</div>
                            <div className="">{data.userTel}</div>
                          </td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦{data.amount}</td>
                          <td className="w-[27%] h-[38px] overflow-hidden p-1 font-['Metric-SemiBold'] relative">
                            <Link href={data.imageUrl}><a target="_blank">
                              <img src={data.imageUrl} alt="" width="40px" height="30px" className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" />
                            </a></Link>
                          </td>
                          <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center relative">
                            {data.approved === "declined" ? <>
                              <BsPatchCheckFill className="text-red-700 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" />
                            </> : <>
                              {data.approved === "approved" ? <BsPatchCheckFill className="text-[#ffa600] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" /> : <>
                                <div className="h-full flex flex-col justify-between items-center">
                                  <MdCheck className="border cursor-pointer"
                                    onClick={() => { approvePayment(data._id, data.userId, data.amount) }}
                                  />

                                  <TiTimes className="border cursor-pointer"
                                    onClick={() => { declinePayment(data._id) }}
                                  />
                                </div>
                              </>}
                            </>}
                          </td>
                        </tr>
                        {/* <br /> */}
                      </>)
                    })}
                  </tbody>
                </table>
              </section>
            </> : <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                  <div></div>
                  <div>Date/User</div>
                  <div className="text-gray-200">|</div>
                  <div>Amount/Acc</div>
                  <div className="text-gray-200">|</div>
                  <div>Status</div>
                  <div className="text-gray-200">|</div>
                  <div>Approve</div>
                </div>
              </div>
              <br />

              {allWithdrawRequest?.map((request, index) => {
                // console.log(request)
                return (
                  <div key={request._id} className="">
                    <Modal hideModal={hideModal} bank={request.bank} number={request.accNo} name={request.accName} amount={request.amount} />

                    <div className="flex justify-around items-center text-xs md:text-base mt-2 text-black">
                      <div>{index + 1}</div>
                      <div className="flex flex-col items-center">
                        <div className="">{moment(new Date(request?._createdAt)).format('D-MM-YY')}</div>
                        <div className="">{request.userTel}</div>
                      </div>
                      <div className="text-gray-200">|</div>
                      <div>
                        <div className="">₦{request.amount}</div>
                        <div className="text-[.7rem] bg-[#ffaa00] p-1 rounded-sm" onClick={() => { showModal() }}>copy account</div>
                      </div>
                      <div className="text-gray-200">|</div>
                      <div><span className={request.status === "approved" ? "text-green-700" : "text-red-700"}>{request.status}</span></div>
                      <div className="text-gray-200">|</div>
                      <div className="relative z-[0]">
                        {request.status === 'declined' ? <BsPatchCheckFill className="text-red-700 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl" /> : <>
                          {request.status === "approved" ? <BsPatchCheckFill className="text-[#ffa600] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl" /> : <>
                            <div className="">
                              <MdCheck className="text-lg border cursor-pointer"
                                onClick={() => { approveWithdraw(request._id) }}
                              />

                              <TiTimes className="mt-3 text-lg border cursor-pointer"
                                onClick={() => { declineWithdraw(request._id, request?.amount) }}
                              />
                            </div>
                          </>}
                        </>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </>}
          </div>
        </section>
      </div>
    </>)
  }
  return (<>You are not allowed here!</>)
}

const Modal = ({ hideModal, name, bank, number, amount }) => {
  return (<>
    <div id="modal" className="hidden fixed">
      <div onClick={hideModal} className="cursor-pointer fixed top-0 left-0 w-screen h-screen grid place-items-center bg-[rgba(0,0,0,.1)] text-white font-['Poppins']" title="close">
      </div>

      <div className="z-[5] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] mx-auto">
        <div className="h-[70px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa500] text-white rounded-t-[10px]">
          <div className="font-bold font-[poppins] uppercase">SMART <br /> Earners</div>
          <div className="text-end">
            <div className="text-black font-semibold">COPY</div>
            <div className="text-2xl font-bold">Account Details</div>
          </div>
        </div>

        <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem] bg-[#fff] text-black">
          <div className="">
            <p className="flex gap-4">
              <div className="">ACCOUNT NUMBER: <span className="font-bold">{number}</span></div> <BiCopy onClick={() => { navigator.clipboard.writeText(`${number}`); alert('copied!') }} />
            </p>
            <p className="my-3 flex gap-4">
              <div className="">ACCOUNT NAME: <span className="font-bold">{name}</span></div> <BiCopy onClick={() => { navigator.clipboard.writeText(`${name}`); alert('copied!') }} />
            </p>
            <p className="flex gap-4">
              <div className="">BANK: <span className="font-bold">{bank}</span></div> <BiCopy onClick={() => { navigator.clipboard.writeText(`${bank}`); alert('copied!') }} />
            </p>
            <p className="mt-3">AMOUNT: <span className="font-bold">#{amount}</span></p>
          </div>
        </div>
      </div>
    </div>
  </>)
}