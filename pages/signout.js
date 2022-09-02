import { signOut } from "next-auth/react"
import { useRouter } from "next/router"

export default function Signout() {
  const router = useRouter()
  signOut()
  router.push('/login')
  
  // useEffect(() => {
  // }, [])
  return (
    <div>
      
    </div>
  )
}
