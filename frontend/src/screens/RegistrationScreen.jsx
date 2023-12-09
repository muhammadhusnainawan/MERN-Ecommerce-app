import React, { useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormConatiner from "../components/shared/FormConatiner";
import {Row, Col, Form, FormLabel, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../actions/userAction";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Spinner";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, userReg } = userRegistration;
  const redirect = location.search ? location.search.split("=")[1] : "/";


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password not matched");
    } else {
      dispatch(userRegisterAction(name, email, password));
      setName("");
      setEmail("");
      setPassword("");
      navigate(redirect);
    }
  };

  return (
    <>
      <FormConatiner>
        <h1>Register User</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <FormLabel>Name</FormLabel>
            <Form.Control
              placeholder="Enter Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <FormLabel>Email Adress</FormLabel>
            <Form.Control
              placeholder="Enter Email Adress"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <FormLabel>Password</FormLabel>
            <Form.Control
              placeholder="Enter Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Form.Control
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        
        <Row>
          <Col>
            Already User ?
            <Link to="/login">
              Sign In
            </Link>
          </Col>
        </Row>
      </FormConatiner>
    </>
  );
};
export default RegistrationScreen;
