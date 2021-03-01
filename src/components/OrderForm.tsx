import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { AddressState } from "../reducer";
import { setNewAddressAction } from "../actions";

const OrderForm: React.FC = () => {
  const [addressField, setAddressField] = useState<string>("");
  const address = useSelector<AddressState, AddressState["address"]>(
    (state) => state.address
  );

  useEffect(() => {
    setAddressField(address);
  }, [address]);

  const dispatch = useDispatch();

  const setNewAddress = (address: string) => {
    dispatch(setNewAddressAction(address));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setAddressField(currentValue);
  };

  const handleBlur = () => {
    setNewAddress(addressField);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setNewAddress(addressField);
    }
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
            placeholder="Улица, номер дома"
            onBlur={handleBlur}
            onChange={handleChange}
            value={addressField}
            onKeyPress={keyPressHandler}
          />
        </Col>
      </Form.Group>
    </Form>
  );
};

export default OrderForm;
