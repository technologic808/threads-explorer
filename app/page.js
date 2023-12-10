import { fetchThreads } from './api/useThreads'
import AppBar from './components/AppBar'
import HomePage from './components/HomePage'
import './home.css'

export default async function Home() {

  const threads = await fetchThreads("spr")

  return <>
    <AppBar />

    <div className='headline'>{threads.length} threads to explore</div>

    <HomePage threads={threads} />
  </>
}          
