import React, { Component } from "react";
import { Card, DatePicker } from "antd";
import ReactEcharts from "echarts-for-react";

import "./home.less";

const { RangePicker } = DatePicker;

export default class Home extends Component {
  getOption = () => {
    return {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "views",
          type: "bar",
          barWidth: "60%",
          data: [10, 22, 40, 32, 120, 80, 260, 200, 170, 300, 250, 320]
        }
      ]
    };
  };

  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  onOk = value => {
    console.log("onOk: ", value);
  };

  render() {
    const extra = (
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        onChange={this.onChange}
        onOk={this.onOk}
      />
    );

    return (
      <Card title="Pageviews" extra={extra}>
        <ReactEcharts option={this.getOption()} />
      </Card>
    );
  }
}
