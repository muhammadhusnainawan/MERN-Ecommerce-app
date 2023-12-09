import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormConatiner = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col md={6} xs={12}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormConatiner;
