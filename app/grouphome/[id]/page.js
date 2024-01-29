'use client'

// pages/index.js

import React, { createContext, useContext } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import Image from 'next/image';
import { DoughnutChart } from '@mui/x-charts';


const MyContext = createContext();

const doughnutChartData = [
    { name: 'Politics', value: 20 },
    { name: 'Movies', value: 15 },
    { name: 'Religion', value: 25 },
    { name: 'War', value: 10 },
    { name: 'Sports', value: 30 },
  ];

const topicCloudData = ['Politics', 'Politics', 'Politics', 'Politics', 'Politics', 'Politics', 'Politics', 'Politics', 
'Movies','Movies','Movies','Movies','Movies','Movies',
'Religion','Religion','Religion','Religion',
'War','War',
'Sports','Sports','Sports'
];

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

const Home = () => {
  // Use useContext with a client-side check
  const isClient = typeof window !== 'undefined';
  const contextValue = useContext(MyContext);

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
          <Card>
            <CardContent>
              <Typography variant="h5">Message Stats</Typography>
              <Typography variant="body1">First message sent on <b>Oct 18, 2019</b></Typography>
              <Typography variant="body1"><b>13,614</b> messages spanning over 1,557 days</Typography>
              <Typography variant="body1">Most messages sent on <b>Wednesdays</b> and least on <b>Mondays</b> </Typography>
              <Typography variant="h5"><u>Explore all stats</u></Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Multiple Cards Section */}
      <Grid container spacing={2}>
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card>
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
          <Card>
            <CardMedia height="140" alt="Winner 2" >
                <Image
                    src="/images/grouphome/soldier1.png" // Note: The path is relative to the 'public' directory
                    alt="Second prize"
                    width={200} // Set your preferred width
                    height={200} // Set your preferred height
                />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">Second biggest contributor</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
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
};

export default Home;
