import { fetchUserDashboard } from '../../api/useDashboard'
import { redirect } from 'next/navigation'

export default async function CreateGroup({ params }) {
    if (!params.id || params.id === 'undefined') { redirect('/') }

    const id = params.id;

    const response = await fetchUserDashboard(id)

    if (!response || response.length === 0) { redirect('/') }

    const dashboardData = {};

    response.map((item) => { dashboardData[item.metric] = item.data })

    console.log("🟢 Data Fetch Success : ", dashboardData.length)

    return <>
        <div>Users Dashboard : {id}</div>

        <section>
            <h2>Total Messages</h2>
            <ul>
                {dashboardData.TotalMessages.map(user => (
                    <li key={user.user_id}>{user.username}: {user.total_messages} messages</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Average Message Length</h2>
            <ul>
                {dashboardData.AverageMessageLength.map(user => (
                    <li key={user.user_id}>{user.username}: {user.avg_message_length} characters</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Most Active Day</h2>
            <ul>
                {dashboardData.MostActiveDay.map(user => (
                    <li key={user.user_id}>{user.username}: {user.most_active_day}</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Longest Message</h2>
            <ul>
                {dashboardData.LongestMessage.map(user => (
                    <li key={user.user_id}>{user.username}: {user.longest_message} characters</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>First Message Date</h2>
            <ul>
                {dashboardData.FirstMessageDate.map(user => (
                    <li key={user.user_id}>{user.username}: {new Date(user.first_message_date).toLocaleString()}</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Last Message Date</h2>
            <ul>
                {dashboardData.LastMessageDate.map(user => (
                    <li key={user.user_id}>{user.username}: {new Date(user.last_message_date).toLocaleString()}</li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Active Days</h2>
            <ul>
                {dashboardData.ActiveDays.map(user => (
                    <li key={user.user_id}>{user.username}: {user.active_days} days</li>
                ))}
            </ul>
        </section>
    </>
}