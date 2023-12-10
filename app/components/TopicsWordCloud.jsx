'use client'
import React from 'react';
import WordCloud from './WordCloud';

const TopicsWordCloud = ({ threads, setSearchTerm }) => {

    if (!threads) return null;

    // Extracts topics from threads
    const extractTopics = (threads) => {
        let threadTopics = []
        threads.forEach((thread) => {
            threadTopics.push(thread.topic);
        }
        );
        return threadTopics
    }

    const topics = extractTopics(threads);


    // Handles word click
    const handleWordClick = (word) => {
        setSearchTerm(word.text);
    }

    // Renders the word cloud
    return (
        <div className="word-cloud-container">
            <div className="word-cloud">
                <WordCloud words={topics} handleWordClick={handleWordClick} />
            </div>
        </div>
    );
}

export default TopicsWordCloud;
