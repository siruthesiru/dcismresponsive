import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import './index.scss';

const data = [
    {
        semester: 'Semester 1',
        'Course A': 20,
        'Course B': 15,
        'Course C': 18,
        'Course D': 25,
        'Course E': 12,
        'Course F': 30,
        'Course G': 22,
    },
    {
        semester: 'Semester 2',
        'Course A': 30,
        'Course B': 25,
        'Course C': 28,
        'Course D': 33,
        'Course E': 18,
        'Course F': 35,
        'Course G': 28,
    },
];

const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    'red',
    'blue',
    'green',
    'purple',
];

const courses = Object.keys(data[0]).filter((key) => key !== 'semester');

const BarChartBox = () => {

    return (
        <div className='barChartBox'>
            <h1 className='text-xl font-semibold'>Alumni Report</h1>
            <p>Number of Graduates per semester</p>
            <div className='chart'>
                <ResponsiveContainer width='99%' height='100%'>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey='semester' />
                        <YAxis />
                        <Tooltip />
                        {courses.map((course, index) => (
                            <Area
                                key={course}
                                type='monotone'
                                dataKey={course}
                                stackId='1'
                                stroke={colors[index]}
                                fill={colors[index]}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartBox;
