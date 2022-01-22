import logo from './logo.svg';
import './App.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Sector, Cell } from 'recharts';
import { useState } from 'react';

const data = [
    {
        name: '10',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '11',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '12',
        uv: 2000,
        pv: 9800,
        amt: 4290,
    },
    {
        name: '13',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '14',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '15',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '16',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, uv } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill="#8884d8"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill="#82ca9d"
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#82ca9d" fill="none" />
            <circle cx={ex} cy={ey} r={2} fill="#82ca9d" stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`UV ${uv}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

function Rechart() {
    const [activeIndex, setactiveIndex] = useState(0)

    const onPieEnter = (_, index) => {
        setactiveIndex(index)
    }
    return (
        <div>
            <LineChart
                width={1000}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="3 4 5 2" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                <Line type="monotone" dataKey="amt" stroke="#f72fdd" strokeDasharray="3 4 5 2" />
            </LineChart>

            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                <Bar dataKey="amt" fill="#f72fdd" />
            </BarChart>

            <PieChart width={600} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="uv"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>

            <PieChart width={600} height={400} onMouseEnter={onPieEnter}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="uv"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default Rechart;
