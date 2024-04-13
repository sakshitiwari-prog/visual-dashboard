'use client'

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import InsightDistributionChart from '@/components/dashboard/overview/InsightDistributionChart';
import InsightTrendChart from '@/components/dashboard/overview/InsightTrendChart';
import IntensityLikelihoodRelevanceChart from '@/components/dashboard/overview/IntensityLikelihoodRelevanceChart';

import { GetDashBoardData } from './integrations/getDashboardData';


export default function Page(): React.JSX.Element {
  const [isLoad, setIsLoad] = React.useState(false);
  const [data, setData] = React.useState(false);
  React.useEffect(() => {
    getDashboardData().then((res) => console.log(res));
  }, []);

  async function getDashboardData() {
    setIsLoad(true); // Set loading state before fetching data
    try {
      const res = await GetDashBoardData('http://localhost:5000/visual');
      console.log(res);
      setData(res.visuals)
      // if (res.existingUser.quoteHistory.length > 0) {
      //   setQuoteInfo({ quoteHistory: res.existingUser.quoteHistory });
      // } else {
      //   setQuoteInfo({ quoteHistory: [] }); // Update state even if there's no quote history
      //   throw Error(Constants.others.noQuotes);
      // }

      setIsLoad(false); // Turn off loading state after fetching data
    } catch (error) {
      // setError({ isError: true, msg: Constants.others.wentWrong });
      setIsLoad(false); // Turn off loading state if there's an error
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid lg={20} xs={12}>
        <IntensityLikelihoodRelevanceChart data={data} />
      </Grid>
      <Grid lg={20} xs={12}>
        <InsightTrendChart data={data}/>
      </Grid>
      <Grid lg={20} xs={12}>
        <InsightDistributionChart data={data}/>
      </Grid>
    </Grid>
  );
}
