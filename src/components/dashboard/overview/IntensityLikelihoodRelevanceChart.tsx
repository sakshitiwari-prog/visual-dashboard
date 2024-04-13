'use client';

import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';

import { Card } from '@mui/material';

const IntensityLikelihoodRelevanceChart = ({data}) => {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const traces = data.map((item) => ({
      x: ['Intensity', 'Likelihood', 'Relevance'],
      y: [item.intensity, item.likelihood, item.relevance],
      name: `${item.country} - ${item.region}`,
      type: 'bar',
      marker: {
        color: ['blue', 'green', 'red'], // Custom colors for each variable
      },
    }));

    const layout = {
      title: 'Distribution of Intensity, Likelihood, and Relevance',
      xaxis: {
        title: 'Variables',
      },
      yaxis: {
        title: 'Count',
      },
      barmode: 'group',
    };

    const chartDiv = document.getElementById('intensityLikelihoodRelevanceChart');

    Plotly.newPlot(chartDiv, traces, layout, {
      transition: {
        duration: 1000,
        easing: 'cubic-in-out',
      },
      frame: {
        duration: 1000,
      },
      mode: 'afterall',
    });

    return () => {
      Plotly.purge(chartDiv);
    };
  }, [data]);

  return   <Card sx={{ p: 2,display: 'flex', alignItems: 'end',justifyContent:'space-between' }} >
  <div id="intensityLikelihoodRelevanceChart" /></Card>;
};

export default IntensityLikelihoodRelevanceChart;
