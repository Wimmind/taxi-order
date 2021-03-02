import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OrderForm from "./components/OrderForm";
import YandexMap from "./components/YandexMap";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Card>
        <Card.Header as="h4">Детали заказа</Card.Header>
        <Card.Body>
          <OrderForm />
          <Row>
            <Col sm={3}>Подходящий экипаж:</Col>
            <Col sm={4}>Подходящий экипаж:</Col>
          </Row>
          <YandexMap />
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
