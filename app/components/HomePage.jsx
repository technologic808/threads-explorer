'use client'
import ThreadsExplorer from './ThreadsExplorer'
import TopicsWordCloud from './TopicsWordCloud'
import { useState } from 'react'

export default function HomePage({ threads }) {

    const [searchTerm, setSearchTerm] = useState('');

    return <>
        <TopicsWordCloud threads={threads} setSearchTerm={setSearchTerm} />
        <ThreadsExplorer threads={threads} searchTerm={searchTerm}></ThreadsExplorer>
    </>
}