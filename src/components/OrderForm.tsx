import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { setNewAddress, setInvalidAddressMessage } from "../store/actions/addressActions";

const OrderForm: React.FC = () => {
  const [addressField, setAddressField] = useState<string>("");
  const {address, coords, isValidAddress, invalidMessage} = useTypedSelector(state => state.address)   

  const dispatch = useDispatch();
  const setInvalidMessage = (message: string) => {
    dispatch(setInvalidAddressMessage(message));
  };
  const setAddress = (address: string) => {
    dispatch(setNewAddress(address));
  };

  useEffect(() => {
    setAddressField(address);
  }, [address]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setAddressField(currentValue);
  };

  const handleBlur = () => {
    setAddress(addressField);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setAddress(addressField);
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!addressField.length) {
      setInvalidMessage('Поле обязательно для заполнения)))');
    }
    if (isValidAddress) {
      // const order = {
      //   source_time: Date.now(),
      //   address: address,
      //   lat: coords[0],
      //   lon: coords[1],
      // }
    }
  };

  return (
    <Form>
      <Form.Row>
        <Form.Label column sm={2}>
          Откуда
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="a"
            placeholder="Улица, номер дома"
            onBlur={handleBlur}
            onChange={handleChange}
            value={addressField}
            onKeyPress={keyPressHandler}
            className={"has-error"}
            isInvalid={isValidAddress ? false : true}
          />
          {!isValidAddress && (
            <Form.Control.Feedback type="invalid">
              {invalidMessage}
            </Form.Control.Feedback>
          )}
        </Col>
        <Col sm={1}>
          <Button onClick={handleSubmit} type="submit" disabled={isValidAddress ? false : true}>Заказать</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default OrderForm;
