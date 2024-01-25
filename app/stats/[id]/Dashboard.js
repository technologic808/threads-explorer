'use client'
import { Typography, Avatar, Fab, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { green, blue, orange, yellow, pink } from '@mui/material/colors';
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from "@mui/material/styles";
import './dashboard.css';
import { Calculate, ChildFriendly, Elderly, EventAvailable, Functions, SquareFoot, Navigation, KeyboardArrowUp } from "@mui/icons-material";
import useEmoji from '../../hooks/useEmoji';

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            main: '#009688', // Add this line
            dark: '#009688',
        },
        failure: {
            main: '#E53935', // Add this line
            dark: '#E53935',
        },
    },
});

function getRandomColor() {
    const colors = [green, blue, orange, yellow, pink]
    return colors[Math.floor(Math.random() * colors.length)];
}

function calculateDaysBetween(date1, date2) {
    // Subtract the two dates and get the difference in milliseconds
    var differenceInMilliseconds = Math.abs(new Date(date2) - new Date(date1));

    // Convert the difference from milliseconds to days
    var differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

function removeTilde(str) {
    if (str.startsWith("~")) {
        return str.substring(1);
    }
    return str;
}

function getFirstandLastGroupMessageDate(aggregateData) {
    let firstGroupMessageDate, lastGroupMessageDate;

    aggregateData.userData.forEach(user => {
        const userFirstDate = new Date(user.firstMessageDate);
        const userLastDate = new Date(user.lastMessageDate);
        if (!firstGroupMessageDate || userFirstDate < firstGroupMessageDate) {
            firstGroupMessageDate = userFirstDate;
        }
        if (!lastGroupMessageDate || userLastDate > lastGroupMessageDate) {
            lastGroupMessageDate = userLastDate;
        }
    });

    return [firstGroupMessageDate, lastGroupMessageDate];
}

function getReadableDate(date) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
}

function getReadableDateTime(date) {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}

function describeUserActivity(userActiveDays, totalDays) {
    const ratio = userActiveDays / totalDays;

    if (ratio === 1) {
        return "every day";
    } else if (ratio >= 0.5) {
        return "every other day";
    } else if (ratio >= 1 / 3 && ratio < 0.5) {
        return "every two to three days";
    } else if (ratio >= 1 / 5 && ratio < 1 / 3) {
        return "every three to five days";
    } else if (ratio < 1 / 5) {
        return "less than once a week";
    } else {
        return "invalid input";
    }
}


function GroupCard({ aggregateData }) {

    const [firstGroupMessageDate, lastGroupMessageDate] = getFirstandLastGroupMessageDate(aggregateData);

    const customStyles = {
        defaultCard: { bgcolor: 'background.paper', boxShadow: 5, borderRadius: 3, p: 3, maxWidth: 400 },
        loudText: { color: 'text.primary', fontSize: 34, fontWeight: 'medium' },
        normalText: { color: 'text.secondary', display: 'inline', fontSize: 16 },
        highlightedText: { color: 'success.dark', display: 'inline', fontWeight: 'bold', mx: 0.5, fontSize: 16 },
    }

    return <ThemeProvider theme={theme}>
        <Box className="user-card " sx={customStyles.defaultCard}>

            <Box sx={customStyles.loudText}>
                {aggregateData.totalMessages.toLocaleString()} messages
            </Box>

            <Box sx={customStyles.normalText}>
                First message sent on
            </Box>

            <Box sx={customStyles.highlightedText} >
                {getReadableDate(firstGroupMessageDate)}
            </Box>

            <br />

            <Box sx={customStyles.normalText}>
                Messages spanning over
            </Box>

            <Box sx={customStyles.highlightedText} >
                {calculateDaysBetween(firstGroupMessageDate, lastGroupMessageDate).toLocaleString()} days
            </Box>

            <br />

            <Box sx={customStyles.highlightedText} >
                {calculateDaysBetween(lastGroupMessageDate, new Date())} days
            </Box>

            <Box sx={customStyles.normalText}>
                since last message
            </Box>

        </Box>
    </ThemeProvider>
}

function UserProfileCard({ user, aggregateData }) {

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];
    const { getEmoji } = useEmoji(emojis);


    const firstMessageDate = getReadableDateTime(user.firstMessageDate);
    const lastMessageDate = getReadableDateTime(user.lastMessageDate);

    // Calculate percentage differences
    const percentTotalMessages = (user.totalMessages / aggregateData.totalMessages) * 100;

    const customStyles = {
        defaultCard: { bgcolor: 'background.paper', boxShadow: 5, borderRadius: 3, p: 3, maxWidth: 900, },
        loudText: { color: 'text.primary', fontSize: 34, fontWeight: 'medium' },
        mediumText: { color: 'text.secondary', display: 'inline', fontSize: 20, mr: 0 },
        normalText: { color: 'text.secondary', display: 'inline', fontSize: 16 },
        highlightedText: { color: 'success.dark', display: 'inline', fontWeight: 'bold', mx: 0.5, fontSize: 16 },
        highlightedLoudText: { color: 'success.dark', display: 'inline', fontWeight: 'bold', mx: 0.5, fontSize: 24 },
        userProfile: { display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: 24 },
        avatar: { bgcolor: getRandomColor()[500] },
        username: { marginLeft: 1 },
        smallText: { color: 'text.secondary', display: 'inline', fontSize: 14 },
        flexContainer: {
            display: 'flex',
            flexDirection: 'column', // Stacks children vertically on small screens
            '@media (min-width: 768px)': { // Adjust as per your breakpoint for desktop
                flexDirection: 'row', // Lays out children horizontally on large screens
            },
        },
        leftContent: {
            flex: 1, // Takes up remaining space after allocating to rightContent
            '@media (min-width: 768px)': {
                marginRight: '20px', // Adds some space between the left and right sections
            },
        },
        rightContent: {
            width: '100%', // Full width on small screens
            '@media (min-width: 768px)': {
                width: '350px', // Fixed width for the right box on large screens
                marginLeft: '50px', // Adds some space between the left and right sections
            },

        },

    }

    return (
        <ThemeProvider theme={theme}>

            <Box className="user-card" sx={customStyles.defaultCard}>
                <Box sx={customStyles.flexContainer}>
                    <Box sx={customStyles.leftContent}>
                        <Box sx={customStyles.userProfile}>
                            <Avatar sx={customStyles.avatar}>{getEmoji(user.name)}</Avatar>
                            <Box sx={customStyles.username}>{removeTilde(user.name)}</Box>
                        </Box>

                        <Box>⠀</Box>

                        <Box
                            sx={customStyles.highlightedLoudText}
                        >
                            {percentTotalMessages.toFixed(2)}%
                        </Box>

                        <Box sx={customStyles.mediumText}>
                            of total messages
                        </Box>
                        <br />

                        <Box sx={customStyles.normalText}>
                            Active for
                        </Box>

                        <Box sx={customStyles.highlightedText}>
                            {describeUserActivity(user.activeDays, aggregateData.daysBetween)}
                        </Box>

                        <Box>⠀</Box>
                    </Box>
                    <Box sx={customStyles.rightContent}>
                        <Box sx={customStyles.smallText}>
                            <p><ChildFriendly />{`  >  `}{`First Message: ${firstMessageDate}`}</p>
                            <p><Elderly />{`  >  `}{`Last Message: ${lastMessageDate}`}</p>
                            <p><Functions />{`  >  `}{`Messages Sent: ${user.totalMessages.toLocaleString()} / ${aggregateData.totalMessages.toLocaleString()}`}</p>
                            <p><Calculate />{`  >  `}{`Average Message: ${Math.floor(user.avgMessageLength)}`} characters</p>
                            <p><SquareFoot />{`  >  `}{`Longest Message: ${user.longestMessage.toLocaleString()} characters`}</p>
                            <p><EventAvailable />{`  >  `}{`Active Days: ${user.activeDays}`}</p>
                        </Box>

                    </Box>
                </Box>

            </Box>


        </ThemeProvider>
    );
}

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        (
            <Zoom
                in={isVisible}
                timeout={500}
                style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
                unmountOnExit
            >
                <Fab variant="extended" className="fab" color="primary" aria-label="scroll back to top" onClick={handleClick}>
                    <KeyboardArrowUp sx={{ mr: 1 }} /> Scroll to Top
                </Fab>
            </Zoom>
        )
    );
};

function Dashboard({ dashboardData }) {

    const valueFormatter = (value) => `${value}`;

    const chartSetting = {
        width: 400,
        height: 300,
    };

    // Data mapping for different charts
    const totalMessagesData = dashboardData.TotalMessages.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.total_messages }));
    const averageMessageLengthData = dashboardData.AverageMessageLength.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: Math.floor(parseFloat(user.avg_message_length)) }));
    const longestMessageData = dashboardData.LongestMessage.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.longest_message }));
    const activeDaysData = dashboardData.ActiveDays.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.active_days }));

    // Data for all charts
    const chartsData = [
        {
            label: 'Total Messages',
            data: totalMessagesData,
            emoji: "📨",
            color: '#4e79a7'
        },
        {
            label: 'Average Message',
            data: averageMessageLengthData,
            emoji: "📏",
            color: '#f28e2c'
        },
        {
            label: 'Longest Message',
            data: longestMessageData,
            emoji: "📜",
            color: '#e15759'
        },
        {
            label: 'Active Days',
            data: activeDaysData,
            emoji: "📅",
            color: '#76b7b2'
        }
    ];

    const userData = transformData(dashboardData);

    const firstMessageDate = new Date(userData.reduce((acc, curr) => acc < curr.firstMessageDate ? acc : curr.firstMessageDate, userData[0].firstMessageDate));
    const lastMessageDate = new Date(userData.reduce((acc, curr) => acc > curr.lastMessageDate ? acc : curr.lastMessageDate, userData[0].lastMessageDate));


    // Create aggregate data for comparison. e.g total messages in the group, etc. 
    const aggregateData = {
        totalMessages: totalMessagesData.reduce((acc, curr) => acc + curr.value, 0),
        averageMessageLength: averageMessageLengthData.reduce((acc, curr) => acc + curr.value, 0) / averageMessageLengthData.length,
        longestMessage: longestMessageData.reduce((acc, curr) => acc.value > curr.value ? acc : curr).value,
        daysBetween: Math.ceil((lastMessageDate - firstMessageDate) / (1000 * 60 * 60 * 24)),
        userData: userData
    };



    // Helper function to render BarCharts
    const renderBarChart = (data, title, emoji, color) => (
        <div className="chart" key={title}>
            <Typography variant='h4' style={{ padding: 20, width: 400 }}>{emoji} {title}</Typography>
            <BarChart
                dataset={data}
                xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
                series={[{ dataKey: 'value', label: title, valueFormatter, color: color }]}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: -50,
                    },
                }}
                {...chartSetting}
            />
        </div>
    );

    const renderCharts = () => chartsData.map(chart => renderBarChart(chart.data.slice(0, 5), chart.label, chart.emoji, chart.color));

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (

        <div className="stats-section ">
            <Typography variant='h2' className="stats-header">🔍 Stats Explorer</Typography>
            <GroupCard aggregateData={aggregateData} />
            <div className=" chart-container">
            {renderCharts()}
            </div>
            <UserCards data={userData} aggregateData={aggregateData} />
            <ScrollTop />
        </div>
    );
}

const transformData = (data) => {
    const usernames = {};
    Object.values(data).forEach(group => {
        group.forEach(user => {
            usernames[user.user_id] = user.username;
        });
    });

    const newData = data.FirstMessageDate.map(user => {
        const firstMessageDate = user.first_message_date;
        const lastMessageDate = data.LastMessageDate.find(item => item.user_id === user.user_id).last_message_date;
        const totalMessages = data.TotalMessages.find(item => item.user_id === user.user_id).total_messages;
        const avgMessageLength = data.AverageMessageLength.find(item => item.user_id === user.user_id).avg_message_length;
        const longestMessage = data.LongestMessage.find(item => item.user_id === user.user_id).longest_message;
        const activeDays = data.ActiveDays.find(item => item.user_id === user.user_id).active_days;

        return {
            name: usernames[user.user_id],
            firstMessageDate: firstMessageDate,
            lastMessageDate: lastMessageDate,
            totalMessages: totalMessages,
            avgMessageLength: avgMessageLength,
            longestMessage: longestMessage,
            activeDays: activeDays,

        };
    });

    return newData;
};

function UserCards({ data: users, aggregateData }) {

    // sort users array by total messages sent
    users.sort((a, b) => b.totalMessages - a.totalMessages);

    // limit to 25 users
    // users = users.slice(0, 25);

    return (
        <div className="user-section">

            <Typography variant='h2' style={{ padding: "30px", backgroundColor: "#e9ff98" }}>🃏 User Cards</Typography>
            <div className=" main-container">

            {users.map((user) => (<UserProfileCard key={user.name} className="user-card" user={user} aggregateData={aggregateData} />))}
            </div>
        </div>
    );
};


export default Dashboard;
