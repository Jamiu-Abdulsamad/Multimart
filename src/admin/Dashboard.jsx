import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../Styles/dashboard.css";
import useGetData from "../hooks/useGetData";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("products");

  return (
    <section>
      <Container>
        <Row>
          <Col className="lg-12 py-3" md='3'>
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>$78790</span>
            </div>
          </Col>
          <Col className="lg-12 py-3" md='3'>
            <div className="order__box">
              <h5>Orders</h5>
              <span>42</span>
            </div>
          </Col>
          <Col className="lg-12 py-3" md='3'>
            <div className="products__box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-12 py-3" md='3'>
            <div className="users__box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
