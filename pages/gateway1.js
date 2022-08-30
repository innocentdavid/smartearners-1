import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { BsArrowUp } from 'react-icons/bs'
import ImageUploader from '../components/imageUploader'
import AuthContext from '../context/authContext';
import { getCompanyDetails } from '../lib/api';

export default function Gateway1() {
  const router = useRouter()
  const { ticket } = router.query
  const user = useContext(AuthContext)
  const tabsData = [
    { label: "Withdrawal Record", content: "", },
    { label: "Balance Record", content: "", },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [company, setCompany] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        // await delOrders()
        const r = await getCompanyDetails().catch(err => {
          console.log(err)
        })
        r?.res && setCompany(r.res)
      }
    }
    fetch()
  }, [user])

  return (
    <>
      <Head>
        <title>Payment Gateway 1</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase ">Transfer Payment</div>
      </header>

      <main className="mt-6">
        <div className="text-center text-2xl font-bold">Follow the steps below to complete your transaction</div>

        <div>
          <div className="text-center mt-10"><span className="w-60 h-60 py-3 px-3 font-bold rounded-full border border-[#ffa600]">1</span></div>

          <p className="my-8 text-center font-bold text-xl">Transfer the sum of <span className="text-[#ffa600]">₦{ticket}</span> to the account below</p>

          <div className="flex flex-col justify-center items-center font-bold">
            <div className="px-8 py-3 text-[#ffa600] border border-[#ffa600] text-center ">{company && company.accNo ? company.accNo : 34342334090}</div>
            <div>{company?.accName}</div>
            <div>{company?.bank}</div>
          </div>
          <br />
          <hr />
        </div>

        <div className="my-4">
          <div className="text-center mt-10"><span className="w-60 h-60 py-3 px-3 font-bold rounded-full border border-[#ffa600]">2</span></div>

          <p className="my-8 text-center font-bold text-xl">upload your payment proof below</p>

          <div className="mx-3">
            <ImageUploader user={user} amount={ticket} />
            {/* <div className="w-[200px] h-[200px] border bg-gray-400"></div>

            <div className="bg-[#ffa600] py-2 px-5 mt-4 font-bold">UPLOAD PROOF OF PAYMENT</div> */}
          </div>
          <br />
          <hr />
        </div>

        <div className="my-10"></div>
      </main>

      <footer className="my-8 text-center text-gray-400">@smartenergy.</footer>
    </>
  )
}
