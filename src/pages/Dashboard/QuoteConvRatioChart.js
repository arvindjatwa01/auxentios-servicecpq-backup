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
    pv: 0.5,
  },
  {
    name: "Feb",
    pv: 0.11,
  },
  {
    name: "Mar",
    pv: 0.2,
  },
  {
    name: "Apr",
    pv: 0.3,
  },
  {
    name: "May",
    pv: 0.92,
  },
  {
    name: "June",
    pv: 0.99,
  },
  {
    name: "July",
    pv: 0.9,
  },
  {
    name: "Aug",
    pv: 0.34,
  },
  {
    name: "Sep",
    pv: 0.88,
  },
  {
    name: "Oct",
    pv: 0.78,
  },
  {
    name: "Nov",
    pv: 0.54,
  },
  {
    name: "Dec",
    pv: 0.67,
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
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
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
        dataKey="pv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
     </ResponsiveContainer>
  );
}
