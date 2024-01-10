import Link from 'next/link';  // Import the Link component
import { redirect } from 'next/navigation'
import '../home.css'

export default async function Home() {
  redirect('/')
  return <>
    <div className='headline'> Group home page. Add /groupID in url to see group details.</div>
    <p><b>Example: </b></p>
    <Link href="/group/azure_spr">
        https://explorethreads.com/group/azure_spr
    </Link>    
  </>
}
