import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsArrowUp } from 'react-icons/bs'

export default function Profile() {
  const [user, setUser] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

  const router = useRouter()

  const [ticket, setTicket] = useState(3000)
  const [amountDeposited] = useState(ticket)

  return (
    <div className="relative h-screen">
      <Head>
        <title>Deposit</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between items-center border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>

        <div className="flex items-center gap-5 text-[.8rem] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong className="text-lg font-Josefin">{user?.myTicket}</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="text-lg font-Josefin">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="bg-gray-800 text-white py-3 px-5 font-Josefin text-[16px]">
        <ul>
          <li>All investment plans at Phoenix can only be purchased with tickets. Please click on any of packages below to buy some tickets first before you invest:</li>
        </ul>
      </header>

      <main className="mt-3">
        <div>
          <ul className="donate-now">
            <li>
              <input type="radio" id="a25" name="amount" />
              <label for="a25">$25</label>
            </li>
            <li>
              <input type="radio" id="a50" name="amount" />
              <label for="a50">$50</label>
            </li>
            <li>
              <input type="radio" id="a75" name="amount" checked="checked" />
              <label for="a75">$75</label>
            </li>
            <li>
              <input type="radio" id="a100" name="amount" />
              <label for="a100">$100</label>
            </li>
            <li>
              <input type="radio" id="other" name="amount" />
              <label for="other">other:</label>
            </li>
            <li>
              <input type="text" id="otherAmount" name="numAmount" />
            </li>
          </ul>
        </div>
        <br />
        <br />
        <div className="font-[fona] text-[18px]">
          <div className="flex border-b">
            <label htmlFor="a3000" className="w-full flex items-center justify-center h-[59px] bg-[#ffa600] text-white border-r">
              <input type="radio" name="amountsample" id="a3000" checked />
              <div className="">3000</div>
            </label>

            <label htmlFor="a6000" className="w-full flex items-center justify-center h-[59px] border-r">
              <input type="radio" name="amountsample" id="a6000" />
              <div className="">6000</div>
            </label>

            <label htmlFor="a10000" className="w-full flex items-center justify-center h-[59px]">
              <input type="radio" name="amountsample" id="a10000" />
              <div className="">10000</div>
            </label>

          </div>
          <div className="flex border-b">
            <label htmlFor="a30000" className="w-full flex items-center justify-center h-[59px] border-r">
              <input type="radio" name="amountsample" id="a30000" />
              <div className="">30000</div>
            </label>

            <label htmlFor="a60000" className="w-full flex items-center justify-center h-[59px] border-r">
              <input type="radio" name="amountsample" id="a60000" />
              <div className="">60000</div>
            </label>

            <label htmlFor="a150000" className="w-full flex items-center justify-center h-[59px]">
              <input type="radio" name="amountsample" id="a150000" />
              <div className="">150000</div>
            </label>

          </div>
          <div className="flex border-b">
            <label htmlFor="a500000" className="w-full flex items-center justify-center h-[59px] border-r">
              <input type="radio" name="amountsample" id="a500000" />
              <div className="">500000</div>
            </label>

            <label htmlFor="a1000000" className="w-full flex items-center justify-center h-[59px] border-r">
              <input type="radio" name="amountsample" id="a1000000" />
              <div className="">1000000</div>
            </label>

            <label htmlFor="aAmount" className="w-full flex items-center justify-center h-[59px] text-sm">
              <input type="radio" name="amountsample" id="aAmount" />
              <div className="">EnterAmount</div>
            </label>

          </div>
        </div>
        <br />
        <br />

        <div className="font-[fona] text-[18px]">
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] bg-[#ffa600] text-white border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px]">3000</div>
          </div>
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px]">3000</div>
          </div>
          <div className="flex border-b">
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] border-r">3000</div>
            <div className="w-full flex items-center justify-center h-[59px] text-sm">Enter Amount</div>
          </div>
        </div>

        <div className="px-5">
          <div className="flex justify-between mt-5">
            <div>Buy Tickets:</div>
            <input type="number" name="ticket" id="ticket" placeholder={ticket} className="w-[100px] text-end outline-none border-b border-[#ffa500] font-[fona] " />
          </div>

          <div className="flex justify-between mt-5">
            <div>Deposit Amount:</div>
            <div className="font-bold font-[fona]">N3000</div>
          </div>

          <div className="flex justify-end font-[fona] mt-5">( 1Ticket = 1N )</div>

          <div className="bg-[#ffa500] text-white h-[40px] w-full flex justify-center items-center mt-8 text-lg font-bold rounded-[10px] font-[fona]">Deposit</div>

          <p className="text-center mt-5"><a href="#" className="text-[#ffa500] underline">{`I paid, but I didn't get ticket?`}</a></p>
        </div>
      </main>
    </div>
  )
}
