import Link from 'next/link'

export default function Home() {
  return <div>
    <h1>Threads Explorer</h1>
    <ul>
      <li><Link href="/onboard">Onboard</Link></li>
      <li><Link href="/wordcloud">Word Cloud</Link></li>
      <li><Link href="/explorer">Explorer</Link></li>
    </ul>
  </div>
}          