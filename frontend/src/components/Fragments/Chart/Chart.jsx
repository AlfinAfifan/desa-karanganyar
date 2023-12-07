import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Chart = (dataChart) => {
  return (
    <Line
      data={{
        labels: dataChart.map((d) => d.month),
        datasets: [
          {
            label: 'data',
            data: dataChart.map((d) => d.dataCount),
          },
        ],
      }}
    ></Line>
  );
};

export default Chart;
