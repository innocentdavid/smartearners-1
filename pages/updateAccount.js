import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { BsArrowUp } from 'react-icons/bs'
import AuthContext from "../context/authContext"

export default function UpdateAccount() {
  const router = useRouter()
  const [accDetails, setAccDetails] = useState({ number: null, name: '', bank: "" })
  const {user, setUser} = useContext(AuthContext)
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status])

  useEffect(() => {
    if (user) {
      setAccDetails({ ...accDetails, number: user.accountNumber, name: user.accountName, bank: user.bank })
    }
  }, [user])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    if (user) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(['addBankDetails', user?._id, accDetails]),
          type: 'application/json'
        })
        if (response.status == 200) {
          const res = await response.json()
          if(res.message === 'success'){
            alert('Your account has benn updated successfully!')
            router.back()
          }
          document.querySelector('#generalLoading').classList.remove('grid')
          document.querySelector('#generalLoading').classList.add('hidden')
        }
      } catch (err) {
        console.log(err)
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return { message: 'error', err };
      }
    }
    else {
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
      return { message: 'You have to login to be here' };
    }
  }

  if (status === 'loading') {
    return (
      <div className="fixed top-0 left-0 w-full h-screen grid place-items-center z-[999999999] text-white" style={{ background: 'rgba(0,0,0,.8)' }}>
        <div className="text-2xl md:text-3xl lg:text-5xl flex items-center gap-3">
          <img src="/images/withdraw-1.png" alt="" width="20px" height="20px" className="animate-spin" />
          <span>Loading<span className="animate-ping">...</span></span>
        </div>
      </div>
    )
  }

  if (status === 'authenticated') {}
  return (
    <div>
      <Head>
        <title>Add Bank Details</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase ">Add Bank Details</div>
      </header>

      <main className="">
        <section className="pt-8 px-4 w-full flex justify-center h-[70%] overflow-x-hidden overflow-y-auto">
          <form className="block">
            <div className="">
              <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Account Number</p>
              <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                {/* <BsPhone size="20px" /> */}
                <input required type="number" name="tel" id="redTel" className="w-full bg-transparent outline-none border-none"
                  onChange={(e) => { setAccDetails({ ...accDetails, number: e.target.value }) }}
                  value={accDetails.number} />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Account Name</p>
              <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                {/* <BsLock size="20px" /> */}
                <input required type="text" name="name" className="w-full bg-transparent outline-none border-none"
                  onChange={(e) => { setAccDetails({ ...accDetails, name: e.target.value }) }}
                  value={accDetails.name} />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-[fona] font-bold text-[16px] text-[#6b6b6b] mb-1 ">Bank</p>
              <div className="flex items-center gap-4 py-3 px-4 rounded-[10px] bg-[#fff3dc] text-gray-400">
                {/* <BsLock size="20px" /> */}
                <input required type="text" name="bank" className="w-full bg-transparent outline-none border-none"
                  onChange={(e) => { setAccDetails({ ...accDetails, bank: e.target.value }) }}
                  value={accDetails.bank} />
              </div>
            </div>

            <div className="mt-10 py-2 px-4 rounded-[10px] bg-[#ffa600] text-white font-bold text-lg ">
              <input required type="submit" value="Submit" className="w-full bg-transparent outline-none border-none"
                onClick={handleSubmit}
              />
            </div>

            <div className="flex justify-end mt-2">
              {/* <Link href=""><a className="underline">Forgot password?</a></Link> */}
            </div>
          </form>
        </section>
      </main>

    </div>
  )
}
