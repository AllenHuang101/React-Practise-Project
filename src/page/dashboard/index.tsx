import {
  DollarOutlined,
  LaptopOutlined,
  RadarChartOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import "./index.scss";

function Dashboard() {
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
    </div>
  );
}

export default Dashboard;
