import { getSession, signIn, providers, csrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsPhone, BsLock } from 'react-icons/bs'

export default function Login() {
  const router = useRouter()
  const { rf } = router.query
  const [loginDetails, setLoginDetails] = useState({ tel: '', password: '' })
  const [userDetails, setUserDetails] = useState({ tel: '', password: '', cPassword: '' })
  const tabsData = [
    { label: "Log in", content: "" },
    { label: "Sign up", content: "" },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    console.log(rf)
    if(rf){
      setActiveTabIndex(1)
    }
  }, [rf])

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.cPassword) {
      alert('Your Password and Confirm Password did not match!')
      return;
    }
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    const data = { tel: userDetails.tel, password: userDetails.password, rf }
    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        body: JSON.stringify(data),
        type: 'application/json'
      })
      if (response.status == 200) {
        alert("You have been registered successfully!, login to continue")
        setActiveTabIndex(0)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
      }

      else if (response.status === 409) {
        alert('This number has an account with us already, login to continue or use another number')
        setActiveTabIndex(0)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      } else {
        console.log(response)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      }
    } catch (err) {
      console.log(err)
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      <header className="h-[28%] flex flex-col justify-end px-5 bg-[#ffa600] ">
        <div className="grid place-items-center">
          <div className="bg-[#fff] text-black font-['Poppins'] font-bold px-3 h-[35px] flex items-center uppercase ">SMART Earners</div>
        </div>

        <div className="mt-5 flex items-center justify-around text-white text-lg font-bold">
          {/* Loop through tab data and render button for each. */}
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                className={`py-2 border-b-4 transition-colors duration-300 ${idx === activeTabIndex
                  ? "border-white"
                  : "border-transparent hover:border-gray-200"
                  }`}
                // Change the active tab on click.
                onClick={() => setActiveTabIndex(idx)}>
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <section className="pt-8 px-4 w-full flex justify-center h-[70%] overflow-x-hidden overflow-y-auto">
        {/* Show active tab content. */}
        <form className="block">
          {activeTabIndex == 0 ? <>
            <div className="">
                  <input required type="hidden" name="username" id="lUsername" className="w-full bg-transparent outline-none border-none"
                    value={loginDetails.tel} />
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
                <input required type="submit" value="Log in" className="w-full bg-transparent outline-none border-none cursor-pointer" 
                onClick={handleLogIn}
                />
              </div>

              <div className="flex justify-end mt-2">
                {/* <Link href=""><a className="underline">Forgot password?</a></Link> */}
              </div>
            </div>
          </> : <>
            <div className="">
            <input required type="hidden" name="username" id="lUsername" className="w-full bg-transparent outline-none border-none"
                    value={userDetails.tel} />
              <div className="">
                <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Mobile Number</p>
                <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                  <BsPhone size="20px" />
                  <input required type="number" name="tel" id="redTel" className="w-full bg-transparent outline-none border-none"
                    onChange={(e) => { setUserDetails({ ...userDetails, tel: e.target.value }) }}
                    value={userDetails.tel} />
                </div>
              </div>

              <div className="mt-5">
                <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Password</p>
                <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                  <BsLock size="20px" />
                  <input required type="password" name="password" id="RegPassword" autoComplete="new-password" className="w-full bg-transparent outline-none border-none"
                    onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }}
                    value={userDetails.password} />
                </div>
              </div>

              <div className="mt-5">
                <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Confirm Password</p>
                <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                  <BsLock size="20px" />
                  <input required type="password" name="cpassword" id="cRegPassword" autoComplete="current-password" className="w-full bg-transparent outline-none border-none"
                    onChange={(e) => { setUserDetails({ ...userDetails, cPassword: e.target.value }) }}
                    value={userDetails.cPassword} />
                </div>
              </div>

              <div className="mt-10 py-2 px-4 rounded-[10px] bg-[#ffa600] text-white font-bold text-lg ">
                <input required type="submit" value="Sign up" className="w-full bg-transparent outline-none border-none" 
                onClick={handleSignUp}
                />
              </div>

              <div className="flex justify-end mt-2">
                {/* <Link href=""><a className="underline">Forgot password?</a></Link> */}
              </div>
            </div>
          </>}
        </form>
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
