import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

export default class LineChart extends Component {
  state = {
    salesVolume: [5, 20, 36, 10, 10, 20],
    stocks: [6, 10, 16, 30, 11, 8]
  };

  update = () => {
      this.setState(state => ({
          salesVolume: state.salesVolume.map(sale => sale + 1),
          stocks: state.stocks.map(stock => stock - 1)
      }));
  };

  getOption = (salesVolume, stocks) => {
    return {
      title: {
        text: "ECharts"
      },
      tooltip: {},
      legend: {
        data: ["Sales Volume", "Stock"]
      },
      xAxis: {
        data: ["Appliances", "Books", "Computers", "Colthes", "Foods", "Drinks"]
      },
      yAxis: {},
      series: [
        {
          name: "Sales Volume",
          type: "line",
          data: salesVolume
        },
        {
          name: "Stock",
          type: "line",
          data: stocks
        }
      ]
    };
  };

  render() {
    const { salesVolume, stocks } = this.state;

    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            Update
          </Button>
        </Card>
        <Card title="Line Chart">
          <ReactEcharts option={this.getOption(salesVolume, stocks)} />
        </Card>
      </div>
    );
  }
}
