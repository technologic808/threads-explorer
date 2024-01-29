import Link from 'next/link';  // Import the Link component
import { redirect } from 'next/navigation'
import '../home.css'

export default async function GroupHome() {
  return <>
    <div className='headline'> Group Home page</div>
    <h2>A place where you come to explore the online chaos of your group chat</h2>
    <p><b>Example: </b></p>
    <Link href="/grouphome/azure_spr">
        https://explorethreads.com/group/azure_spr
    </Link>    
  </>
}
