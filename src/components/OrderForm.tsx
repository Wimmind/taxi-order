import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type OrderFormProps = {
  getNewAddress(address: string): void;
};

const OrderForm: React.FC<OrderFormProps> = ({ getNewAddress }) => {
  const [addressField, setAddressField] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAddressField(event.target.value);
  };

  const handleBlur = () => {
    getNewAddress(addressField);
  };

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
