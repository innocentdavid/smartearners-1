import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import AuthContext from "../../context/authContext"
import { getAllPaymentProofs } from "../../lib/api"
import { MdOutlineSwitchRight } from 'react-icons/md'
import { BsArrowUp, BsPatchCheckFill } from 'react-icons/bs'
import Head from "next/head"
import moment from "moment"
import { useSession } from 'next-auth/react';

export default function Admin({ allPaymentProofs }) {
  const router = useRouter()
  const user = useContext(AuthContext)
  const { status, data } = useSession(
    // {
    //   required: true,
    //   onUnauthenticated() {
    //     // The user is not authenticated, handle it here.
    //     console.log("The user is not authenticated")
    //   },
    // }
  );


  // useEffect(() => {
  //   // if(!user || !user.isAdmin){
  //   //   console.log(user.isAdmin);
  //   //   // router.push('/')
  //   //   return;
  //   // }
  //   // console.log(user)
  // }, [user])

  const clearAllOrder = () => {
    const mutations = [
      {
        "delete": {
          "query": "*[_type == 'order']",
        }
      },
  ]

    fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}?dryRun=true`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      body: JSON.stringify({ mutations })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  const approve = async (itemId) => {
    document.querySelector('#generalLoading').classList.remove('hidden')
    document.querySelector('#generalLoading').classList.add('grid')
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(['confirmProof', itemId]),
        type: 'application/json'
      })
      if (response.status == 200) {
        router.reload();
        document.querySelector('#generalLoading').classList.remove('grid')
        document.querySelector('#generalLoading').classList.add('hidden')
        return;
      }
    } catch (err) {
      console.log(err)
      document.querySelector('#generalLoading').classList.remove('grid')
      document.querySelector('#generalLoading').classList.add('hidden')
    }
    document.querySelector('#generalLoading').classList.remove('grid')
    document.querySelector('#generalLoading').classList.add('hidden')
  }

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return (
    <div>
      <Head>
        <title>Backend</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" className="stroke-1" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold uppercase ">Proof Of Payment</div>
      </header>

      <div className="my-5 mx-5"><div className="h-20 w-28 bg-black text-white cursor-pointer" onClick={clearAllOrder}>clearAllOrder</div></div>

      <section className="">
        <table className="pb-[20px] w-full">
          <thead className="">
            <tr className="bg-black text-white text-xs px-1">
              <td></td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">DATE</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">USER</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">AMOUNT</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">PROOF</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">APP<br className="md:hidden" />ROVED</td>
            </tr>
          </thead>

          <tbody>
            <tr className="h-3"></tr>
            {allPaymentProofs?.map((data, index) => {
              return (
                <tr key={index} className={`${(index + 1) % 2 === 0 && "bg-[#f5f5f5]"} px-10`}>
                  <td className="p-1 font-[fona] text-center text-[.8rem]">{index + 1}</td>
                  <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{moment(data._createdAt).format('MM-D-YY')}</td>
                  <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">{data.userTel}</td>
                  <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦{data.amount}</td>
                  <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] relative">
                    <img src={data.imageUrl} alt="" width="40px" height="30px" className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" />
                  </td>
                  <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center relative">
                    {data.approved ? <BsPatchCheckFill className="text-[#ffa600] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]" /> : <MdOutlineSwitchRight className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                      onClick={() => { approve(data._id) }}
                    />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}


export async function getStaticProps(context) {
  const allPaymentProofs = await getAllPaymentProofs();

  return {
    props: { allPaymentProofs },
    revalidate: 1
  }
}