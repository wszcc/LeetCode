import React,{useEffect} from 'react'
import * as echarts from 'echarts'
import './index.scss'


const Correct = () => {
    useEffect(() => {
        var myChart = echarts.init(document.getElementById('pro-correct'));
        myChart.setOption({
            series: [{
                name: "Indicator",
                type: "gauge",
                detail: {
                  formatter: "{value}%",
                  show: true,
                  offsetCenter: ["0%", "-10%"],
                  color: '#262626',
                  fontSize: 20,
                  fontWeight: 'normal'
                },
                data: [{
                  value: 70,
                  name: "提交通过率"
                }],
                radius: "90%",
                startAngle: 90,
                splitNumber: 10,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width:3
                  }
                },
                progress: {
                  show: true,
                  width:3,
                  roundCap:true,
                  itemStyle: {
                    color: "rgba(45, 181, 93,1)"
                  }
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                title: {
                  show: true,
                  color: '#3C3C434D',
                  fontSize: 12,
                  offsetCenter: ["0", "30%"]
                },
                center: ["50%", "50%"],
                endAngle: -270,
                clockwise: false
              }]
        })
    })

    return (
        <div id="pro-correct"></div>
    )
}

export default Correct