import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowUp, BsPhone, BsLock } from 'react-icons/bs'

export default function Signup() {
  const router = useRouter()

  return (
    <div className="bg-[#262932] text-[#919393] h-screen">
      <Head>
        <title>Login/Register</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center px-8 py-5">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>
      </header>

      <main>

        <form action="" className="flex flex-col max-w-[250px] md:max-w-[350px] mx-auto md:fixed md:top-[50%] md:translate-y-[-50%] md:left-[50%] md:translate-x-[-50%] ">
          <h1 className="text-2xl my-10 text-white font-[800] ">Sign up</h1>

          <div className="flex items-center gap-2 border-b border-[#ffa600] pb-2">
            <div className=""><BsPhone size="20px" /></div>
            <div className="">+234</div>
            <input type="number" name="number" max="9" id="number" placeholder="Enter Mobile Number" className="border-none outline-none bg-transparent" />
          </div>

          <div className="flex items-center gap-2 border-b border-[#ffa600] pb-2 mt-8">
            <div className=""><BsLock size="20px" /></div>
            <input type="password" name="password" id="password" placeholder="Enter a Secured Password" className="border-none outline-none bg-transparent" />
          </div>

          <div className="flex items-center gap-2 border-b border-[#ffa600] pb-2 mt-8">
            <div className=""><BsLock size="20px" /></div>
            <input type="password" name="password" id="password" placeholder="Confirm Password" className="border-none outline-none bg-transparent" />
          </div>

          <button type="submit" className="bg-black text-white py-4 mt-5">Sign up</button>
          <div className="mt-4">
            Already has an account? <Link href="/login"><a className="text-[#ffa600]">Log in.</a></Link>
          </div>
        </form>

      </main>
    </div>
  )
}
