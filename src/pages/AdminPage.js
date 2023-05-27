import Layout from '../components/Layout'
import React, { useState, useEffect } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import fireDb from '../fireConfig';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "../stylesheets/layout.css";


function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    description:"",
    
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getdata()
  }, []);

  async function getdata() {

    try {
      setLoading(true)
      const users = await getDocs(collection(fireDb, "products"));
      const productsArray = [];
      users.forEach((doc) => {

        const obj = {
          id: doc.id,
          ...doc.data(),
        }
        productsArray.push(obj)
        setLoading(false)
      });

      setProducts(productsArray)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrdersData()
  }, []);

  async function getOrdersData() {

    try {
      setLoading(true)
      const result = await getDocs(collection(fireDb, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {


        ordersArray.push(doc.data());
        setLoading(false)
      });
      console.log(ordersArray);

      setOrders(ordersArray)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  }
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDb, "products", product.id), product)

      handleClose()
      toast.success('Product updated successfully')
      window.location.reload()

    } catch (error) {
      toast.error('Product update failed')
      setLoading(false)


    }
  }

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDb, "products"), product)

      handleClose()
      toast.success('Product added successfully')
      window.location.reload()

    } catch (error) {
      toast.error('Prodcut add failed')
      setLoading(false)
    }
  }

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDb, "products", item.id))
      toast.success('Product deleted successfully')
      getdata()

    } catch {
      toast.error('Product delete failed')
      setLoading(false)

    }
  }


  const addHandler = () => {
    setAdd(true)
    handleShow()
  }
  return (
    <Layout loading={loading}>
      <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products List</h3>
            <button onClick={addHandler}>ADD Products</button>
          </div>
          <div className="cart-items-container"
                style={{ height: "400px", overflowY: "scroll" }}>
          <table className='table mt-3'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {

                return <tr>
                  <td><img src={item.imageURL} height="80" width='80' /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><FaTrash color="blue" size={20} onClick={() => { deleteProduct(item) }} /></td>
                  <td><FaEdit onClick={() => editHandler(item)}
                    color="blue"
                    size={20} /></td>
                </tr>
              })}
            </tbody>
          </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{add == true ? 'Add a product' : 'Edit Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input type="text"
                  value={product.name}
                  placeholder="name"
                  className="form-control"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })} />

                <input type="text"
                  value={product.imageURL}
                  placeholder="img url"
                  className="form-control"
                  onChange={(e) => setProduct({ ...product, imageURL: e.target.value })} />

                <input type="number"
                  value={product.price}
                  placeholder="price"
                  className="form-control"
                  onChange={(e) =>
                    setProduct({ ...product, price: parseInt(e.target.value) })} />

                <input type="text"
                  value={product.description}
                  placeholder="description"
                  className="form-control"
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value})} />
                <hr />

              </div>

            </Modal.Body>
            <Modal.Footer>
              <button>
                Close
              </button>
              {add ? (<button onClick={addProduct}>
                SAVE
              </button>) : (<button onClick={updateProduct}>SAVE</button>)}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="order" title="Orders">
          {orders.map((order) => {
            return (   
            <table className="table mt-3 order">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody> 
                {order.cartItems.map((item) => {
                  return (<tr>
                    <td><img src={item.imageURL} height="80" width='80' /></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
            )
          })}
        </Tab>
        <Tab eventKey="contact" title="Users" enabled>

        </Tab>
      </Tabs>


    </Layout>
  )
}

export default AdminPage