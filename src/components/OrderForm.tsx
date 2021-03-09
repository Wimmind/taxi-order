import React, { useState, useEffect } from "react";

import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { makeOrder } from "../API";

const OrderForm: React.FC = () => {
  const [addressField, setAddressField] = useState<string>("");
  const { address, coords, isValidAddress, invalidMessage } = useTypedSelector(
    (state) => state.address
  );
  const { crewsInfo } = useTypedSelector((state) => state.order);
  const { setAddress, setInvalidAddressMessage } = useActions();

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
      setInvalidAddressMessage("Поле обязательно для заполнения)))");
    }
    if (isValidAddress) {
      makeOrder({
        source_time: Date.now(),
        address: address,
        coords: coords,
        crew_id: crewsInfo[0].crew_id,
      });
    }
  };

  return (
    <Form className={"card-element"}>
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
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={isValidAddress ? false : true}
          >
            Заказать
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default OrderForm;
