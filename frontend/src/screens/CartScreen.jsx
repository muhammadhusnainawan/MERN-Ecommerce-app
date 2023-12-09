import React, { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import {
  addToCartAction,
  removeCartProductAction,
} from "../actions/cartActions";
import Message from "../components/shared/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : [1];
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCartAction(id, qty));
    }
  }, [dispatch]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeFromCartHandler = (id) => {
    dispatch(removeCartProductAction(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Your Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is empty ! <Link to={"/"}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid />
                    </Col>
                    <Col md={4}>
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCartAction(
                              item.product,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {Array.from(Array(item.countInStock).keys()).map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col md={7}>
                    <strong>
                      <p>Quantity (Items):</p>
                    </strong>
                  </Col>
                  <Col md={5}>
                    <h4>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col md={7}>
                    <strong>
                      <p>Price (Rs.):</p>
                    </strong>
                  </Col>
                  <Col md={5}>
                    <h4>
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h4>
                  </Col>
                </Row>
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
