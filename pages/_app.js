import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext';

function MyApp({ Component, pageProps }) {

  return (<>
    <div id="generalLoading" className="hidden fixed top-0 left-0 w-full h-screen place-items-center z-[999999999] text-white" style={{ background: 'rgba(0,0,0,.8)' }}>
      <div className="text-2xl md:text-3xl lg:text-5xl flex items-center gap-3">
        <img src="/images/withdraw-1.png" alt="" width="20px" height="20px" className="animate-spin" />
        <span>Loading<span className="animate-ping">...</span></span>
      </div>
    </div>
    <SessionProvider session={pageProps.session}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </SessionProvider>
  </>)
}

export default MyApp
