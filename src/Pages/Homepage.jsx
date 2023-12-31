import React from "react";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Styles/Homepage.css";
import homePageImage from "../assets/images/homePage-img.png";
import Services from "../Services/Services";
// import products from "../assets/data/products";
import ProductList from "../components/UI/ProductList";
import Clock from "../components/UI/Clock";
import counterImg from "../assets/images/counter-timer-img.png";
import useGetData from "../hooks/useGetData";

const Homepage = () => {

  const {data:products, loading} = useGetData('products')
  const year = new Date().getFullYear();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSales, setBestSales] = useState([[]]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );
    const filteredBestSales = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filteredPopularProducts = products.filter((item) => item.category ==='watch');

    setTrendingProducts(filteredTrendingProducts);
    setBestSales(filteredBestSales);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts)
  }, [products]);
  

  return (
    <div>
      <Helmet title={"Home"}>
        <section className="hero__section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <p className="hero__subtitle">Trending product in {year}</p>
                  <h2>Make Your Interior More Minimalistic & Modern</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <motion.button whileTap={{ scale: 1.1 }} className="buy__btn">
                    <Link to="/shop">shop now</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img
                    src={homePageImage}
                    alt="hero-img"
                    style={{
                      filter:
                        "drop-shadow(15px 5px 2px rgba(192, 192, 192, 0.5)) ", // Add your drop-shadow filter here
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />
        <section className="trending__products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Trending Products</h2>
              </Col>

              {
                loading? <h5 className="fw-bold">Loading......</h5> :
                <ProductList data={trendingProducts} />
              }
             
            </Row>
          </Container>
        </section>

        <section className="best__sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">Best Sales</h2>
              </Col>
              {
                loading? <h5 className="fw-bold">Loading......</h5> :
                <ProductList data={bestSales} />
              }
            </Row>
          </Container>
        </section>

        <section className="timer__count">
          <Container>
            <Row>
              <Col lg="6" md="12" className="count__down-col">
                <div className="clock__top-content">
                  <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                  <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
                </div>
                
                <Clock />

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn store__btn"
                >
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
              </Col>
              <Col lg="6" md="12" className="text-end counter__img">
                <img src={counterImg} alt="counter-img" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="new__arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section__title">New Arrivals</h2>
              </Col>
              {
                loading? <h5 className="fw-bold">Loading......</h5> :
                <ProductList data={mobileProducts} />
              }
              {
                loading? <h5 className="fw-bold">Loading......</h5> :
                <ProductList data={wirelessProducts} />
              }
            </Row>
          </Container>
        </section>

        <section className="popular__category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section__title">Popular in category</h2>
              </Col>
              {
                loading? <h5 className="fw-bold">Loading......</h5> :
                <ProductList data={popularProducts} />
              }
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Homepage;
