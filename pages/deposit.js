import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BsArrowUp } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { AiOutlineCreditCard, AiOutlineCheckCircle } from 'react-icons/ai'
import { depositWithBalance } from '../lib/api'
import { useAppContext } from '../context/AppContext'
import AuthContext from '../context/authContext'
import { signOut } from 'next-auth/react'

export default function Deposit() {
  const {user, setUser} = useContext(AuthContext)
  const router = useRouter()
  const [ticket, setTicket] = useState(3000)
  const [ticketPlaceholder, setTicketPlaceholder] = useState()
  const [amountDeposited] = useState(ticket)
  const [paymentGateWay, setPaymentGateWay] = useState(2)
  const [showPaymentGateWay, setShowPaymentGateWay] = useState(false)

  const selectAmount = (e) => {
    const value = e.target.value
    document.querySelector('#ticket').value = ''
    document.querySelector('#ticket').placeholder = value
    setTicketPlaceholder(value)
    setTicket(value)
  }

  const deposit = () => {
    if (!ticket) {
      alert('Please enter amount');
      return
    }
    setShowPaymentGateWay(true)
  }

  const makeDeposit = async () => {
    if (paymentGateWay === 2) {
      // paywithBalance
      if (!((user.tbalance + user?.ri + user?.roi + user?.vrs) >= parseInt(ticket))) {
        alert('Your balance is not enough')
        return
      }
      // const res = await depositWithBalance(user, ticket)
      try {
        document.querySelector('#generalLoading').classList.remove('hidden')
        document.querySelector('#generalLoading').classList.add('grid')
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(['depositWithBalance', user, parseInt(ticket)]),
          type: 'application/json'
        })
        const res = await response.json()
        if (res) {
          setTimeout(async () => {
            const u1 = await getUserById(user._id)
            const u2 = await getUserById(user._id)
            const u3 = await getUserById(user._id)
            router.reload();
          }, 10000);
          alert(`You have successfully purchase ${ticket} tickets with your balance`)
          setShowPaymentGateWay(false)
          // signOut()
          router.reload()
          return;
        } else {
          console.log(res)
        }
      } catch (err) {
        console.log(err)
        router.reload()
        alert('something went wrong!')
      }
    }
    router.push(`/gateway1?ticket=${parseInt(ticket)}`)
    setShowPaymentGateWay(false)
  }

  return (<>
    <Head>
      <title>Deposit</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="relative h-screen">
      <nav className="flex justify-between items-center border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>

        <div className="flex items-center gap-5 text-[.8rem] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong className="text-lg font-Josefin">{user?.myTicket}</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="text-lg font-Josefin">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="bg-gray-800 text-white py-3 px-5 font-Josefin text-[16px]">
        <ul>
          <li>All investment plans at Smartearners can only be purchased with tickets. Please click on any of packages below to buy some tickets first before you invest:</li>
        </ul>
      </header>

      <main className="mt-3">
        <div>
          <ul className="donate-now border-b">
            <li>
              <input type="radio" id="a25" name="amount" value="3000" onClick={selectAmount} />
              <label htmlFor="a25" className="border-r">3000</label>
            </li>
            <li>
              <input type="radio" id="a50" name="amount" value="6000" onClick={selectAmount} />
              <label htmlFor="a50" className="border-r">6000</label>
            </li>
            <li>
              <input type="radio" id="a75" name="amount" value="10000" onClick={selectAmount} />
              <label htmlFor="a75" className="">10000</label>
            </li>
          </ul>

          <ul className="donate-now border-b">
            <li>
              <input type="radio" id="a25" name="amount" value="30000" onClick={selectAmount} />
              <label htmlFor="a25" className="border-r">30000</label>
            </li>
            <li>
              <input type="radio" id="a50" name="amount" value="60000" onClick={selectAmount} />
              <label htmlFor="a50" className="border-r">60000</label>
            </li>
            <li>
              <input type="radio" id="a75" name="amount" value="150000" onClick={selectAmount} />
              <label htmlFor="a75" className="">150000</label>
            </li>
          </ul>

          <ul className="donate-now border-b">
            <li>
              <input type="radio" id="a100" name="amount" value="500000" onClick={selectAmount} />
              <label htmlFor="a100" className="border-r">500000</label>
            </li>
            <li>
              <input type="radio" id="a100" name="amount" value="1000000" onClick={selectAmount} />
              <label htmlFor="a100" className="border-r">1000000</label>
            </li>
            <li>
              <input type="radio" id="other" name="amount" className="cursor-pointer" onClick={() => { document.getElementById('ticket').focus() }} />
              <label htmlFor="other">Enter Amount</label>
            </li>
          </ul>
        </div>

        <div className="px-5">
          <div className="flex justify-between mt-5">
            <div>Buy Tickets:</div>
            <input type="number" name="ticket" id="ticket" placeholder={ticketPlaceholder} className="w-[100px] text-end outline-none border-b border-[#ffa500] font-[fona] font-bold text-[#ffa600] "
              onChange={(e) => { setTicket(e.target.value) }}
              value={ticket} />
          </div>

          <div className="flex justify-between mt-5">
            <div>Deposit Amount:</div>
            <div className="font-bold font-[fona]">N{ticket}</div>
          </div>

          <div className="flex justify-end font-[fona] mt-5">( 1Ticket = 1N )</div>

          <div className="bg-[#ffa500] text-white h-[40px] w-full flex justify-center items-center mt-8 text-lg font-bold rounded-[10px] font-[fona] cursor-pointer" onClick={deposit}>Deposit</div>

          {/* <p className="text-center mt-5"><a href="#" className="text-[#ffa500] underline">{`I paid, but I didn't get ticket?`}</a></p> */}
        </div>
      </main>
    </div>

    {showPaymentGateWay && <div className="absolute top-0 left-0 w-full h-screen z-[999]" style={{ background: 'rgba(0,0,0,.7)' }}>
      <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-[30px] px-6 py-4">
        <header className="flex items-center justify-end px-8 mb-2 relative">
          <div className="cursor-pointer rotate-[270deg]" onClick={() => { setShowPaymentGateWay(false) }}><FaTimes size="20px" className="stroke-1" /></div>
          <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase ">Payment: <span className="text-[#ffa600] font-black">N{ticket}</span></div>
        </header>

        <div className="flex justify-center items-center gap-2">
          <AiOutlineCreditCard className="text-[#ffa600] stroke-2" />
          <span className="font-bold">Select a payment gateway</span>
        </div>

        <ul className="donate-now border-y py-3 flex-col gap-4 border-b mt-5">
          <li>
            <input type="radio" id="g1" name="gWay" value="1" onClick={() => { setPaymentGateWay(1) }} />
            <label htmlFor="g1" className="bg-gray-200 border-r flex items-center gap-4">Gateway 1 <AiOutlineCheckCircle className="text-xl text-inherit" /></label>
          </li>
          <li>
            <input type="radio" id="g2" name="gWay" value="2" onClick={() => { setPaymentGateWay(2) }} />
            <label htmlFor="g2" className="bg-gray-200 border-r flex items-center gap-4">Pay with Balance <AiOutlineCheckCircle className="text-xl text-inherit" /></label>
          </li>
        </ul>

        <div className="mt-5 h-[30px] grid place-items-center bg-[#ffa600] text-white font-bold rounded-[5px] cursor-pointer" onClick={makeDeposit}>Deposit</div>
      </div>
    </div>}
  </>)
}
