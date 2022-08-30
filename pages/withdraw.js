import moment from 'moment';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs'
import { TbCurrencyNaira } from 'react-icons/tb'
import AuthContext from '../context/authContext';
import { getAllBalanceRecord, getAllWithDrawRecord } from '../lib/functions';

export default function Withdraw() {
  const router = useRouter()
  const user = useContext(AuthContext)
  const balance = user?.tbalance + user?.roi + user?.ri + user?.vrs
  const tabsData = [
    {
      label: "Withdrawal Record",
      content:
        "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
    },
    {
      label: "Balance Record",
      content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState();

  const [withdrawRecord, setWithdrawRecord] = useState([])
  const [balanceRecord, setBalanceRecord] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const wr = await getAllWithDrawRecord(user?._id);
      const br = await getAllBalanceRecord(user?._id);
      if(wr.message === 'success'){
        // console.log('setWithdrawRecord(wr?.res?.data)', wr?.res?.data)
        setWithdrawRecord(wr?.res?.data)
      }else{
        alert(wr.message)
        console.log(wr.err)
      }
      if(br.message === 'success'){
        // console.log('setBalanceRecord(br.res?.data)', br.res?.data)
        setBalanceRecord(br.res?.data)
      }else{
        alert(br.message)
        console.log(br.err)
      }
    }
    if(user){
      fetch()
    }
  }, [user])


  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amountToWithdraw) {
      alert('The minimum you can withdraw is 1000')
      return;
    }
    if (amountToWithdraw < 1000) {
      alert('The minimum you can withdraw is 1000')
      return;
    }
    if (amountToWithdraw > balance) {
      alert(`Your balance is ${balance} so you can't withdraw more than what you have`)
      return;
    }

    // run withdraw
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify(['withdraw', user, amountToWithdraw]),
        type: 'application/json'
      })
      const res = await response.json()
      console.log(res)
      if (response.status == 200) {
        alert('Your request has been submited successfully')
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

  return (
    <>
      <Head>
        <title>Withdraw</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase ">Withdraw</div>
      </header>

      <main>
        <div className="flex flex-col items-center mt-10">
          <div className="flex items-center gap-3">
            <div><img src="/images/withdraw-1.png" alt="" width="42px" height="42px" /></div>
            <div className="">
              <div className="font-black flex items-center"><TbCurrencyNaira size="20px" /><span>{balance}</span></div>
              <div className="font-semibold">Balance</div>
            </div>
          </div>

          <div className="flex gap-3 font-['Metric-Medium'] text-[15px] mt-10">
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">24 / 7 Auto</div>
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">Daily Max 5 Requests</div>
          </div>
          <div className="flex gap-3 font-['Metric-Medium'] text-[15px] mt-3">
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">24 / 7 Auto</div>
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">24 / 7 Auto</div>
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">24 / 7 Auto</div>
          </div>
        </div>

        <form action="" className="mt-5">
          <div className="">
            <div className="flex gap-2 items-center w-screen px-3 mb-2">
              <TbCurrencyNaira size="30px" />
              <input type="number" name="amount" id="amount" placeholder="Enter the amount you want to withdraw" className="border-none outline-none w-full text-sm focus-within:text-base"
                onChange={(e) => { setAmountToWithdraw(e.target.value) }}
                value={amountToWithdraw && amountToWithdraw}
              />
            </div>
            <div className="min-w-full border-t"></div>
          </div>

          <div className="flex justify-center mt-5"><button type="submit" className="bg-[#ffa600] text-white font-semibold px-16 py-2" onClick={handleWithdraw}>Withdraw</button></div>
        </form>

        <section className="mt-16 mb-8 px-4">
          <div className="bg-gray-400 px-[3px] py-[3px] rounded-[10px] flex items-center justify-center text-[.9rem]">
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`w-full pt-4 pb-2 text-center rounded-[10px] transition-colors duration-300 ${idx === activeTabIndex
                    ? "bg-white"
                    : "hover:bg-gray-200"
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
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                  <div></div>
                  <div>Time</div>
                  <div className="text-gray-200">|</div>
                  <div>Amount</div>
                  <div className="text-gray-200">|</div>
                  <div>Status</div>
                </div>
              </div>
              <br />

              {withdrawRecord && withdrawRecord?.map((record, index) => {
                return (<>
                  <div key={record._id} className="">
                    <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                      <div>{index + 1}</div>
                      <div>{record?._createdAt && moment(new Date(record?._createdAt)).format('MM-D-YY')}</div>
                      <div className="text-gray-200">|</div>
                      <div>N{record?.amount}</div>
                      <div className="text-gray-200">|</div>
                      <div>{record?.pending ? 'Confirmed' : 'Pending...'}</div>
                    </div>
                  </div>
                </>)
              })}
            </> : <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                  <div></div>
                  <div>Time</div>
                  <div className="text-gray-200">|</div>
                  <div>Item</div>
                  <div className="text-gray-200">|</div>
                  <div>Amount</div>
                  {/* <div className="text-gray-200">|</div>
                  <div>Remaining</div> */}
                </div>
              </div>
              <br />

              {balanceRecord?.map((record, index) => {
                return (<>
                  <div key={record._id} className="">
                    <div className="flex justify-around items-center text-xs md:text-base mt-2 text-gray-400">
                      <div>{index+1}</div>
                      <div>{moment(new Date(record?._createdAt)).format('MM-D-YY')}</div>
                      <div className="text-gray-200">|</div>
                      <div>{record.title}</div>
                      <div className="text-gray-200">|</div>
                      <div>{record.amount}</div>
                      {/* <div className="text-gray-200">|</div>
                      <div>{record.remaining}</div> */}
                    </div>
                  </div>
                </>)
              })}

            </>}
          </div>
        </section>
      </main>
    </>
  )
}
