'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useEmoji from '../hooks/useEmoji';
import './Thread.css';


const ChatMessage = ({ text, sender }) => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];
    const { getEmoji } = useEmoji(emojis);

    return (
        <Card className='message-card gradient-card'>
            <CardContent className='card-content'>
                <div className='message-card-container'>
                    <div className='message-card-icon'>
                        <Typography variant="body1" component="div" className='message-text'>
                            <span style={{ fontSize: '2em' }}>{getEmoji(sender)}</span>
                        </Typography>
                    </div>
                    <div className='message-card-details'>
                        <div className='message-card-sender'>
                            {sender}
                        </div>
                        <div className='message-card-text'>
                            <Typography variant="body1" component="div" className='message-text'>
                                {text}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const Thread = ({ thread, autoExpand }) => {

    const threadRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(autoExpand);

    useEffect(() => {
        setIsExpanded(autoExpand);
    }, [autoExpand]);

    const handleAccordionChange = (_, newIsExpanded) => {
        setIsExpanded(newIsExpanded);
    };

    const handleShare = () => {
        if (!threadRef.current) return;
        convertToImage(thread.title);
        console.log("⬇️ Download", thread.title);
    };

    return (
        <>
            <Accordion elevation={5} className='thread gradient-paper' onChange={handleAccordionChange} expanded={isExpanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className='title-container'>
                        <Typography variant='h6' className='thread-title'>{thread ? thread.title : "NA"}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className='accordion_details' ref={threadRef}>
                    {thread ? thread.messages.map((message, index) => (message && message.text !== "NA" &&
                        <React.Fragment key={index}><ChatMessage key={index} {...message} /><br /></React.Fragment>
                    ))
                        : null}
                </AccordionDetails>
            </Accordion>
        </>
    )
};

export default Thread;