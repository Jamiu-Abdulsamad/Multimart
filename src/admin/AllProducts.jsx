import React from "react";
import { Container, Row, Col } from "reactstrap";
import {db} from '../firebase.config'
import {doc, deleteDoc} from 'firebase/firestore'
import useGetData from "../hooks/useGetData";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Product deleted successfully')
  }
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { loading ? (
                 <td> <div colSpan='5' className="py-5 text-center fw-bold">Loading....</div></td>
                ) : (
                  productsData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="img"></img>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button onClick={()=>{deleteProduct(item.id)}} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
