import React,{useEffect} from 'react'
import * as echarts from 'echarts'
import './index.scss'


const DataEX = () => {
    useEffect(() => {
        var myChart = echarts.init(document.getElementById('pro-main'));
        myChart.setOption({
            radar: [
                {
                    indicator: [
                        { text: '数据结构' },
                        { text: '算法' },
                        { text: '基础架构' },
                        { text: '设计' },
                        
                    ],
                    center: ['50%', '50%'],
                    radius: 45,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#3C3C4399'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgb(224, 244, 231)'],
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(170, 225, 189)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgb(224, 244, 231)'
                        }
                    }
                },
            ],
            grid: {
                left: "16%"
              },
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    symbol: "none",
                    emphasis: {
                        lineStyle: {
                            width: 4
                        },
                        focus: 'none',
                    },
                    data: [
                        {
                            value: [10, 20, 0.30, -100],
                            name: '图二',
                            areaStyle: {
                                color: 'rgba(198, 235, 211,0.9)',
                                opacity:0.5,
                        
                            }
                        }
                    ],
                     itemStyle: {
                      color: "rgba(45, 181, 93)"
                    },
                    animation: true
                },
               
            ]
        });
    })

    return (
        <div id="pro-main"></div>
    )
}

export default DataEX