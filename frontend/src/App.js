import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <Container style={{minHeight: "80vh"}}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/payments" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
