import { ArrowLeftTwoTone } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import Link from 'next/link';

export default async function Create() {

    const questions = [
        {
            emoji: "📨",
            question: "How do I create a Group?",
            answer: "To create a new group, email the chat export text file to admin@explorethreads.com"
        },
        {
            emoji: "📤",
            question: "How do I export my Whatsapp group chat?",
            answer: "You can export your group chat by following the instructions here: https://faq.whatsapp.com/1180414079177245/"
        },
        {
            emoji: "🔑",
            question: "How do I find my Group Code?",
            answer: "After sharing your group chat export file, you will receive a Group Code via email. You can use this code to access your group."
        }
    ]

    return (
        <>
            <Button variant='contained' startIcon={<ArrowLeftTwoTone />} style={{ "margin": "10px" }}>
                <Link href={`/`}>
                    Go Back
                </Link>
            </Button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    {questions.map((q, index) => (
                        <div style={{ "alignItems": "center" }} key={index}>
                            <Divider />
                            <Typography variant="h1" gutterBottom margin={3}>
                                {q.emoji}
                            </Typography>
                            <Typography variant="h4" gutterBottom margin={3}>
                                {q.question}
                            </Typography>
                            <Typography variant="body1" gutterBottom margin={3}>
                                {q.answer}
                            </Typography>
                            <Divider />
                        </div>
                    ))}
                </Box>
            </div>
        </>
    );
}
