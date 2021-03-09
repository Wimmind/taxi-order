import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import carIcon from "../img/taxi-solid.svg";

const SuitableCrew: React.FC = () => {
  const { crewsInfo } = useTypedSelector((state) => state.order);

  return (
    <>
      {crewsInfo.length ? (
        <ListGroup.Item className="bg-warning text-dark rounded">
          <Row>
            <Col sm={2}>
              <img alt="" src={carIcon} />
            </Col>
            <Col sm={4}>
              <Row>
                {crewsInfo[0].car_mark} {crewsInfo[0].car_model}
              </Row>
              <Row>{crewsInfo[0].car_color}</Row>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={3} className="border border-secondary rounded">
              {crewsInfo[0].car_number}
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
    </>
  );
};

export default SuitableCrew;
