import Link from 'next/link'
import { fetchThreads } from './hooks/useThreads'

export default async function Home() {

  const threads = await fetchThreads("spr")

  return <div>
    <h1>Threads Explorer</h1>
    <ul>
      <li><Link href="/onboard">Onboard</Link></li>
      <li><Link href="/wordcloud">Word Cloud</Link></li>
      <li><Link href="/explorer">Explorer</Link></li>
    </ul>

    <h2>Threads</h2>
    <ul>
      {threads && threads.map(thread => (
        <li key={thread.id}>
          <Link href="/threads/[id]" as={`/threads/${thread.id}`}>
            {thread.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
}          