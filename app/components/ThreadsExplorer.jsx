'use client'
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import Thread from './Thread';
import { SUGGESTIONS } from './ConversationSettings'
import { FEATURED_THREADS_COUNT, SKIP_THREADS_COUNT } from './ConversationSettings'
import './ThreadsExplorer.css';

const ThreadsExplorer = ({ threads }) => {

    const LOGGING = true;

    if (!threads) return null;

    const [searchTermDebounced, setSearchTermDebounced] = useState('');
    const [displayThreads, setDisplayedThreads] = useState([]);
    const [displayedThreadCount, setDisplayedThreadCount] = useState(0);

    const textFieldRef = useRef(null);

    // Function to update the text field value
    const updateTextField = (newValue) => {
        if (textFieldRef.current) {
            textFieldRef.current.value = newValue;
        }
    };

    // Function to handle initial page load
    const handleInitialPageLoad = () => {

        // Update the text field
        updateTextField(searchTermDebounced)

    };

    // Call the function inside a useEffect hook that runs only once when the component is mounted
    useEffect(() => handleInitialPageLoad(), []);

    // Copy the URL to the clipboard
    const copyToClipboard = () => {
        navigator && navigator.clipboard && navigator.clipboard.writeText(window.location.href)
            .then(() => {
                LOGGING && console.log(`📎 Copied URL`);
            }, err => {
                console.error('Could not copy text: ', err);
            });
    };


    // Render the conversations
    function renderConversations() {
        const lowerCaseSearchTerm = searchTermDebounced.toLowerCase();

        // Filter threads based on title
        const titleMatches = threads.filter(thread => {
            if (!thread.isValid) return false;

            const lowerCaseTitle = (thread.title || '').toLowerCase();
            const titleMatches = lowerCaseTitle.includes(lowerCaseSearchTerm);

            return titleMatches;
        });

        // Filter threads based on messages
        const messageMatches = threads.filter(thread => {
            if (!thread.isValid) return false;

            const lowerCaseTitle = (thread.title || '').toLowerCase();
            const titleMatches = lowerCaseTitle.includes(lowerCaseSearchTerm);

            return !titleMatches && thread.messages.some(message => {
                const lowerCaseText = (message.text || '').toLowerCase();
                return lowerCaseText.includes(lowerCaseSearchTerm);
            });
        });

        // Filter threads based on topic
        const topicMatches = threads.filter(thread => {
            if (!thread.isValid) return false;

            const lowerCaseTopic = (thread.topic || '').toLowerCase();
            const topicMatches = lowerCaseTopic.includes(lowerCaseSearchTerm);

            return topicMatches;
        });

        // Filter threads based on subtopic
        const subtopicMatches = threads.filter(thread => {
            if (!thread.isValid) return false;

            const lowerCaseSubtopic = (thread.subtopic || '').toLowerCase();
            const subtopicMatches = lowerCaseSubtopic.includes(lowerCaseSearchTerm);

            return subtopicMatches;
        });

        // Sort the threads
        const sortedThreads = [...titleMatches, ...messageMatches, ...topicMatches, ...subtopicMatches];

        // Set the displayed threads
        setDisplayedThreads(searchTermDebounced === '' ? threads.slice(SKIP_THREADS_COUNT, SKIP_THREADS_COUNT + FEATURED_THREADS_COUNT) : sortedThreads)

        // Set the displayed thread count
        setDisplayedThreadCount(sortedThreads.length);

        LOGGING && console.log(`🔍 Displaying ${displayThreads.length} threads out of ${threads.length} threads that match the search term: ${searchTermDebounced}`);
    }

    // Renders the conversations whenever the threads or search term (debounced) changes
    useEffect(() => { renderConversations(); }, [searchTermDebounced]);

    // Handle suggestion click
    const handleSuggestionSearch = (suggestion) => {
        updateTextField(suggestion);
        setSearchTermDebounced(suggestion);
    }

    // Function to clear search term
    const clearSearchTerm = () => {
        updateTextField('');
        setSearchTermDebounced('');
    };

    return (
        <div className="container">
            {/* Search Bar */}
            <SearchBar
                setSearchTermDebounced={setSearchTermDebounced}
                copyToClipboard={copyToClipboard}
                clearSearchTerm={clearSearchTerm}
                displayedThreadCount={displayedThreadCount}
                textFieldRef={textFieldRef}
            />

            {/* Search Suggestions */}
            <SearchSuggestions
                suggestions={SUGGESTIONS}
                handleSuggestionSearch={handleSuggestionSearch}
            />

            {/* Threads */}

            <div className="conversation__body">
                <div className="conversation__body__messages">
                    {displayThreads && displayThreads.map((thread, index) => (
                        <Thread key={index} thread={thread} autoExpand={displayedThreadCount === 1} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ThreadsExplorer;