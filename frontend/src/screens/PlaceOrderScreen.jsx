import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAction } from "../actions/orderActions";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Message from "../components/shared/Message";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const createOrder = useSelector((state) => state.orderCreate);
  const { success, orderCreate, error } = createOrder;
  // console.log("order id", orderCreate._id);
  console.log("success is",success)

  const addToDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemPrice = addToDecimal(
    cart.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );
  cart.shippingPrice = addToDecimal(cart.itemPrice > 500 ? 50 : 0);
  cart.taxPrice = addToDecimal(Number(cart.itemPrice * 0.16).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const placeOrderHandler = () => {
    dispatch(
      addOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAdress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
    useEffect(() => {
      if (success) {
        navigate(`/order/${orderCreate._id}`);
      }
    }, [success]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  Address:
                  {cart.shippingAdress.address}&nbsp;
                  {cart.shippingAdress.city}&nbsp;
                  {cart.shippingAdress.postalCode}&nbsp;
                  {cart.shippingAdress.country}&nbsp;
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Item</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, ind) => (
                    <ListGroup.Item key={ind}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={5}>
                          {item.qty} X {item.price} = {item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{cart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>{cart.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total Price</Col>
                  <Col>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
