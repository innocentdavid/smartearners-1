import Head from "next/head";
import { useRouter } from "next/router";
import { BsArrowRight, BsArrowUp } from "react-icons/bs";

export default function Pervalidrefer() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Per Valid Refer - Smart Earners</title>
        <meta name="description" content="Per Valid Refer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex items-center px-8 py-5 border-b border-gray-300 relative">
        <div className="cursor-pointer rotate-[270deg]" onClick={() => { router.back() }}><BsArrowUp size="20px" /></div>
        <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] text-base font-bold ">Per Valid Refer</div>
      </nav>

      <header className="bg-[#242931] text-[#fff] py-4 px-5 font-Josefin text-[14px]">
        <div className="flex items-center gap-4">
          <img src="/images/1034789.png" />
          <div className="font-bold text-[.9rem] md:text-[1rem]">₦300 Per Valid Refer</div>
        </div>

        <p className="mt-3 text-[.75rem]">{'You will obtain ₦300 as bonus when any of your Level 1 referrals make a payment and become a valid member. This bonus is only given for one time on the same referral.'}</p>
      </header>

      <div className="Pre-coson">
        <div>
          <div className="Pre-neiromn">
            <div className="oneimgfour">
              <img src="/images/per01.png" alt="" />
                </div>
              <div className="Prew-monet">
                ₦ 0                </div>
              <div className="Pre-CK-monet">
                {"I'm earing Today"}
              </div>
            </div>
          </div>
          <div>
            <div className="Pre-neiromn">
              <div className="oneimgfour">
                <img src="/images/per02.png" alt="" />
                </div>
                <div className="Prew-monet">
                  ₦ 0                </div>
                <div className="Pre-CK-monet">
                  {"I've earned"}
                </div>
              </div>
            </div>
          </div>
    </>
        )
}
