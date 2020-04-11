import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import 'tui-chart/dist/tui-chart.min.css';

let tuiChart;
if (typeof window !== 'undefined') tuiChart = require('tui-chart'); 

const basicChartDummy = {
    data: {
        categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
        series: [
            {
                name: 'Budget',
                data: [5000, 3000, 5000, 7000, 6000, 4000],
            },
            {
                name: 'Income',
                data: [8000, 1000, 7000, 2000, 5000, 3000],
            },
        ],
    },
    options: {
        chart: {
            // width: 1140,
            // height: 650,
            title: 'Monthly Revenue',
            format: '1,000',
        },
        yAxis: {
            title: 'Month',
        },
        xAxis: {
            title: 'Amount',
            min: 0,
            max: 9000,
            suffix: '$',
        },
        series: {
            showLabel: true,
        },
    },
};

const Chart = () => {
    const { data, options } = basicChartDummy;
    
    useEffect(() => {
        tuiChart.barChart(document.querySelector('#bar-chart'), data, options);
    }, []);

    return (
        <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div id="bar-chart" />
            </Col>
        </Row>
    );
};

export default Chart;
