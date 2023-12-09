import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ProductsCard from "./ProductsCard";
import { productListAction } from "../actions/productActions";
import Loader from "../components/shared/Spinner"

const HomeScreen = () => {
  // const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;
  // console.log("productsList is", products);
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} md={3}>
                <ProductsCard product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
export default HomeScreen;
