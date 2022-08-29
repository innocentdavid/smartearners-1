import moment from 'moment'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Footer from '../components/footer'
import { useAppContext } from '../context/AppContext'
import AuthContext from '../context/authContext'
import { getUser, getOrders } from '../lib/api'

export default function Orders() {
  const user = useContext(AuthContext)
  const { status, data } = useSession();
  const router = useRouter()

  const [orderItems, setOrderItems] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        // await delOrders()
        const orders = await getOrders(user._id).catch(err => {
          console.log(err)
        })
        orders?.order && setOrderItems(orders.order)
      }
    }
    fetch()
  }, [])

  return (
    <div className="relative h-screen">
      <Head>
        <title>Orders</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-8 md:px-36">
        <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center select-none cursor-pointer" onClick={() => { router.push('/') }}>SMART ENERGY</div>

        <div className="flex items-center gap-5 text-[.8rem] ">
          {/* <div className="flex flex-col items-center"><div>Obtained</div><div>Already</div><strong id="oa">N{user?.roi}</strong></div> */}
          {/* <div className="flex flex-col items-center"><div>Current</div><div>Daily Return</div> <strong className="">N<span id="cdr">0</span></strong></div> */}
        </div>
      </nav>

      <header className="bg-gray-800 text-white py-3 px-5 font-Josefin text-sm ">
        <div>• Only 24H after deposit, rather than the moment you purchase, you receive its first daily return at your balance.</div>
        <div>• You can keep multiple plans simultaneously, no matter same or different ones.</div>
        <div>• All investment plans are only activated by tickets. <Link href="/deposit"><a className="text-[#ffa500] select-none">Please click here to buy tickets if needed.</a></Link></div>
      </header>

      <main className="mt-5">
        <section className="px-5 flex flex-col items-center">
          {orderItems && orderItems?.map((item, index) => {
            if (item?.da) {
              return <OrderCard key={index} order={item} />
            }
          })}
        </section>
      </main>

      <Footer />

    </div>
  )
}

const OrderCard = ({ order }) => {
  // console.log(order)
  if (order) {
    const title = order?.planTitle
    const id = order._id
    const da = order?.da
    const percentage = order.percentage;
    const dailyReturn = (percentage / 100) * da
    const returnPeriod = order.returnPeriod;
    const totalReturn = ((percentage / 100) * da) * returnPeriod
    const totalReturnPercentage = percentage * returnPeriod;

    const createdAt = new Date(order._createdAt).getTime()
    const launchedTime = moment(order._createdAt).format('h:mm, MMM Do, YYYY')
    var now = new Date().getTime();
    var gap = now - createdAt;
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    const d = Math.floor(gap / (day))

    const daysServed = d;
    const obtained = d * dailyReturn;
    const daysRemaining = returnPeriod - d;

    const showModal = () => {
      const modal = document.querySelector(`#modal${id}`)
      modal.classList.remove('hidden')
      modal.classList.add('flex')

      setTimeout(() => {
        modal.classList.remove('flex')
        modal.classList.add('hidden')
      }, 2000);
    }

    return (<>
      <div id={`modal${id}`} className="hidden fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-black text-white py-4 px-8 w-full justify-center items-center text-sm font-semibold">
        {
          `This plan returns N ${dailyReturn} to your balance everyday. you've now obtained N ${obtained} on it on it's serving day ${daysServed}. It will keep running for ${daysRemaining} more days.`
        }
      </div>


      <div className="mb-8 w-full md:w-[60%]" onClick={() => { showModal() }}>
        <div className="h-[60px] px-4 flex justify-between md:gap-16 items-center bg-[#ffa500] text-white rounded-t-[10px]">
          <div className="font-bold font-[poppins] ">SMART <br /> ENERGY</div>
          <div className="flex items-center md:gap-2 gap-1 font-bold text-sm md:text-base ">
            <div>{title}</div> <div className="text-[#eee]">|</div> <div>Total {totalReturnPercentage}%</div>
          </div>
        </div>

        <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem]">
          <div className="text-[#ffa500]">
            <div className="flex justify-between">
              <div className="">
                <div className="">Launch Time</div>
                <div className="font-bold ">{launchedTime}</div>
              </div>

              <div className="text-end">
                <div className="">Daily Return Time</div>
                <div className="font-bold ">{`${moment(order._createdAt).format('h:mm')} - ${parseInt(moment(order._createdAt).format('h.mm')) + 1}`}</div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="">
                <div className="">Status</div>
                <div className="font-bold ">{order && order.status ? order.status : 'Active'} | Day {d}</div>
              </div>

              <div className="text-end">
                <div className="">Already Returned</div>
                <div className="font-bold ">₦{daysServed * dailyReturn}</div>
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
                  <div>{percentage}%</div> <div className="text-[#eee]">|</div> <div>₦{dailyReturn}</div>
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
                  <div>{percentage * returnPeriod}%</div> <div className="text-[#eee]">|</div> <div>₦{totalReturn}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>)
  }

}