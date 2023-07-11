import { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer
} from "recharts";

const DATA_FETCHED = [
  {
    name: "Jan",
    ratio: 0.5,
  },
  {
    name: "Feb",
    ratio: 0.11,
  },
  {
    name: "Mar",
    ratio: 0.2,
  },
  {
    name: "Apr",
    ratio: 0.3,
  },
  {
    name: "May",
    ratio: 0.92,
  },
  {
    name: "June",
    ratio: 0.99,
  },
  {
    name: "July",
    ratio: 0.9,
  },
  {
    name: "Aug",
    ratio: 0.34,
  },
  {
    name: "Sep",
    ratio: 0.88,
  },
  {
    name: "Oct",
    ratio: 0.78,
  },
  {
    name: "Nov",
    ratio: 0.54,
  },
  {
    name: "Dec",
    ratio: 0.67,
  },
  
];

export default function QuoteConvRatioChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    setData(DATA_FETCHED);
  };

  return (
    <ResponsiveContainer width="99%" height={300}>
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorratio" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#9F58F8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#9F58F8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Tooltip />
      <Area
        type="monotone"
        dataKey="ratio"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorratio)"
      />
    </AreaChart>
     </ResponsiveContainer>
  );
}
