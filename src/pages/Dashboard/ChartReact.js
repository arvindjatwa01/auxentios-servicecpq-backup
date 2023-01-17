import React from 'react';
import {faker} from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      // text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['10', '20', '30', '40', '50', '60', '70'];

export const data = {
  labels,
  datasets: [
    {
      label: '20',
      data: labels.map(() => faker?.datatype?.number({ min: -1000, max: 1000 })),
      backgroundColor: '#B2EAE8',
    },
    {
      label: '30',
      data: labels.map(() => faker?.datatype?.number({ min: -1000, max: 1000 })),
      backgroundColor: '#FFD1DE',
    },
    {
      label: '40',
      data: labels.map(() => faker?.datatype?.number({ min: -1000, max: 1000 })),
      backgroundColor: '#B2EAE8',
    },
    {
      label: '50',
      data: labels.map(() => faker?.datatype?.number({ min: -1000, max: 1000 })),
      backgroundColor: '#D7B7D7',
    },
  ],
};

export function ChartReact() {
  return <Bar options={options} data={data} />;
}
