import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { AddressState } from "../addressReducer";
import { setNewAddressAction, setInvalidAddressMessage } from "../addressActions";

const OrderForm: React.FC = () => {
  const [addressField, setAddressField] = useState<string>("");
  const address = useSelector<AddressState, AddressState["address"]>(
    (state) => state.address
  );
  const isValidAddress = useSelector<AddressState,AddressState["isValidAddress"]>((state) => state.isValidAddress);
  const invalidMessage = useSelector<AddressState,AddressState["invalidMessage"]>((state) => state.invalidMessage);

  const setInvalidMessage = (message: string) => {
    dispatch(setInvalidAddressMessage(message));
  };

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

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!addressField.length) {
      setInvalidMessage('Поле обязательно для заполнения)))');
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
          <Button onClick={handleSubmit} type="submit">Заказать</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default OrderForm;
