import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PaginationStackedChart(props) {
  return (
    <ResponsiveContainer width="98%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="month" tickLine={false} />
        <YAxis tickLine={false} />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Bar dataKey="parts" stackId="a" fill="#6FD4FF" radius={[0, 0, 4, 4]} />
        <Bar dataKey="repair" stackId="a" fill="#D06FFF" />
        <Bar
          dataKey="maintenance"
          stackId="a"
          fill="#6C70FE"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
