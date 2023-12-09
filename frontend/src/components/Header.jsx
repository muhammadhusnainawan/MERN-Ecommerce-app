import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { logoutAction } from "../actions/userAction";
import Message from "./shared/Message";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logoutAction());
  };
  return (
    <>
      <Navbar expand="lg" className="bg-dark" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">Online Shop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link href="#home">
                  <i className="fa-solid fa-cart-shopping"></i>
                  &nbsp; Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="#link">
                    <i className="fa-solid fa-user"></i>
                    &nbsp; Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
