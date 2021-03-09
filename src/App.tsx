import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OrderForm from "./components/OrderForm";
import YandexMap from "./components/YandexMap";
import CrewList from "./components/CrewList";
import SuitableCrew from "./components/SuitableCrew";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Card>
        <Card.Header as="h4" className="bg-secondary text-white">Детали заказа</Card.Header>
        <Card.Body>
          <OrderForm />
          <Row className={"card-element"}>
            <Col sm={2}>Подходящий экипаж:</Col>
            <Col sm={4}>
              <SuitableCrew />
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
