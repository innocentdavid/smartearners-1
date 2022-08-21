import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/footer'
import { AiOutlineShareAlt } from 'react-icons/ai'

export default function Team() {
  const [user, setUser] = useState({
    id: 1, userName: '0x9***384', myTicket: 0, balance: 350
  })

  const showModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.remove('hidden')
  }

  const hideModal = () => {
    const modal = document.querySelector('#modal')
    modal.classList.add('hidden')
  }

  return (
    <div className="relative h-screen">
      <Head>
        <title>My team - Smart Earners</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-[30%] right-0 flex items-center gap-2 shadow-xl rounded-l-[30px] px-3 py-2 bg-[#ffa500] text-white font-['Metric-Light'] cursor-pointer" onClick={() => { showModal() }}>
        <div className=""><AiOutlineShareAlt /></div>
        <div className="">My Link</div>
      </div>

      <nav className="flex justify-between border-b border-[#ccc] bg-black text-white py-5 px-4 md:px-36">
        <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center ">SMART EARNERS</div>

        <div className="flex items-center gap-3 text-[.8em] font-semibold font-['Metric-Medium'] ">
          <div className="flex flex-col items-center">Ticket <strong>{user?.myTicket}</strong></div>
          <div className="border-r border-[#fff3dc] h-[60%]"></div>
          <div className="flex flex-col items-center">Balance <strong className="">N<span>{user?.balance}</span></strong></div>
        </div>
      </nav>

      <header className="bg-gray-800 text-white py-3 px-5 font-['Matric-Light'] text-[16px]">
      {/* style={{ listStyleType:'initial' }} */}
        <ul className="">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto <a href="#" className="text-[#ffa500]">Please click here to buy tickets if needed.</a></li>
        </ul>
      </header>

      <main className="mt-5">
      
      </main>

      <Footer />


      <div id="modal" className="hidden fixed">
      <div onClick={() => { hideModal() }} className="z-[4] cursor-pointer fixed top-0 left-0 w-screen h-screen grid place-items-center bg-[rgba(0,0,0,.1)] text-white font-['Poppins']" title="close">
      </div>

      <div className="z-[5] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] mx-auto">
        <div className="h-[70px] px-4 flex justify-between items-center md:gap-10 gap-7 bg-[#ffa500] text-white rounded-t-[10px]">
          <div className="font-bold font-[poppins] ">SMART <br /> EARNERS</div>
          <div className="text-end">
            <div className="text-black font-semibold">COPY YOUR</div>
            <div className="text-2xl font-bold">REFERRAL LINK</div>
          </div>
        </div>

        <div className="px-4 py-4 shadow-lg rounded-b-[10px] text-[.9rem] bg-[#fff] text-black">
          <div className="">
            <p>Please copy your exclusive referral link:</p>
            <p><a href={`http://smartearners.com/?rf=${user?.id}`}>http://smartearners.com/?rf={user?.id}</a></p>
          </div>

          <div className="bg-[#ffa500] text-white h-[35px] w-full flex justify-center items-center mt-8 text-lg font-bold cursor-pointer">Copy</div>
        </div>
      </div>
    </div>
  
    </div>
  )
}
