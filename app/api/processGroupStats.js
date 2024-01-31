
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
}

function generateAggregateGroupData(dashboardData) {
    // Data mapping for different charts
    const totalMessagesData = dashboardData.TotalMessages.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.total_messages }));
    const averageMessageLengthData = dashboardData.AverageMessageLength.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: Math.floor(parseFloat(user.avg_message_length)) }));
    const longestMessageData = dashboardData.LongestMessage.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.longest_message }));
    const activeDaysData = dashboardData.ActiveDays.map(user => ({ id: user.user_id, label: removeTilde(user.username), value: user.active_days }));

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

    return aggregateData;
}

function removeTilde(str) {
    if (str.startsWith("~")) {
        return str.substring(1);
    }
    return str;
}

function getFirstandLastGroupMessageDate(aggregateData) {
    let firstGroupMessageDate, lastGroupMessageDate;
  
    aggregateData?.userData.forEach(user => {
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

function calculateDaysBetween(date1, date2) {
    // Subtract the two dates and get the difference in milliseconds
    var differenceInMilliseconds = Math.abs(new Date(date2) - new Date(date1));

    // Convert the difference from milliseconds to days
    var differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

function getReadableDate(date) {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
}

export {generateAggregateGroupData, getFirstandLastGroupMessageDate,
     calculateDaysBetween, getReadableDate}