import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import FormContainer from "../components/shared/FormConatiner";
import { Form, Button } from "react-bootstrap";
import { shippingAdressAction } from "../actions/cartActions";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;
  const [address, setAddress] = useState(shippingAdress.address);
  const [city, setCity] = useState(shippingAdress.city);
  const [postalCode, setPostalCode] = useState(shippingAdress.postalCode);
  const [country, setCountry] = useState(shippingAdress.country);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(shippingAdressAction({ address, city, postalCode, country }));
    navigate("/payments")
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-4" type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
