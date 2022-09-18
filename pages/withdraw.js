import moment from 'moment';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs'
import { TbCurrencyNaira } from 'react-icons/tb'
import AuthContext from '../context/authContext';
import { getAllBalanceRecord, getAllPaymentRecord, getAllWithDrawRecord } from '../lib/functions';

export default function Withdraw() {
  const router = useRouter()
  const { p } = router.query
  const {user, setUser} = useContext(AuthContext)
  const balance = user?.tbalance + user?.roi + user?.ri + user?.vrs
  const tabsData = [
    { label: "Withdrawal Record", content: "" },
    { label: "Balance Record", content: "" },
    { label: "Payment Record", content: "" },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState();

  const [withdrawRecord, setWithdrawRecord] = useState([])
  const [balanceRecord, setBalanceRecord] = useState([])
  const [paymentRecord, setPaymentRecord] = useState([])
  const [canWithdraw, setCanWithdraw] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const wr = await getAllWithDrawRecord(user?._id);
      const br = await getAllBalanceRecord(user?._id);
      const pr = await getAllPaymentRecord(user?._id);

      if (wr?.message === 'success') {
        // console.log('setWithdrawRecord(wr?.res?.data)', wr?.res?.data)
        setWithdrawRecord(wr?.res?.data)
      } else {
        alert(wr?.message)
        console.log(wr?.err)
      }
      if (br?.message === 'success') {
        // console.log('setBalanceRecord(br?.res?.data)', br?.res?.data)
        setBalanceRecord(br?.res?.data)
      } else {
        alert(br?.message)
        console.log(br?.err)
      }
      if (pr?.message === 'success') {
        // console.log('setBalanceRecord(pr?.res?.data)', pr?.res?.data)
        setPaymentRecord(pr?.res?.data)
      } else {
        alert(pr?.message)
        console.log(pr?.err)
      }
    }
    if (user) {
      fetch()
    }
  }, [user])

  useEffect(() => {
    // console.log(p)
    if (p) {
      setActiveTabIndex(parseInt(p))
    }
  }, [p])

  const canWithdrawCheck = (user) => {
    if(!user.lastWithdrawDate) return true;
    if(!user.isValid) return false;

    // console.log(user.lastWithdrawDate)
    const lastWithdrawDate = new Date(user.lastWithdrawDate).getTime()
    const now = new Date().getTime()
    const gap = now - lastWithdrawDate
    const dif = Math.floor(gap / (1000 * 3600 * 24))
    // console.log(dif)
    if (dif >= 1) {
      return true
    }
    return false
  }

  useEffect(() => {
    // console.log(p)
    if (user) {
      const cw = canWithdrawCheck(user)
      // console.log(cw)
      setCanWithdraw(cw)
    }
  }, [user])

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if(!canWithdrawCheck(user)) {
      alert('You can only withdraw once a day')
      return;
    };

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

    if (user) {
      if (!user.accountNumber) {
        alert("You have not provided your account number")
        router.push('/updateAccount')
        return;
      }
      if (!canWithdraw) {
        alert('You can only withdraw once a day')
        router.push('/profile')
        return;
      }

      // run withdraw
      try {
        document.querySelector('#generalLoading').classList.remove('hidden')
        document.querySelector('#generalLoading').classList.add('grid')
        const response = await fetch('/api/withdraw', {
          method: 'POST',
          body: JSON.stringify(['withdraw', user, parseInt(amountToWithdraw)]),
          type: 'application/json'
        })
        const res = await response.json()
        // console.log(res)
        if (response.status == 200) {
          // const u = await getUserById(user?._id)
          setTimeout(async () => {
            // await getUserById(user._id)
            // await getUserById(user._id)
            // await getUserById(user._id)
            router.reload();
          }, 500);
          // const u3 = await getUserById(user._id)
          // setUser(u3)
          alert('Your request has been submited successfully')
          console.log(u)
          router.reload();
          return;
        }
      } catch (err) {
        alert('somthing went wrong, please try again later')
        console.log(err)
        // document.querySelector('#generalLoading').classList.remove('grid')
        // document.querySelector('#generalLoading').classList.add('hidden')
      }
    } else {
      alert('you have to login to be here!');
      router.reload();
      return;
    }
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
        <div className="flex flex-col items-center mt-10 px-4">
          <div className="flex items-center gap-3">
            <div><img src="/images/withdraw-1.png" alt="" width="42px" height="42px" /></div>
            <div className="">
              <div className="font-black flex items-center"><TbCurrencyNaira size="20px" /><span>{balance}</span></div>
              <div className="font-semibold">Balance</div>
            </div>
          </div>

          <div className="flex gap-3 font-['Metric-Medium'] text-[15px] mt-10">
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">Daily Mining</div>
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">Daily Max 1 Requests</div>
          </div>
          <div className="flex gap-3 font-['Metric-Medium'] text-[15px] mt-3">
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px] text-center">Min withdrawal N1,000</div>
            <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px] text-center">7% charges update on withdrawal</div>
            {/* <div className="px-3 py-1 bg-[#fff3dc] text-[#ffa600] rounded-[5px]">24 / 7 Auto</div> */}
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
          <div className="bg-gray-400 px-[3px] py-[3px] rounded-[10px] flex items-center justify-center text-[.9rem] max-w-[600px] m-auto">
            {tabsData.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  className={`border-r font-bold w-full pt-4 pb-2 text-center rounded-[10px] transition-colors duration-300 text-xs md:text-base ${idx === activeTabIndex
                    ? "bg-white"
                    : "hover:bg-gray-200 hover:text-black text-white"
                    }`}
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex(idx)}>
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="py-4 text-gray-700" id="record">
            {activeTabIndex == 0 && <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2">
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
                    <div className="flex justify-around items-center text-xs md:text-base mt-2">
                      <div>{index + 1}</div>
                      <div>{record?._createdAt && moment(new Date(record?._createdAt)).format('MM-D-YY')}</div>
                      <div className="text-gray-200">|</div>
                      <div>N{record?.amount}</div>
                      <div className="text-gray-200">|</div>
                      <div className={`${record.status === 'declined' && "text-red-700"}`}>{record?.status}</div>
                    </div>
                  </div>
                </>)
              })}
            </>}
            
            {activeTabIndex == 1 && <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2">
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
                    <div className="flex justify-around items-center text-xs md:text-base mt-2">
                      <div>{index + 1}</div>
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

            {activeTabIndex == 2 && <>
              <div className="">
                <div className="flex justify-around items-center text-xs md:text-base mt-2">
                  <div></div>
                  <div>Time</div>
                  <div className="text-gray-200">|</div>
                  <div>Amount</div>
                  <div className="text-gray-200">|</div>
                  <div>Status</div>
                  {/* <div className="text-gray-200">|</div>
                  <div>Remaining</div> */}
                </div>
              </div>
              <br />

              {paymentRecord?.map((record, index) => {
                // if(record.st)
                return (<>
                  <div key={record._id} className="">
                    <div className="flex justify-around items-center text-xs md:text-base mt-2">
                      <div>{index + 1}</div>
                      <div>{moment(new Date(record?._createdAt)).format('MM-D-YY')}</div>
                      <div className="text-gray-200">|</div>
                      <div>{record.amount}</div>
                      <div className="text-gray-200">|</div>
                      <div className={`${record.approved === 'declined' && "text-red-700"}`}>{record.approved}</div>
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
