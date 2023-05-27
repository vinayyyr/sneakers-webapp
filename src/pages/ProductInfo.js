import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from "firebase/firestore";
import fireDb from '../fireConfig';
import { useParams } from "react-router";
import { useDispatch, useSelector} from 'react-redux';

function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading]= useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch= useDispatch();
  const {cartItems}= useSelector(state=>state.cartReducer)
  const params = useParams();
  
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true)
      const productTemp = await getDoc(
        doc(fireDb, "products", params.productid)
      );
      setProduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }
  
  const addToCart=(product)=>{
    if(selectedSize === '') {
      alert('Please select a size.');
      return;
    }
    const productToAdd = {...product, size: selectedSize};
    dispatch({type:'ADD_TO_CART', payload: productToAdd});

  }
  
  useEffect(()=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },[cartItems]) 

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  }

  return (
    <Layout loading={loading}>
      <div className="cart-items-container"
                style={{ height: "580px", overflowY: "scroll" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">

      {product && (
        <div><p><b>{product.name}</b></p>
        
         <p>{product.description}</p>
         
          <img src={product.imageURL} className="product-info-img" />
          <hr/>
          <div>
          <p><b>{product.price} $</b></p>
            <label htmlFor="size-select">Select size:</label>
            <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
              <option value=""></option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
              <option value="46">46</option>
              <option value="47">47</option>
            </select>
          </div>
          <div className="d-flex justify-content-end my-3 button-container">
            <button onClick={()=>addToCart(product)}>ADD TO CART</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>
</div>
</Layout>
  
  )
}

export default ProductInfo;