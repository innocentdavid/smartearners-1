import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import AuthContext from "../context/authContext";
import { getAllValidRefer } from "../lib/functions";
// import { getValidRefers } from "../lib/api";

export default function Pervalidrefer() {
  const router = useRouter()
  const { status, data } = useSession();
  const { user, setUser } = useContext(AuthContext)
  const [validRefers, setValidRefers] = useState([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status])

  useEffect(() => {
    const fetch = async () => {
      let res = await getAllValidRefer(user._id)
      if (res.message == 'success') {
        const data = res.res.data
        console.log(data)
        setValidRefers(data)
      }
    }
    if (user) {
      fetch()
    }
  }, [user])

  const claimReward = async () => {
    if (validRefers?.length < 50) {
      alert('You must have atleast 50 active members to claim this reward');
      return
    }

    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    if (user) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(['claimReward', user]),
          type: 'application/json'
        })
        await response.json()        
      } catch (err) {
        console.log(err)
        alert('Something went wrong')
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      }
      const u3 = await getUserById(user?._id)
      setUser(u3)
      setTimeout(async () => {
        // await getUserById(user?._id)
        alert('successful')
        router.reload()
      }, 500);
      return;
    } else {
      alert('You have to log in first!')
      return;
    }
  }

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
          <title>Per Valid Refer - Smart Earners</title>
          <meta name="description" content="Per Valid Refer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="flex items-center px-8 py-5 border-b border-gray-300 relative">
          <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>
          <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold ">Per Valid Refer</div>
        </nav>

        <header className="bg-[#242931] text-[#fff] py-4 px-5 font-Josefin text-[14px] md:text-center">
          <div className="flex gap-4 md:justify-center">
            <ImUsers />
            <div className="font-bold text-[.9rem] md:text-[1rem] ">₦20,000 Monthly Salary</div>
          </div>

          <p className="mt-3 text-[.75rem]">{'Receive ₦20,000 monthly salary when you have up to 50 active downlines.'}</p>
        </header>

        <div className="flex justify-between py-2 px-4">
          <div className="h-[50px] px-[50px] bg-black text-white grid place-items-center cursor-pointer" onClick={claimReward}>Claim Your reward</div>
          <div className="flex flex-col items-end py-2 px-4">
            <strong>Total Valid Refer: <span>{validRefers?.length}</span></strong>
            <strong>Total Earnings: <span>₦{user?.vrs ? user?.vrs : 0}</span></strong>
          </div>
        </div>

        <section className="mt-8">
          <table className="pb-[20px] w-full mx-[4%]">
            <thead id="level1">
              <tr className="">
                <td className="border-r border-gray-300  w-[8%] h-[38%] p-1 font-[fona] text-center text-[.8rem]">
                  {/* sn */}
                </td>
                <td className="border-r border-gray-300 w-[20%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">Date</td>
                <td className="border-r border-gray-300 w-[36%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">Refer</td>
              </tr>
            </thead>
          </table>
        </section>

        <section className="">
          <table className="pb-[20px] w-full mx-[4%]">
            <tbody id="level1">
              {validRefers?.map((item, index) => {
                // console.log(item)
                return (<>
                  <tr className={(index + 1) % 2 !== 0 && 'bg-[#f5f5f5]'}>
                    <td className="border-r border-gray-300  w-[8%] h-[38%] p-1 font-[fona] text-center text-[.8rem]">
                      {index + 1}
                    </td>
                    <td className="border-r border-gray-300 w-[20%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{moment(new Date(item._createdAt)).format('MM-D-YY')}</td>
                    <td className="border-r border-gray-300 w-[36%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{item.user.tel}</td>
                  </tr>
                </>)
              })}
            </tbody>
          </table>
        </section>
      </>
    )
  }
}
