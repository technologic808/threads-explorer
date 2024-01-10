import { fetchThreads } from '../../api/useThreads'
import { redirect } from 'next/navigation'
import HomePage from '../../components/HomePage'
import '../../home.css'

export default async function GroupDetails({ params }) {

  if (!params.id || params.id === 'undefined') { redirect('/') }

  const threads = await fetchThreads(params.id)

  if (!threads || threads.length === 0) { redirect('/') }

  return <>
    <div className='headline'>{threads.length} threads to explore</div>
    <HomePage threads={threads} />
  </>
}
