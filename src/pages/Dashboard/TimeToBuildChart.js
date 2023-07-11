import { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  Cell,
  Label,
} from "recharts";

const DATA_FETCHED = [
  {
    quoteId: "QT0001",
    category: "low",
    time: 100,
  },
  {
    quoteId: "QT0002",
    category: "low",
    time: 120,
  },
  {
    quoteId: "QT0003",
    category: "low",
    time: 190,
  },
  {
    quoteId: "QT0004",
    category: "low",
    time: 250,
  },
  {
    quoteId: "QT0005",
    category: "low",
    time: 290,
  },
  {
    quoteId: "QT0006",
    category: "low",
    time: 340,
  },
  {
    quoteId: "QT0007",
    category: "low",
    time: 399,
  },
  {
    quoteId: "QT0008",
    category: "medium",
    time: 410,
  },
  {
    quoteId: "QT0009",
    category: "medium",
    time: 440,
  },
  {
    quoteId: "QT0010",
    category: "medium",
    time: 490,
  },
  {
    quoteId: "QT0011",
    category: "medium",
    time: 510,
  },
  {
    quoteId: "QT0012",
    category: "medium",
    time: 570,
  },
  {
    quoteId: "QT0013",
    category: "medium",
    time: 610,
  },
  {
    quoteId: "QT0014",
    category: "medium",
    time: 650,
  },

  {
    quoteId: "QT0015",
    category: "high",
    time: 710,
  },
  {
    quoteId: "QT0016",
    category: "high",
    time: 720,
  },
];

export default function TimeToBuildChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);
  function formatYAxis(value) {
    if (value < 400) return "Low";
    if (400 < value && value < 700) return "Medium";
    if (700 < value) return "High";
    return value;
  }
  const asyncFetch = () => {
    setData(DATA_FETCHED);
  };

  return (
    <ResponsiveContainer width="99%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <YAxis
          dataKey="quoteId"
          type={"category"}
          orientation={"left"}
          tickLine={false}
          tick={false}
        >
          <Label value="Conv to Quotes" angle="-90" position="middle" />
        </YAxis>
        <XAxis
          domain={[0, "dataMax+100"]}
          tickLine={false}
          type={"number"}
          xAxisId={0}
          // axisLine={false}
          tick={false}
        />
        <XAxis
          xAxisId="1"
          dataKey="category"
          tickLine={false}
          tickFormatter={formatYAxis}
          allowDuplicatedCategory={false}
        />

        <Tooltip cursor={{fill: 'transparent'}} />
        <Legend />
        <Bar name="Time To Build" dataKey="time" fill="#8884d8" barSize={5}>
          {data.map((singData, entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                singData.time < 400
                  ? "#5b0bbd"
                  : singData.time > 400 && singData.time < 700
                  ? "#8c36f3"
                  : "#b681f8"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
