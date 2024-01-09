import { fetchThreads } from '../../api/useThreads'

import HomePage from '../../components/HomePage'
import '../../home.css'

export default async function GroupDetails({ params }) {
  const threads = await fetchThreads(params.id)

  return <>
    <div className='headline'>{threads.length} threads to explore</div>
    <HomePage threads={threads} />
  </>
}
