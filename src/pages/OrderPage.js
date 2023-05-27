import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDb from '../fireConfig';
import Layout from '../components/Layout';

function OrderPage() {
    const [orders, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
    useEffect(() => {
        getdata()
    }, []);

    async function getdata() {

        try {
            setLoading(true)
            const result = await getDocs(collection(fireDb, "orders"));
            const ordersArray = [];
            result.forEach((doc) => {


                ordersArray.push(doc.data());
                setLoading(false)
            });
            console.log(ordersArray)

            setProducts(ordersArray)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
        return (
        <Layout loading={loading} className='p-2'>

            <div className='p-2'>
            

                {orders.filter(obj=>obj.userid == userid).map((order) => {
                return (<table className="table mt-3 order">
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
            })}</div>
            </Layout>
        );

    }
    export default OrderPage;
