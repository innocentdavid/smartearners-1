import { useRouter } from "next/router"
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BiBookmarkAltPlus } from 'react-icons/bi'
import { TbHeartHandshake, TbDiamond } from 'react-icons/tb'

export default function Footer() {
  const router = useRouter()

  return (
    <>
      <div className="h-[90px]"></div>
      <footer className="fixed bottom-0 left-0 z-50 w-full h-[80px] flex justify-between items-center px-10 md:px-16 lg:px-20 bg-[#333] text-white rounded-t-[20px] ">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/') }}>
          <div className={`${router.pathname == '/' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><AiOutlineHome size="25px" /></div>
          <div className="text-[.8rem]">Home</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/orders') }}>
          <div className={`${router.pathname == '/orders' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><BiBookmarkAltPlus size="25px" /></div>
          <div className="text-[.8rem]">Orders</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/deposit') }}>
          <div className={`${router.pathname == '/deposit' && 'text-[#ffa500]'} hover:text-[#e6ad44] bg-[#d19421] text-black w-[35px] h-[35px] rounded-full grid place-items-center`}><TbDiamond size="20px" /></div>
          <div className="text-[.8rem]">Deposit</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/team') }}>
          <div className={`${router.pathname == '/team' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><TbHeartHandshake size="25px" /></div>
          <div className="text-[.8rem]">Team</div>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => { router.push('/profile') }}>
          <div className={`${router.pathname == '/profile' && 'text-[#ffa500]'} hover:text-[#e6ad44]`}><AiOutlineUser size="25px" /></div>
          <div className="text-[.8rem]">Me</div>
        </div>
      </footer>

    </>
  )
}
