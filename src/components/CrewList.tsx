import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import carIcon from "../img/taxi-solid.svg";

const CrewList: React.FC = () => {
  const { crewsInfo } = useTypedSelector((state) => state.order);

  return (
    <ListGroup>
      {crewsInfo.map((crew) => (
        <ListGroup.Item key={crew.crew_id} className="bg-warning text-dark">
          <Row>
            <Col sm={2}>
              <img alt="" src={carIcon} />
            </Col>
            <Col sm={7}>
              <Row>
                {crew.car_mark} {crew.car_model}
              </Row>
              <Row>{crew.car_color}</Row>
            </Col>
            <Col sm={3}>{crew.distance} м</Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CrewList;
