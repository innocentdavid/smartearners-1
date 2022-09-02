import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { AuthContextProvider } from '../context/authContext'

function MyApp({ Component, pageProps }) {

  return (<>
    <div id="generalLoading" className="hidden fixed top-0 left-0 w-full h-screen place-items-center z-[999999999] text-white" style={{ background: 'rgba(0,0,0,.8)' }}>
      <div className="text-2xl md:text-3xl lg:text-5xl flex items-center gap-3">
        <img src="/images/withdraw-1.png" alt="" width="20px" height="20px" className="animate-spin" />
        <span>Loading<span className="animate-ping">...</span></span>
      </div>
    </div>
    <SessionProvider 
    session={pageProps.session}
    // Re-fetch session every 0.5 minutes
    refetchInterval={30}
    // Re-fetches session when window is focused
    refetchOnWindowFocus={true}
    >
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </SessionProvider>
  </>)
}

export default MyApp
