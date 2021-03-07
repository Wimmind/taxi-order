import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import carIcon from "./img/taxi-solid.svg";

import OrderForm from "./components/OrderForm";
import YandexMap from "./components/YandexMap";
import CrewList from "./components/CrewList";

import { orderInfoType, crewInfoType } from "./types";
import crews_info from "./crews";

const App: React.FC = () => {
  const [crewsInfo, setCrewsInfo] = useState<crewInfoType[]>([]);

  const setNewCrewsInfo = (order: orderInfoType) => {
    const newCrewsInfo = crews_info.map((crew: crewInfoType, index: number) => {
      crew.coords[0] = order.coords[0] + index + 1;
      crew.coords[1] = order.coords[1] + index + 1;
      return crew;
    });
    //setCrewsInfo(newCrewsInfo);
  };

  return (
    <div className="wrapper">
      <Card>
        <Card.Header as="h4">Детали заказа</Card.Header>
        <Card.Body>
          <OrderForm />
          <Row>
            <Col sm={3}>Подходящий экипаж:</Col>
            <Col sm={4}>
              <Row>
                <Col sm={2}>
                  <img alt="" src={carIcon} />
                </Col>
                <Col sm={8}></Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <YandexMap />
            </Col>
            <Col sm={4}>
              <CrewList />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
