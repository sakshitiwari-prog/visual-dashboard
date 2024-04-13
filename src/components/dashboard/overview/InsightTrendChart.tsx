import React, { useEffect, useState } from 'react';
import { Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Plot from 'react-plotly.js';

const InsightTrendChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [sectors, setSectors] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [insightsCount, setInsightsCount] = useState({});

  // Extract sectors from data
  useEffect(() => {
    if (data) {
      const sectorSet = new Set(data.map((item) => item.sector));
      setSectors(['All Sectors', ...Array.from(sectorSet)]); // Include 'All Sectors' option
    }
  }, [data]);

  // Filter data based on selected sector
  useEffect(() => {
    if (selectedSector === 'All Sectors') {
      setFilteredData(data); // Show all data when 'All Sectors' is selected
    } else {
      setFilteredData(data.filter((item) => item.sector === selectedSector));
    }
  }, [data, selectedSector]);

  // Count insights per sector
  useEffect(() => {
    const counts = {};
    if (filteredData.length > 0) {
      filteredData.forEach((item) => {
        counts[item.sector] = (counts[item.sector] || 0) + 1;
      });
    }

    setInsightsCount(counts);
  }, [filteredData]);

  // Prepare data for Plotly chart
  const plotData = [
    {
      type: 'bar',
      x: Object.values(insightsCount),
      y: Object.keys(insightsCount),
      orientation: 'h',
      marker: {
        color: '#686BFA', // specify the desired color here
      },
    },
  ];

  return (
    <Card sx={{ p: 2, display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
      <Plot
        data={plotData}
        layout={{
          title: 'Insights Distribution by Sector',
          xaxis: { title: 'Count of Insights' },
          yaxis: { title: 'Sector' },
          barmode: 'group',
        }}
      />
      <FormControl>
        {/* <InputLabel id="demo-simple-select-label">Select sector</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSector}
          label={''}
          onChange={(e) => {
            setSelectedSector(e.target.value);
          }}
        >
          {sectors.map((sector, index) => (
            <MenuItem value={sector} key={index}>
              {sector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  );
};

export default InsightTrendChart;
