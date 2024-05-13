import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

const ChanceToBuyChart = ({ percentage }) => {
    const COLORS = ['#0088FE','#E5E5E5'];
    const data = [
        { name: 'Progress', value: percentage },
        { name: 'Remaining', value: 100 - percentage }
    ];

    // Function to determine label based on percentage
    const getLabel = (percentage) => {
        if (percentage == 100) {
            COLORS[0]='#6FD4FF'
            return 'Already Bought';
        } else if (percentage >= 50) {
            COLORS[0]='#6C70FE'
            return 'High';
        } else {
            COLORS[0]='#D06FFF'
            return 'Low';
        }
    };

    // Determine label text and style based on percentage
    const labelValue = `${percentage===100?'':percentage+'%'}`;
    const labelText = getLabel(percentage);
    let labelFill = 'green';
    if (labelText === 'High') {
        labelFill = '#4E7ECE'; // or any other color
    } else if (labelText === 'Low') {
        labelFill = 'red'; // or any other color
    }

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                startAngle={180}
                endAngle={0}
                innerRadius={115}
                outerRadius={130}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                // cornerRadius={7}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={7} />
                ))}
                <Label value={labelValue} position="center" fill={labelFill} fontSize={16} />
                <Label value={labelText} position="center" fill={labelFill} fontSize={20} dy={-20} />
            </Pie>
        </PieChart>
    );
}

export default ChanceToBuyChart;
