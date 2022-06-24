import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

export const Chart1 = () => {
    const [data, setData] = useState([
        {
            "city": "10",
            "type": "20",
            "value": 14500
        },
        {
            "city": "10",
            "type": "30",
            "value": 8500
        },
        {
            "city": "10",
            "type": "40",
            "value": 10000
        },
        {
            "city": "10",
            "type": "50",
            "value": 7000
        },
        {
            "city": "60",
            "type": "20",
            "value": 9000
        },
        {
            "city": "60",
            "type": "30",
            "value": 8500
        },
        {
            "city": "60",
            "type": "40",
            "value": 11000
        },
        {
            "city": "60",
            "type": "50",
            "value": 6000
        },
        {
            "city": "70",
            "type": "20",
            "value": 16000
        },
        {
            "city": "70",
            "type": "30",
            "value": 5000
        },
        {
            "city": "70",
            "type": "40",
            "value": 6000
        },
        {
            "city": "70",
            "type": "50",
            "value": 10000
        },
        {
            "city": "80",
            "type": "20",
            "value": 14000
        },
        {
            "city": "80",
            "type": "30",
            "value": 9000
        },
        {
            "city": "80",
            "type": "40",
            "value": 10000
        },
        {
            "city": "80",
            "type": "50",
            "value": 9000
        },
        {
            "city": "90",
            "type": "20",
            "value": 14000
        },
        {
            "city": "90",
            "type": "30",
            "value": 9000
        },
        {
            "city": "90",
            "type": "40",
            "value": 10000
        },
        {
            "city": "90",
            "type": "50",
            "value": 6000
        },
        {
            "city": "100",
            "type": "20",
            "value": 9000
        },
        {
            "city": "100",
            "type": "30",
            "value": 8500
        },
        {
            "city": "100",
            "type": "40",
            "value": 10000
        },
        {
            "city": "100",
            "type": "50",
            "value": 6000
        },
        {
            "city": "110",
            "type": "20",
            "value": 17000
        },
        {
            "city": "110",
            "type": "30",
            "value": 6000
        },
        {
            "city": "110",
            "type": "40",
            "value": 7000
        },
        {
            "city": "110",
            "type": "50",
            "value": 10000
        },
        {
            "city": "120",
            "type": "20",
            "value": 18000
        },
        {
            "city": "120",
            "type": "30",
            "value": 11000
        },
        {
            "city": "120",
            "type": "40",
            "value": 15000
        },
        {
            "city": "120",
            "type": "50",
            "value": 14000
        }
    ]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/PC3daFYjNw/column-data.json')
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: 'true',
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    return <Column {...config} />;
};