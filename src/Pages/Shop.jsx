import React from "react";
import { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../Styles/shop.css";
import products from "../assets/data/products";
import ProductList from "../components/UI/ProductList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filteredValue = e.target.value;
    if (
      filteredValue === "sofa" ||
      filteredValue === "chair" ||
      filteredValue === "wireless" ||
      filteredValue === "watch" ||
      filteredValue === "mobile"
    ) {
      const filteredProducts = products.filter(
        (item) => item.category === filteredValue
      );
      setProductsData(filteredProducts);
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };
  return (
    <>
      <Helmet title="Shop">
        <CommonSection title="Products" />
      </Helmet>
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>

            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="economical">Economical</option>
                  <option value="Classic">Classic</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="12">
              <div className="filter__widget">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="pt-5">
          <Container>
            <Row>
              {productsData.length === 0 ? (
                <h1 className="text-center fs-4">No Products Found!!!</h1>
              ) : (
                <ProductList data={productsData} />
              )}
            </Row>
          </Container>
        </section>
      </section>
    </>
  );
};

export default Shop;
