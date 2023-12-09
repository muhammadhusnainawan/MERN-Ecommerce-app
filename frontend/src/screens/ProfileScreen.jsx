import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction, userUpdateAction } from "../actions/userAction";
import { Row, Col, Form, Button } from "react-bootstrap";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //   console.log("userinfo is", userInfo);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  console.log("user in profile screen is", user);

  useEffect(() => {
    if (!userInfo) {
      naviagte("/login");
    } else if (!user.name) {
      dispatch(userDetailsAction("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [naviagte, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateAction({ id: user._id, name, email, password }));
    setName("")
    setEmail("")
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                placeholder="Enter Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-2" type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ProfileScreen;
