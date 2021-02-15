import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OrderForm from "./components/OrderForm";
import YandexMap from "./components/YandexMap";

import { Coords } from "./interfaces";

const App: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({ lat: 56.8498, long: 53.2045 });

  return (
    <div className="wrapper">
      <Card>
        <Card.Header as="h4">Детали заказа</Card.Header>
        <Card.Body>
          <OrderForm />
          <Row>
            <Col>Подходящий экипаж:</Col>
          </Row>
          <YandexMap coords={coords} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
