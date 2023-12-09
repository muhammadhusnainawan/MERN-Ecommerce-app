import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { productDetailsAction } from "../actions/productActions";
import Loader from "../components/shared/Spinner";
import Message from "../components/shared/Message";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const product = Products.find((product) => {
  //   return product._id === id;
  // });
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const [qty, setQty] = useState(1);
  useEffect(() => {
    dispatch(productDetailsAction(id));
  }, [dispatch]);

  const addToCartHandler = () => {
    if (product.countInStock > 0) {
      return navigate(`/cart/${id}?qty=${qty}`);
    } else {
      return <Message>Out of Stock</Message>;
    }
  };
  return (
    <>
      <Link to="/" className="btn btn-light">
        <i className="fas fa-arrow-left"></i>
        &nbsp; GO BACK
      </Link>

      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup style={{ textAlign: "justify" }} variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews `}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${product.price}</ListGroupItem>
              <ListGroupItem>{product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Row>
              <Col>Status: </Col>
              <Col>
                {product.countInStock > 0 ? "Stock Availabale" : "Out of Stock"}
              </Col>
            </Row>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty:</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {Array.from(Array(product.countInStock).keys()).map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button
                className="col-12 my-4"
                type="button"
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </ListGroupItem>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ProductDetails;
