import { fetchUserDashboard } from '../../api/useDashboard'
import { redirect } from 'next/navigation'
import { generateAggregateGroupData } from '../../api/processGroupStats'
import GroupHomeClientSide from './page_client'

export default async function GroupHomeServerSide({ params }) {
    if (!params.id || params.id === 'undefined') { redirect('/') }

    const id = params.id;

    console.log("🟢 Data Fetch for Group ID : ", id) 
    const response = await fetchUserDashboard(id)

    if (!response || response.length === 0) { redirect('/') }

    const dashboardData = {};

    response.map((item) => { dashboardData[item.metric] = item.data })

    console.log("🟢 Data Fetch for Group home Success : ", dashboardData.length)

    return (<GroupHomeClientSide aggregateGroupData={generateAggregateGroupData(dashboardData)} />);
}

 GroupHomeServerSide;