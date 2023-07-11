import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export default function StatusStackedChart(props) {
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
        <Tooltip cursor={{fill: 'transparent'}} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Bar
          dataKey="waiting"
          stackId="a"
          fill="#896dfe"
          radius={[0, 0, 4, 4]}
        />
        <Bar dataKey="draft" stackId="a" fill="#6fa7ff" />
        <Bar dataKey="ready" stackId="a" fill="#ad6fff" />
        <Bar dataKey="running" stackId="a" fill="#d06fff" />
        <Bar dataKey="done" stackId="a" fill="#6fd4ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
