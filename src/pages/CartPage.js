import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import fireDb from "../fireConfig";
import { toast } from "react-toastify";


function CartPage() {
    const { cartItems } = useSelector((state) => state.cartReducer);
    const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp = temp + cartItem.price;
        });
        setTotalAmount(temp);
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const deleteFromCart = (product) => {
        dispatch({ type: "DELETE_FROM_CART", payload: product });
    };

    const placeOrder = async () => {
        const addressInfo = {
            name,
            address,
            pincode,
            phonenumber,
        };
        console.log(addressInfo);

        const orderInfo = {
            cartItems,
            addressInfo,
            email: JSON.parse(localStorage.getItem("currentUser")).user.email,
            userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
        };
        try {
            setLoading(true);
            const result = addDoc(collection(fireDb, "orders"), orderInfo);
            setLoading(false);
            toast.success("Order placed successfully");
            handleClose();
        } catch (error) {
            toast.error("Order failed");
        }
    };
    return (
        <Layout loading={loading}>
            <div className="cart-items-container"
                style={{ height: "400px", overflowY: "scroll" }}>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            return (
                                <tr>
                                    <td>
                                        <img
                                            src={item.imageURL}
                                            height="80"
                                            width="80"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <FaTrash
                                            onClick={() => deleteFromCart(item)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-end">
                <h2 className="total-amount">Total Amount = {totalAmount} $</h2>
            </div>
            <div className="d-flex justify-content-end mt-3">
                <button onClick={handleShow}>PLACE ORDER</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your address </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="register-form">
                        <h2>Register</h2>
                        <hr />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <textarea
                            className="form-control"
                            rows={3}
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        <input
                            className="form-control"
                            placeholder="pincode"
                            type="number"
                            value={pincode}
                            onChange={(e) => {
                                setPincode(e.target.value);
                            }}
                        />
                        <input
                            className="form-control"
                            placeholder="phonenumber"
                            type="number"
                            value={phonenumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />

                        <hr />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                    <button onClick={placeOrder}>ORDER</button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
}

export default CartPage;
