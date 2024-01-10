import { fetchUserDashboard } from '../../api/useDashboard'
import { redirect } from 'next/navigation'
import Dashboard from './Dashboard'
import { Typography } from '@mui/material';

export default async function UsersDashboard({ params }) {
    if (!params.id || params.id === 'undefined') { redirect('/') }

    const id = params.id;

    const response = await fetchUserDashboard(id)

    if (!response || response.length === 0) { redirect('/') }

    const dashboardData = {};

    response.map((item) => { dashboardData[item.metric] = item.data })

    console.log("🟢 Data Fetch Success : ", dashboardData.length)

    return <>
        <Dashboard dashboardData={dashboardData} />
    </>
}