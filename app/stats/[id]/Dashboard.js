'use client'
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { green, blue, orange, yellow, pink } from '@mui/material/colors';
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from "@mui/material/styles";
import './dashboard.css';
import { Calculate, ChildFriendly, Elderly, EventAvailable, Functions, Group, SquareFoot } from "@mui/icons-material";
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


function GroupCard({ aggregateData }) {

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



    return <ThemeProvider theme={theme}>
        <Box
            className="user-card"
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 5,
                borderRadius: 3,
                p: 3,
            }}
        >


            <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>

            </Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {aggregateData.totalMessages.toLocaleString()} messages
            </Box>


            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 16 }}>
                First message sent on
            </Box>
            <Box
                sx={{
                    color: 'success.dark',
                    display: 'inline',
                    fontWeight: 'bold',
                    mx: 0.5,
                    fontSize: 16,
                }}
            >
                {
                    new Date(firstGroupMessageDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    })
                }

            </Box>


            <br />

            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 16 }}>
                Active for
            </Box>
            <Box
                sx={{
                    color: 'success.dark',
                    display: 'inline',
                    fontWeight: 'bold',
                    mx: 0.5,
                    fontSize: 16,
                }}
            >
                {aggregateData.activeDays.toLocaleString()} days

            </Box>

            <br />

            <Box
                sx={{
                    color: 'success.dark',
                    display: 'inline',
                    fontWeight: 'bold',
                    mx: 0.5,
                    fontSize: 16,
                }}
            >
                {calculateDaysBetween(lastGroupMessageDate, new Date())} days

            </Box>
            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 16 }}>
                since last message
            </Box>
            <br />


            <Box
                sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
            >

            </Box>


        </Box>

    </ThemeProvider>
}

function UserProfileCard({ user, aggregateData }) {

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];
    const { getEmoji } = useEmoji(emojis);


    const firstMessageDate = new Date(user.firstMessageDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    const lastMessageDate = new Date(user.lastMessageDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    // Calculate percentage differences
    const percentTotalMessages = (user.totalMessages / aggregateData.totalMessages) * 100;

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

    return (
        <ThemeProvider theme={theme}>
            <Box
                className="user-card"
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 5,
                    borderRadius: 3,
                    p: 3,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: 24 }}>


                    <Avatar sx={{ bgcolor: getRandomColor()[500] }}>{getEmoji(user.name)}</Avatar>
                    <Box sx={{ marginLeft: 1 }}>{removeTilde(user.name)}</Box>
                </Box>
                <Box>⠀</Box>
                <Box
                    sx={{
                        color: 'success.dark',
                        display: 'inline',
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 24,
                    }}
                >
                    {percentTotalMessages.toFixed(2)}%
                </Box>
                <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 20 }}>
                    of total messages sent
                </Box>
                <br />
                <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 16 }}>
                    Group activity :
                </Box>
                <Box
                    sx={{
                        color: 'success.dark',
                        display: 'inline',
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 16,
                    }}
                >
                    {describeUserActivity(user.activeDays, aggregateData.daysBetween)}
                </Box>
                <Box>⠀</Box>
                <Box
                    sx={{
                        color: 'text.secondary',
                        display: 'inline',
                        fontSize: 14,
                    }}
                >
                    <p><ChildFriendly />{`  >  `}{`First Message: ${firstMessageDate}`}</p>
                    <p><Elderly />{`  >  `}{`Last Message: ${lastMessageDate}`}</p>
                    <p><Functions />{`  >  `}{`Messages Sent: ${user.totalMessages.toLocaleString()} / ${aggregateData.totalMessages.toLocaleString()}`}</p>
                    <p><Calculate />{`  >  `}{`Average Message Length: ${user.avgMessageLength}`}</p>
                    <p><SquareFoot />{`  >  `}{`Longest Message: ${user.longestMessage.toLocaleString()} characters`}</p>
                    <p><EventAvailable />{`  >  `}{`Active Days: ${user.activeDays}`}</p>
                </Box>


            </Box>

        </ThemeProvider>
    );
}

function Dashboard({ dashboardData }) {

    const valueFormatter = (value) => `${value}`;

    const chartSetting = {
        width: 500,
        height: 400,
    };

    // Data mapping for different charts
    const totalMessagesData = dashboardData.TotalMessages.map(user => ({ id: user.user_id, label: user.username, value: user.total_messages }));
    const averageMessageLengthData = dashboardData.AverageMessageLength.map(user => ({ id: user.user_id, label: user.username, value: parseFloat(user.avg_message_length) }));
    const longestMessageData = dashboardData.LongestMessage.map(user => ({ id: user.user_id, label: user.username, value: user.longest_message }));
    const activeDaysData = dashboardData.ActiveDays.map(user => ({ id: user.user_id, label: user.username, value: user.active_days }));

    // Data for all charts
    const chartsData = [{
        label: 'Total Messages',
        data: totalMessagesData,
        emoji: "📨",
        color: '#4e79a7'
    },
    {
        label: 'Average Message Length',
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
        }];

    const userData = transformData(dashboardData);

    // Create aggregate data for comparison. e.g total messages in the group, etc. 
    const aggregateData = {
        totalMessages: totalMessagesData.reduce((acc, curr) => acc + curr.value, 0),
        averageMessageLength: averageMessageLengthData.reduce((acc, curr) => acc + curr.value, 0) / averageMessageLengthData.length,
        longestMessage: longestMessageData.reduce((acc, curr) => acc.value > curr.value ? acc : curr).value,
        activeDays: activeDaysData.reduce((acc, curr) => acc + curr.value, 0),
        userData: userData
    };

    // Helper function to render BarCharts
    const renderBarChart = (data, title, emoji, color) => (
        <div style={{ padding: "20px" }}>
            <Typography variant='h3' style={{ "margin": "20px" }}>{emoji} {title}</Typography>
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

    return (
        <div className="stats-section">
            <Typography variant='h2' className="stats-header">🔍 Stats Explorer</Typography>
            <GroupCard aggregateData={aggregateData} />
            {renderCharts()}
            <UserCards data={userData} aggregateData={aggregateData} />
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

const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map(name => name.charAt(0).toUpperCase());
    return initials.slice(0, 2).join("");
};


function UserCards({ data: users, aggregateData }) {

    // calculate number of days between earliest first message and latest last message among all users
    // iterate between the dates of all users to find the earliest and latest date
    const firstMessageDate = new Date(users.reduce((acc, curr) => acc < curr.firstMessageDate ? acc : curr.firstMessageDate, users[0].firstMessageDate));
    const lastMessageDate = new Date(users.reduce((acc, curr) => acc > curr.lastMessageDate ? acc : curr.lastMessageDate, users[0].lastMessageDate));
    const daysBetween = Math.ceil((lastMessageDate - firstMessageDate) / (1000 * 60 * 60 * 24));
    aggregateData.daysBetween = daysBetween;

    // sort users array by total messages sent
    users.sort((a, b) => b.totalMessages - a.totalMessages);

    users = users.slice(0, 25);

    return (
        <div className="user-section">
            <Typography variant='h2' style={{ padding: "30px", backgroundColor: "#e9ff98" }}>🃏 User Cards</Typography>

            {users.map((user) => {

                return (
                    <UserProfileCard className="user-card" user={user} aggregateData={aggregateData} />
                )
            })}
        </div>
    );
};


export default Dashboard;
