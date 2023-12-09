import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { paymentMethodAction } from "../actions/cartActions";
import CheckoutSteps from "../components/shared/CheckoutSteps";
const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;
  if (!shippingAdress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentMethodAction(paymentMethod));
    navigate("/placeorder")
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Label as="legend">Select Payment Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="Paypal or Credit Card"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Col>
        <Button className="mt-4" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
