import {
  DollarOutlined,
  LaptopOutlined,
  RadarChartOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import ReactEChart from "echarts-for-react";
import { useEffect, useState } from "react";
import { getEnergyData } from "../../api/dashboard";

import "./index.scss";



function Dashboard() {
  const initalOption = {
    title: {
      text: '当日能源消耗'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    grid: {
      left: '%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0：00', '4：00', '8：00', '12：00', '16：00', '20：00', '24：00']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  };

  const [data, setData] = useState(initalOption);


  useEffect(() => {
    const loadData = async () => {
      const { data: apiData } = await getEnergyData();
      const dataList = apiData.map((item: any) => ({
        name: item.name,
        data: item.data,
        type: "line",
        stack: "Total",
      }));

      const updatedOption = {
        ...data,
        legend: {
          data: dataList.map((item: any) => item.name)
        },
        series: dataList,
      };

      setData(updatedOption);
    }

    loadData();
  }, []);
  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>13479</h2>
              <p>園區總面積(平方米)</p>
            </div>
            <div className="fr">
              <RadarChartOutlined className="icon" />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>8635</h2>
              <p>總租賃面積(平方米)</p>
            </div>
            <div className="fr">
              <SnippetsOutlined className="icon" style={{ color: "#81c452" }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>38764</h2>
              <p>園區總產值(萬元)</p>
            </div>
            <div className="fr">
              <DollarOutlined className="icon" style={{ color: "#62c9cb" }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="clearfix">
            <div className="fl area">
              <h2>13479</h2>
              <p>入住企業總數(家)</p>
            </div>
            <div className="fr">
              <LaptopOutlined className="icon" style={{ color: "#e49362" }} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt">
        <Col span={12}>
          <Card title="能源消耗情况">
            <ReactEChart option={data}></ReactEChart>
          </Card>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
}

export default Dashboard;
