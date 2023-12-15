import React from "react";
import "../Styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
// import tdImg from "../assets/images/arm-chair-01.jpg";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <div>
                  <h4 className="fs-4 text-center">No item here yet!!! </h4>
                  <Link to="/shop">Continue Shopping?</Link>
                </div>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4">${totalAmount}</span>
                </h6>

                <p className="fs-6 mt-3">
                  Taxes and Shipping will be calculated in checkout
                </p>
              </div>
              <button className="buy__btn w-100 mt-3">
                <Link to="/checkout">Checkout</Link>
              </button>
              <button className="buy__btn w-100 mt-3">
                <Link to="/shop">Continue Shopping</Link>
              </button>
              {cartItems.length > 0 && <button className="buy__btn" onClick={handleClearCart}>
                clear cart
              </button>}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.removeItem(item.id));
    toast.success("item removed from cart");
  };

  return (
    <>
      <tr>
        <td>
          <img src={item.imgUrl} alt="td-img" />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td style={{ paddingLeft: "18px" }}>{item.quantity}</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            className="ri-delete-bin-line"
            onClick={deleteProduct}
          ></motion.i>
        </td>
      </tr>
    </>
  );
};

export default Cart;
