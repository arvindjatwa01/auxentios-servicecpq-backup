import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function StatusStackedChart({ data }) {
  return (
    <ResponsiveContainer width="98%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
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
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Bar
          dataKey="Waiting"
          stackId="a"
          fill="#896dfe"
          radius={[0, 0, 4, 4]}
        />
        <Bar dataKey="Draft" stackId="a" fill="#6fa7ff" >
          {data.map((entry, i) => {
            const isRadius = !(entry.Done || entry.Revised || entry.Ready || entry.Running);
            console.log(entry, isRadius);
            return (
              <Cell key={`cell-${i}`} radius={isRadius ? [4, 4, 0, 0] : undefined} />
            );
          })}</Bar>
        <Bar dataKey="Revised" stackId="a" fill="#dd96ff" >
          {data.map((entry, i) => {
            const isRadius = !(entry.Done || entry.Ready || entry.Running);
            return (
              <Cell key={`cell-${i}`} radius={isRadius ? [4, 4, 0, 0] : undefined} />
            );
          })}</Bar>
        <Bar dataKey="Ready" stackId="a" fill="#ad6fff" >
          {data.map((entry, i) => {
            const isRadius = !(entry.Done || entry.Running);
            return (
              <Cell key={`cell-${i}`} radius={isRadius ? [4, 4, 0, 0] : undefined} />
            );
          })}</Bar>
        <Bar dataKey="Running" stackId="a" fill="#d06fff" >
          {data.map((entry, i) => {
            const isRadius = !(entry.Done);
            return (
              <Cell key={`cell-${i}`} radius={isRadius ? [4, 4, 0, 0] : undefined} />
            );
          })}</Bar>
        <Bar dataKey="Done" stackId="a" fill="#6fd4ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
