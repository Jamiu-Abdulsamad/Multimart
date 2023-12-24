import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(product)

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImg);

      uploadTask.on(
        () => {
          toast.error("images not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              title: title,
              shortDesc: shortDesc,
              description: description,
              category: category,
              price: price,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product added successfully");
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("product not added!!!");
    }
  };

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {loading ? (
                <h4>Loading.....</h4>
              ) : (
                <>
                  <h4 className="mb-5 d-flex justify-content-center align-items-center" >
                    Add Products
                  </h4>
                  <Form className='w-60' style={{ margin: 'auto', width: '60%' }} onSubmit={addProduct}>
                    <FormGroup className="form__group">
                      <span>Product title</span>
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group">
                      <span>Short Description</span>
                      <input
                        type="text"
                        placeholder="lorem..."
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group">
                      <span>Description</span>
                      <input
                        type="text"
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <div className="d-flex align-items-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50 gap-5">
                        <span>Price</span>
                        <input
                          type="number"
                          placeholder="$100"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </FormGroup>

                      <FormGroup className="form__group w-50">
                        <span>Category</span>
                        <select
                          className="p-2 w-100 "
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                            <option value="select">Select category</option>
                          <option value="chair">Chair</option>
                          <option value="mobile">Mobile</option>
                          <option value="sofa">Sofa</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div>
                      <FormGroup className="form__group">
                        <span>Product Image</span>
                        <input
                          type="file"
                          required
                          onChange={(e) => setProductImg(e.target.files[0])}
                        />
                      </FormGroup>
                    </div>

                    <button className="buy__btn" type="submit">
                      Add Product
                    </button>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AddProducts;
