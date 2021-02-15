import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface OrderFormProps {

}

const OrderForm: React.FC = () => {
  const [address, setAddress] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleBlur = () => {
    if (address.length) {

    }
  }

  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalAddress">
        <Form.Label column sm={2}>
          Откуда
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="a"
            placeholder="Пушкинская, 144"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default OrderForm;
