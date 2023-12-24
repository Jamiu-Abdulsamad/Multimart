import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "../Styles/checkout.css";

const Checkout = () => {
  const publicKey = "pk_test_0bbe79662c8ca5f40d7352676fcb5eca57689fe1";
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQty = useSelector((state) => state.cart.totalQuantity);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const handlePayment = () => {
    const resetForm = () => {
      setEmail("");
      setName("");
      setPhone("");
      setAddress("");
      setCity("");
      setPostalcode("");
      setCountry("");
    };

    resetForm();
    console.log("handling payment");
    dispatch(cartActions.clearCart());
    toast.success("Payment successful");
  };

  const componentProps = {
    email,
    amount: totalAmount * 100,
    metadata: {
      name,
      phone,
      city,
      postalcode,
      country,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => handlePayment(),
    onClose: () => toast.success("Payment cancelled"),
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4">Billing Information</h6>
              <Form className="form">
                <FormGroup className="form__group">
                  <input
                    id="name"
                    value={name}
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="email"
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="phone"
                    value={phone}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="address"
                    value={address}
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="city"
                    value={city}
                    type="text"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="postalcode"
                    value={postalcode}
                    type="text"
                    placeholder="Postal Code"
                    onChange={(e) => setPostalcode(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    id="country"
                    value={country}
                    type="text"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    {" "}
                    Shipping fee:
                    <br />
                    (free shipping)
                  </span>{" "}
                  <span>$0</span>
                </h6>
                <h6>Free shipping</h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <PaystackButton
                  className="buy__btn auth__btn w-100"
                  {...componentProps}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
