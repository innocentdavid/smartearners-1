import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { getUser, getOrders } from '../lib/api'

export default function Orders() {
  // const [user, setUser] = useState({
  //   userName: '0x9***384', myTicket: 0, balance: 350
  // })
  const version = process.env.NODE_ENV
  const { status, data } = useSession();
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      version === 'production' ? router.replace('/login') : alert('not loged in')
    }

    if (data && data.user.token) {
      const dataN = data?.user?.token
      const u = { ...dataN, balance: dataN.tbalance + dataN.ri + dataN.roi }
      dataN?.tel && setUser(u)
      
      const fetch = async () => {
        document.querySelector('#generalLoading').classList.remove('hidden')
        document.querySelector('#generalLoading').classList.add('grid')
        const cuser = await getUser(dataN.tel)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        if (cuser) {
          const u = { ...cuser, balance: cuser.tbalance + cuser?.ri + cuser?.roi }
          // console.log(u)
          setUser(u)
          const r = await updateUserPortfolio(user)
        }
      }
      fetch()
    }
  }, [status, data, router])


  const [orderItems, setOrderItems] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const orders = await getOrders()
      orders && setOrderItems(orders)
      console.log(orders)
    }
    fetch()
  }, [])

  const id = 1
  const da = 5000
  const percentage = 1;
  const returnPeriod = 365;
  const dailyReturn = (percentage / 100) * da
  const totalReturn = ((percentage / 100) * da) * returnPeriod
  const totalReturnPercentage = percentage * returnPeriod;

  const showModal = () => {
    const modal = document.querySelector("#modal")
    modal.classList.remove('hidden')
    modal.classList.add('flex')

    setTimeout(() => {
      modal.classList.remove('flex')
      modal.classList.add('hidden')
    }, 5000);
  }

  return (
    <div className="relative h-screen">
      <Head>
        <title>Orders</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

        <div className="flex items-center gap-5 text-[.8rem] ">
          <div className="flex flex-col items-center">Obtained  <strong>{user?.myTicket ? user?.myTicket : 0}</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav> 

      <header className="bg-gray-800 text-white py-3 px-5 font-Josefin text-sm ">
          <div>• Only 24H after deposit, rather than the moment you purchase, you receive its first daily return at your balance.</div>
          <div>• You can keep multiple plans simultaneously, no matter same or different ones.</div>
          <div>• All investment plans are only activated by tickets. <Link href="/deposit"><a className="text-[#ffa500] select-none">Please click here to buy tickets if needed.</a></Link></div>
      </header>

      <main className="mt-5">
        <section className="px-5 flex flex-col items-center">
          <div className="mb-8 w-full md:w-[60%]" onClick={() => { showModal() }}>
            <div className="h-[60px] px-4 flex justify-between md:gap-16 items-center bg-[#ffa500] text-white rounded-t-[10px]">
              <div className="font-bold font-[poppins] ">SMART <br /> EARNERS</div>
              <div className="flex items-center md:gap-2 gap-1 font-bold text-sm md:text-base ">
                <div>PC-{id}</div> <div className="text-[#eee]">|</div> <div>Total {totalReturnPercentage}%</div>
              </div>
            </div>

            <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem]">
              <div className="text-[#ffa500]">
                <div className="flex justify-between">
                  <div className="">
                    <div className="">Launch Time</div>
                    <div className="font-bold ">14:11, Aug 18th, 2022</div>
                  </div>

                  <div className="text-end">
                    <div className="">Daily Return Time</div>
                    <div className="flex items-center gap-2 font-bold">
                      <div>{percentage}%</div> <div className="text-[#eee]">|</div> <div>N{dailyReturn}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <div className="">
                    <div className="">Status</div>
                    <div className="font-bold ">Activated | Day 1</div>
                  </div>

                  <div className="text-end">
                    <div className="">Already Returned</div>
                    <div className="flex items-center gap-2 font-bold">
                      <div className="font-bold ">N50</div>
                    </div>
                  </div>
                </div>


              </div>

              <div className="">
                <div className="flex justify-between mt-5">
                  <div className="">
                    <div className="text-gray-500">Deposit Amount</div>
                    <div className="font-bold ">{da}</div>
                  </div>

                  <div className="text-end">
                    <div className="text-gray-500">Daily Return</div>
                    <div className="flex items-center gap-2 font-bold">
                      <div>{percentage}%</div> <div className="text-[#eee]">|</div> <div>N{dailyReturn}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <div className="">
                    <div className="text-gray-500">Return Period</div>
                    <div className="font-bold ">{returnPeriod} Days</div>
                  </div>

                  <div className="text-end">
                    <div className="text-gray-500">Total Return</div>
                    <div className="flex items-center gap-2 font-bold">
                      <div>{percentage * returnPeriod}%</div> <div className="text-[#eee]">|</div> <div>N{totalReturn}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />


      <div id="modal" className="hidden fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-black text-white py-4 px-8 w-full justify-center items-center text-sm font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam facere deleniti est eos dolorem modi?
      </div>
    </div>
  )
}
