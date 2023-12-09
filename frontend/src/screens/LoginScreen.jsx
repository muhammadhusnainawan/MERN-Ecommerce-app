import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/FormConatiner";
import { Row, Col, Form, FormLabel, Button } from "react-bootstrap";
import { loginAction } from "../actions/userAction";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Spinner";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(loginAction(email, password));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <FormContainer>
        <h1>SIGN IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <FormLabel>Email Address</FormLabel>
            <Form.Control
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <FormLabel>Password</FormLabel>
            <Form.Control
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-2" type="submit" variant="primary">
            SIGN IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ?
            <Link to="/register">
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
export default LoginScreen;
