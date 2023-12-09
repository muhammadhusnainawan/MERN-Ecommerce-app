import React from "react";
import Card from "react-bootstrap/Card";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const ProductsCard = ({ product }) => {
  return (
    <>
      <Card
        className="my-3 p-3 rounded"
        //   style={{ width: "18rem" }}
      >
        <Link to={`/products/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>

        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Title>
            <strong>${product.price}</strong>
          </Card.Title>
          <Card.Text as="div">
            <strong>
              <Rating value={product.rating} text={product.numReviews} />
            </strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductsCard;
