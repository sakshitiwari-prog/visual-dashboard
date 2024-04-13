import React, { useEffect, useState } from 'react';
import { Card, FormControl, MenuItem, Select } from '@mui/material';
import Plot from 'react-plotly.js';

const InsightDistributionChart = ({ data }) => {
  const [counts, setCounts] = useState({});
  const [selectedPESTLE, setSelectedPESTLE] = useState('All PESTLE Factors');
  const [allPestle, setAllPestle] = useState([]);

  // Function to count insights by PESTLE factor
  const countInsightsByPESTLE = (data) => {
    const countList = {};

    data.forEach((item) => {
      countList[item.pestle] = (countList[item.pestle] || 0) + 1;
    });

    return countList;
  };

  // Update counts when data changes
  useEffect(() => {
    console.log('nu');
    let allPestleList = [];
    if (data && data.length > 0) {
      setCounts(countInsightsByPESTLE(data));
      data.forEach((item) => {
        // setAllPestle(()[...allPestle,item.pestle])
        if (!allPestleList.includes(item.pestle)) {
          allPestleList = [...allPestleList, item.pestle];
        }
      });
    }
    setAllPestle(allPestleList);
  }, [data]);

  // Function to update chart based on selected PESTLE factor
  const updateChart = (pestle) => {
    setSelectedPESTLE(pestle);

    setCounts(countInsightsByPESTLE(filterFunc(pestle)));
  };

  // Prepare filtered data for Plotly chart
  function filterFunc(pestle) {
    console.log(pestle,'op');
    let updatedPestle=pestle==='All PESTLE Factors'?'':pestle
    const filteredData = updatedPestle ? data.filter((item) => item.pestle === updatedPestle) : data;
    return filteredData;
  }

  const plotData = [
    {
      type: 'pie',
      labels: Object.keys(counts),
      values: Object.values(counts),
      textinfo: 'label+percent',
      insidetextorientation: 'radial',
    },
  ];

  return (
    <Card sx={{ p: 2, display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
    <Plot data={plotData} layout={{ title: 'Insights Distribution by PESTLE Factors' }} />
      
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"   
          value={selectedPESTLE}
          label={''}
          onChange={(e) => {
            updateChart(e.target.value);
          }}
        >
           <MenuItem value="All PESTLE Factors">All PESTLE Factors</MenuItem>
          {allPestle &&
            allPestle.length > 0 &&
            allPestle.map((pestle) => (
              <MenuItem key={pestle} value={pestle}>
                {pestle}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Card>
  );
};

export default InsightDistributionChart;
