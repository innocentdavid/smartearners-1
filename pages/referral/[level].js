import Head from "next/head";
import { useRouter } from "next/router";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";

export default function ReferralLevel() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Referral Levl 1 - Smart Earners</title>
        <meta name="description" content="Referral Levl 1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold ">Referral Level 1</div>
      </nav>

      <div className="bg-[#242931] text-[#fff] py-4 font-Josefin text-[14px] flex justify-between items-center">
        <table className="pb-[20px] w-full">
          <tbody id="level1">
            <tr className="">
              <td></td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">Referral<br />number</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">Deposit<br />amount</td>
              <td className="w-[27%] h-[38px] p-1 font-[fona] italic text-center">My<br />commission</td>
            </tr>
            <tr className="bg-[#1F242B]">
              <td className="p-1 font-[fona] text-center text-[.8rem]">
                Total
              </td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            </tr>
            <tr className="">
              <td className="p-1 font-[fona] text-center text-[.8rem]">
                Today
              </td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
              <td className="w-[27%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="mt-4">
        <div className="">
          <ul className="flex w-full text-[#333] text-[.8rem]">
            <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[25%]"><p>Time</p> </li>
            <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[25%]"><p>ID</p> </li>
            <li className="font-['Metric-Regular'] border-r border-gray-300 flex flex-col justify-center items-center text-center w-[25%]"><p>Total<br />Deposit</p></li>
            <li className="font-['Metric-Regular'] flex flex-col justify-center items-center text-center w-[25%]">
              <p>My<br /> Commission</p>
            </li>
          </ul>
        </div>
      </section>

      {/* <section className="">
        <table className="pb-[20px] w-full">
          <tbody id="level1">
            <tr className="bg-[#f5f5f5]">
              <td className="border-r border-gray-300 p-1 font-[fona] text-center text-[.8rem]">
                Today
              </td>
              <td className="border-r border-gray-300 w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
              <td className="border-r border-gray-300 w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
              <td className="w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            </tr>
            <tr>
              <td className="border-r border-gray-300 p-1 font-[fona] text-center text-[.8rem]">
                Total
              </td>
              <td className="border-r border-gray-300 w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">0/0</td>
              <td className="border-r border-gray-300 w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
              <td className="w-[25%] h-[38px] p-1 font-['Metric-SemiBold'] text-center">₦0</td>
            </tr>
          </tbody>
        </table>
      </section> */}
    </>
  )
}


export async function getStaticProps({ params, preview = true }) {
  const level = params.level

  return {
    props: {
      preview, level
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug()
  return {
    paths: ['1','2','3'],
    // paths:
    //   allPosts?.map((post) => ({
    //     params: {
    //       slug: post?.slug,
    //     },
    //   })) || [],
    fallback: true,
  }
}
