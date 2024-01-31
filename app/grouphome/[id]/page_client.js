'use client'

import { Container, Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import Image from 'next/image';
import { getFirstandLastGroupMessageDate, calculateDaysBetween, getReadableDate } from '../../api/processGroupStats'

import { DoughnutChart } from '@mui/x-charts';

const styles = {
  centeredText: {
    textAlign: 'center',
  },
  circleImage: {
    borderRadius: '50%',
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function getTopTopicList() {
    return (
        <CardContent>
            <Typography variant="body1">Politics</Typography>
            <Typography variant="body1">Movies</Typography>
            <Typography variant="body1">Religion</Typography>
            <Typography variant="body1">War</Typography>
            <Typography variant="body1">Sports</Typography>
        </CardContent>
    );
}

function getGroupStatsCard({aggregateData}) {
  const [firstGroupMessageDate, lastGroupMessageDate] = getFirstandLastGroupMessageDate(aggregateData);

  const customStyles = {
      defaultCard: { bgcolor: 'background.paper', boxShadow: 5, borderRadius: 3, p: 3, maxWidth: 400 },
      loudText: { color: 'text.primary', fontSize: 34, fontWeight: 'medium' },
      normalText: { color: 'text.secondary', display: 'inline', fontSize: 16 },
      highlightedText: { color: 'success.dark', display: 'inline', fontWeight: 'bold', mx: 0.5, fontSize: 16 },
  }

  return (
    <Card>
      <CardContent>
      <Typography variant="h5">Message Stats</Typography>
      <Typography variant="body1">First message sent on <b>{getReadableDate(firstGroupMessageDate)}</b></Typography>
      <Typography variant="body1">{aggregateData?.totalMessages.toLocaleString()} messages
       spanning over {calculateDaysBetween(firstGroupMessageDate, lastGroupMessageDate).toLocaleString()} days</Typography>
      <Typography variant="body1">Most messages sent on <b>Wednesdays</b> and least on <b>Mondays</b> </Typography>
      <Typography variant="h5"><u>Explore all stats</u></Typography>
      </CardContent>
    </Card>
  );
}

function GroupHomeClientSide({ aggregateGroupData }) {

  // Use useContext with a client-side check
  // const isClient = typeof window !== 'undefined';
  // const contextValue = useContext(MyContext);

  return (
    <Container>
      {/* Top Section */}
      <Box sx={{ backgroundColor: '#yourBackgroundColor', padding: 4 }}>
        <Typography variant="h4" sx={styles.centeredText}>
            Lurker's Lounge
        </Typography>
      </Box>

      {/* Medium Strip */}
      {/* <Grid container spacing={2} sx={{ padding: 4 }}> */}
      <Grid container spacing={2} sx={{ padding: 6 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ ...styles.circleImage, width: '200px', height: '200px' }}>
            <Image
                src="/images/grouphome/group_icon5.jpg" // Note: The path is relative to the 'public' directory
                alt="Circle Image"
                width={200} // Set your preferred width
                height={200} // Set your preferred height
            />
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={6} sx={styles.chartContainer}>
          <DoughnutChart data={doughnutChartData} dataKey="value" nameKey="name" />
        </Grid> */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Top discussed topics ranked</Typography>
              {getTopTopicList()}
              <Typography variant="h5"><u>Explore all threads</u></Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          {getGroupStatsCard(aggregateGroupData)}
        </Grid>
      </Grid>

      {/* Multiple Cards Section */}
      <Grid container spacing={2}>
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card style={{ display: 'flex' }}>
            <CardMedia height="140" alt="Winner 1" >
                <Image
                    src="/images/grouphome/king1.png" // Note: The path is relative to the 'public' directory
                    alt="Circle Image"
                    width={200} // Set your preferred width
                    height={200} // Set your preferred height
                />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">Biggest contributor</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card style={{ display: 'flex' }}>
            <CardMedia height="140" alt="Winner 2" >
                <Image
                    src="/images/grouphome/soldier1.png" // Note: The path is relative to the 'public' directory
                    alt="Second prize"
                    width={200} // Set your preferred width
                    height={200} // Set your preferred height
                />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">Runner-up</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card style={{ display: 'flex' }}>
            <CardMedia height="140" width="100" alt="Sleeping beauty" >
                <Image
                    src="/images/grouphome/sleeping2.jpg" // Note: The path is relative to the 'public' directory
                    alt="Sleeping beauty zz"
                    width={200} // Set your preferred width
                    height={200} // Set your preferred height
                />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">The sleeping beauty</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more cards as needed */}
      </Grid>
    </Container>
  );
}

export default GroupHomeClientSide;
