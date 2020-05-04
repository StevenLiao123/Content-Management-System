import React, { Component } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

export default class PieChart extends Component {

    getOption = () => {
        return {
            title: {
                text: 'Sales Volume',
                subtext: 'For Test',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ["Appliances", "Books", "Computers", "Colthes", "Foods"]
            },
            series: [
                {
                    name: 'Categories',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335, name: 'Appliances'},
                        {value: 310, name: 'Books'},
                        {value: 234, name: 'Computers'},
                        {value: 135, name: 'Colthes'},
                        {value: 1548, name: 'Foods'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }

  getOption2 = () => {
    return {
      backgroundColor: "#2c343c",

      title: {
        text: "Customized Pie",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "Stock",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "Appliances" },
            { value: 310, name: "Books" },
            { value: 274, name: "Computers" },
            { value: 235, name: "Colthes" },
            { value: 400, name: "Foods" }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <Card title="Pie Chart 1">
          <ReactEcharts option={this.getOption()} style={{ height: 300 }} />
        </Card>
        <Card title="Pie Chart 2">
          <ReactEcharts option={this.getOption2()} style={{ height: 300 }} />
        </Card>
      </div>
    );
  }
}
