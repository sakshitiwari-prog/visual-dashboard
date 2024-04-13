'use client';

import React, { useState } from 'react';
import Plot from 'react-plotly.js';

import { data } from '../../../../DummyData';
import { Card } from '@mui/material';

const RadarChart = () => {
    const [selectedSWOT, setSelectedSWOT] = useState('');

    // Extract SWOT categories from data
    const swotCategories = data.reduce((acc, curr) => {
      if (!acc.includes(curr.name)) {
        acc.push(curr.name);
      }
      return acc;
    }, []);
  
    // Filter data based on selected SWOT category
    const filteredData = selectedSWOT ? data.filter(item => item.name === selectedSWOT) : data;
  
    // Prepare data for Plotly chart
    const plotData = filteredData.map(swot => ({
      type: 'scatterpolar',
      r: swot.r,
      theta: swot.theta,
      fill: 'toself',
      name: swot.name
    }));
  
    return (
      <Card sx={{ p: 2 }}>
        <Plot
          data={plotData}
          layout={{
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 50]
              }
            },
            title: 'SWOT Analysis',
            showlegend: true
          }}
        />
        <select onChange={(e) => setSelectedSWOT(e.target.value)}>
          <option value="">All SWOT Categories</option>
          {swotCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </Card>
    );
  
};

export default RadarChart;
