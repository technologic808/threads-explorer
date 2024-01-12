'use client'
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import './dashboard.css'

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

    const renderCharts = () => chartsData.map(chart => renderBarChart(chart.data, chart.label, chart.emoji, chart.color));


    return (
        <>
            <Typography variant='h1' style={{ "margin": "20px", background: "yellow" }}>Stats Explorer</Typography>
            {renderCharts()}
            <UserCards data={transformData(dashboardData)} />
        </>
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


function UserCards({ data }) {
    return (
        <div style={{ backgroundColor: "lightseagreen" }}>
            <Typography variant='h1' style={{ "margin": "20px" }}>🃏 User Cards</Typography>

            {data.map((user) => {
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
                return (
                    <Card elevation={10} variant="outlined" style={{ "margin": "10px", backgroundColor: "yellow" }} key={user.name} className="">
                        <CardContent>
                            <Avatar>{getInitials(user.name)}</Avatar>
                            <Typography variant="h6">{user.name}</Typography>
                            <List className="">
                                <ListItem>
                                    <ListItemIcon>{/* First message icon */}</ListItemIcon>
                                    <ListItemText primary={`First Message: ${firstMessageDate}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>{/* Last message icon */}</ListItemIcon>
                                    <ListItemText primary={`Last Message: ${lastMessageDate}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>{/* Total messages icon */}</ListItemIcon>
                                    <ListItemText primary={`Total Messages: ${user.totalMessages}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>{/* Average message length icon */}</ListItemIcon>
                                    <ListItemText primary={`Average Message Length: ${user.avgMessageLength}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>{/* Longest message icon */}</ListItemIcon>
                                    <ListItemText primary={`Longest Message: ${user.longestMessage}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>{/* Active days icon */}</ListItemIcon>
                                    <ListItemText primary={`Active Days: ${user.activeDays}`} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};


export default Dashboard;
