import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BiBookmarkAltPlus, BiTrendingUp } from 'react-icons/bi'
import { TbHeartHandshake, TbDiamond } from 'react-icons/tb'

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative h-screen">
      <Head>
        <title>Smart Earners</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between border-b border-[#ccc] py-5 px-8">
        {/* <div className="text-[#ffa500] border border-[#ffa500] bg-white px-3 h-[35px] flex items-center ">SMART EARNERS</div> */}
        <div className="bg-[#000000] text-white font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

        <div className="flex items-center gap-5 text-[.8rem] ">
          <div className="flex flex-col items-center">Ticket <strong>0</strong></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>300</span></strong></div>
        </div>
      </nav>

      <header className="text-center bg-[#ffd78d] py-24 mb-5">
        <div className="text-2xl font-semibold font-['Poppins'] ">carousel</div>
      </header>

      <main className="">
        <section className="flex items-center justify-between md:justify-evenly gap-5 px-6 my-5">
          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#ffd78d] text-white flex justify-center items-center ">
              <img src="/images/icons8-naira-48.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] ">Withdraw</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#ffd78d] text-white flex justify-center items-center ">
              <img src="/images/icons8-share-50.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] ">Referral</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#ffd78d] text-white flex justify-center items-center ">
              <img src="/images/icons8-comments-50.png" alt="" width="20px" className="" />
            </div>
            <div className="text-[.8rem] font-bold font-['Poppins'] ">Support</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-[15px] w-[40px] h-[40px] bg-[#ffd78d] text-black flex justify-center items-center "><BiTrendingUp size="20px" /></div>
            <div className="text-[.8rem] font-bold font-['Poppins'] ">Invest Now</div>
          </div>
        </section>

        <section className="text-center bg-[#ffd78d] py-3 mt-16 mb-6">
          <div className="text-2xl font-semibold font-['Poppins'] ">Our Investment Plans</div>
        </section>

        <section className="my-5 px-5 flex flex-col md:flex-row items-center md:gap-10">
          <div className="mb-8">
            <div className="h-[60px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa500] text-white rounded-t-[10px]">
              <div className="font-bold font-[poppins] ">SMART EARNERS</div>
              <div className="flex items-center gap-2 font-bold ">
                <div>PC-1</div> <div className="text-[#eee]">|</div> <div>Total 600%</div>
              </div>
            </div>

            <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem]">
              <div className="flex justify-between ">
                <div className="">
                  <div className="text-gray-500">Deposit Amount</div>
                  <div className="font-bold ">3000</div>
                </div>

                <div className="text-end">
                  <div className="text-gray-500">Daily Return</div>
                  <div className="flex items-center gap-2 font-bold">
                    <div>N300</div> <div className="text-[#eee]">|</div> <div>10%</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <div className="">
                  <div className="text-gray-500">Return Period</div>
                  <div className="font-bold ">60 Days</div>
                </div>

                <div className="text-end">
                  <div className="text-gray-500">Total Return</div>
                  <div className="flex items-center gap-2 font-bold">
                    <div>N18000</div> <div className="text-[#eee]">|</div> <div>600%</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffa500] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold">3000</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="h-[60px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa500] text-white rounded-t-[10px]">
              <div className="font-bold font-[poppins] ">SMART EARNERS</div>
              <div className="flex items-center gap-2 font-bold ">
                <div>PC-1</div> <div className="text-[#eee]">|</div> <div>Total 600%</div>
              </div>
            </div>

            <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem]">
              <div className="flex justify-between ">
                <div className="">
                  <div className="text-gray-500">Deposit Amount</div>
                  <div className="font-bold ">3000</div>
                </div>

                <div className="text-end">
                  <div className="text-gray-500">Daily Return</div>
                  <div className="flex items-center gap-2 font-bold">
                    <div>N300</div> <div className="text-[#eee]">|</div> <div>10%</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <div className="">
                  <div className="text-gray-500">Return Period</div>
                  <div className="font-bold ">60 Days</div>
                </div>

                <div className="text-end">
                  <div className="text-gray-500">Total Return</div>
                  <div className="flex items-center gap-2 font-bold">
                    <div>N18000</div> <div className="text-[#eee]">|</div> <div>600%</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffa500] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold">3000</div>
            </div>
          </div>
        </section>
      </main>

      <div className="h-[90px]"></div>

      <footer className="fixed bottom-0 left-0 w-full h-[80px] flex justify-between items-center px-10 md:px-16 lg:px-20 bg-[#333] text-white rounded-t-[20px] ">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/')}}>
          <div className={`${router.pathname == '/' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><AiOutlineHome size="25px" /></div>
          <div className="text-[.8rem]">Home</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/orders')}}>
          <div className={`${router.pathname == '/team' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><BiBookmarkAltPlus size="25px" /></div>
          <div className="text-[.8rem]">Orders</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/deposit')}}>
          <div className={`${router.pathname == '/deposit' && 'text-[#ffa500]'} hover:text-[#e6ad44] bg-[#d19421] text-black w-[35px] h-[35px] rounded-full grid place-items-center`}><TbDiamond size="20px" /></div>
          <div className="text-[.8rem]">Deposit</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/team')}}>
          <div className={`${router.pathname == '/team' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><TbHeartHandshake size="25px" /></div>
          <div className="text-[.8rem]">Team</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/profile')}}>
          <div className={`${router.pathname == '/profile' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><AiOutlineUser size="25px" /></div>
          <div className="text-[.8rem]">Me</div>
        </div>
      </footer>
    </div>
  )
}
