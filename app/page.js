import { fetchThreads } from './api/useThreads'
import HomePage from './components/HomePage'
import './home.css'

export default async function Home() {

  const threads = await fetchThreads("spr")

  return <>
    <div className='headline'>{threads.length} threads to explore</div>
    <HomePage threads={threads} />
  </>
}          
