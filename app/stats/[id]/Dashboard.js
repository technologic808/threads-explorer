'use client'
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { Box, ThemeProvider, createTheme } from '@mui/system';
import './dashboard.css';
import { Calculate, ChildFriendly, Elderly, EventAvailable, Functions, SquareFoot } from "@mui/icons-material";

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
            dark: '#009688',
        },
        failure: {
            dark: '#E53935',
        },
    },
});

function UserProfileCard({ user, aggregateData }) {

    const firstMessageDate = new Date(user.firstMessageDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    const lastMessageDate = new Date(user.lastMessageDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
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
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: '95vw',
                    marginLeft: '20px',
                    marginRight: '20px',
                }}
            >
                <Box sx={{ color: 'text.secondary' }}>{user.name}</Box>
                <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                    {user.totalMessages} / {aggregateData.totalMessages} messages
                </Box>
                <Box
                    sx={{
                        color: 'success.dark',
                        display: 'inline',
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 14,
                    }}
                >
                    {percentTotalMessages.toFixed(2)}%
                </Box>
                <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                    of total messages sent.
                </Box>
                <br />
                <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                    Group activity :
                </Box>
                <Box
                    sx={{
                        color: 'success.dark',
                        display: 'inline',
                        fontWeight: 'bold',
                        mx: 0.5,
                        fontSize: 14,
                    }}
                >
                    {describeUserActivity(user.activeDays, aggregateData.daysBetween)}
                </Box>
                <Box
                    sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
                >
                    <p><ChildFriendly />{`  >  `}{`First Message: ${firstMessageDate}`}</p>
                    <p><Elderly />{`  >  `}{`Last Message: ${lastMessageDate}`}</p>
                    <p><Functions />{`  >  `}{`Total Messages: ${user.totalMessages}`}</p>
                    <p><Calculate />{`  >  `}{`Average Message Length: ${user.avgMessageLength}`}</p>
                    <p><SquareFoot />{`  >  `}{`Longest Message: ${user.longestMessage}`}</p>
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

    // Create aggregate data for comparison. e.g total messages in the group, etc. 
    const aggregateData = {
        totalMessages: totalMessagesData.reduce((acc, curr) => acc + curr.value, 0),
        averageMessageLength: averageMessageLengthData.reduce((acc, curr) => acc + curr.value, 0) / averageMessageLengthData.length,
        longestMessage: longestMessageData.reduce((acc, curr) => acc.value > curr.value ? acc : curr).value,
        activeDays: activeDaysData.reduce((acc, curr) => acc + curr.value, 0),
    };

    // Helper function to render BarCharts
    const renderBarChart = (data, title, emoji, color) => (
        <div style={{ padding: "20px" }}>
            <Typography variant='h2' style={{ "margin": "20px" }}>{emoji} {title}</Typography>
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
            <Typography variant='h1' className="stats-header">Stats Explorer</Typography>
            {renderCharts()}
            <UserCards data={transformData(dashboardData)} aggregateData={aggregateData} />
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

    users = users.slice(0, 10);

    return (
        <div className="user-section">
            <Typography variant='h1' style={{ padding: "30px" }}>🃏 User Cards</Typography>

            {users.map((user) => {

                return (
                    <UserProfileCard className="user-card" user={user} aggregateData={aggregateData} />
                )
            })}
        </div>
    );
};


export default Dashboard;
