import Link from 'next/link'
import { getSession, signIn, providers, csrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsPhone, BsLock } from 'react-icons/bs'

export default function Login({ providers, csrfToken }) {
  const router = useRouter()
  const [loginDetails, setLoginDetails] = useState({ tel: '', password: '' })

  const handleLogIn = async (e) => {
    e.preventDefault();
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    const res = await signIn('credentials', {
      tel: loginDetails.tel,
      password: loginDetails.password,
      redirect: false
    })
    if (res.status == 200) {
      router.push('/')
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
      return;
    }
    console.log(res.error)
    res.error && alert(res.error)
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      <header className="h-[28%] flex flex-col justify-end px-5 bg-[#ffa600] ">
        <div className="grid place-items-center">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center uppercase ">SMART Energy</div>
        </div>

        <div className="mt-5 flex items-center justify-around text-white text-lg font-bold">
          <button className="py-2 transition-colors duration-300 border-b-4 border-white">Log in</button>
          <Link href="/signup"><a className="py-2 transition-colors duration-300">Sign up</a></Link>
        </div>
      </header>

      <section className="pt-8 px-4 w-full flex justify-center h-[70%] overflow-x-hidden overflow-y-auto">
        {/* Show active tab content. */}
        <div className="">
          <form className="" onSubmit={handleLogIn}>
            <div className="">
              <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Mobile Number</p>
              <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                <BsPhone size="20px" />
                <input required type="number" name="tel" id="lTel" className="w-full bg-transparent outline-none border-none"
                  onChange={(e) => { setLoginDetails({ ...loginDetails, tel: e.target.value }) }}
                  value={loginDetails.tel} />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-[fona] font-bold text-[16px] text-[#9e9292] mb-1 ">Password</p>
              <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                <BsLock size="20px" />
                <input required type="password" name="password" id="lPassword" autoComplete="new-password" className="w-full bg-transparent outline-none border-none"
                  onChange={(e) => { setLoginDetails({ ...loginDetails, password: e.target.value }) }}
                  value={loginDetails.password} />
              </div>
            </div>

            <div className="mt-10 py-2 px-4 rounded-[10px] bg-[#ffa600] text-white font-bold text-lg ">
              <input required type="submit" value="Log in" className="w-full bg-transparent outline-none border-none cursor-pointer" />
            </div>

            <div className="flex justify-end mt-2">
              {/* <Link href=""><a className="underline">Forgot password?</a></Link> */}
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

signIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await (getSession({req}))

  if(session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/profile',
    });
    res.end()
    return;
  }
  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context)
  }
}
