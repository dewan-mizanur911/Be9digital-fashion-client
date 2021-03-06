import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import OrderModal from '../OrderModal/OrderModal';

const OrderProductDetails = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch('https://be9digital-market.herokuapp.com/e_products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    const matchedItem = products?.find(product => product.key === id);

    const date = new Date();
    const initialInfo = { buyerName: user.displayName, email: user.email, phone: '' };
    const [purchaseInfo, setPurchaseInfo] = useState(initialInfo);
    const [modalShow, setModalShow] = useState(false);
    const [newOrder, setNewOrder] = useState({});

    const handleOnBlur = e => {
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = { ...purchaseInfo };
      newInfo[field] = value;
      setPurchaseInfo(newInfo);
  }
    
  const handlePurchase = e => {
    e.preventDefault();
    // collect data
    const order = {
        ...purchaseInfo,
        product: matchedItem?.name,
        id: id,
        price: parseInt(Math.ceil(parseFloat(matchedItem?.price) - parseFloat(matchedItem?.price) * (5 / 100))),
        date: date.toLocaleDateString(),
        status: 'pending',
        payment: ''
    };
    setNewOrder(order);
    // // send to the server
    fetch('https://be9digital-market.herokuapp.com/orders', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(res => res.json())
        .then(resultData => {
            if (resultData.insertedId) {
                setModalShow(true);
            }
        });
};


    return (
        <div className="bg-dark login-page py-5">
        <Col xs={12} md={5} className="mx-auto">
          <Card className="p-3">
          <h2 className="fw-bold">Add <span className="text-danger">information</span> page</h2>
            <div className="divider bg-info rounded mb-3 mx-auto"></div>
            <form onSubmit={handlePurchase}>
                <input name="name" defaultValue={user.displayName} type="text" className="purchase-input" onBlur={handleOnBlur} placeholder="Name" required/>
                <input name="email" defaultValue={user.email} type="email" className="purchase-input" onBlur={handleOnBlur} placeholder="email" required/>
                <input name="phone" type="number" className="purchase-input" onBlur={handleOnBlur} placeholder="Phone" required/>
                <input name="city" type="text" className="purchase-input" onBlur={handleOnBlur} placeholder="City" required/>
                <input name="country" type="text" className="purchase-input" onBlur={handleOnBlur} placeholder="Country" required/>
                <input type="submit" value="Purchase" className="purchase-input btn-danger" required/>
            </form>
          </Card>
        <OrderModal
          order = {newOrder}
          show={modalShow} 
          onHide={() => setModalShow(false)}
        ></OrderModal>
        </Col>
        <div className="divider bg-info rounded mt-4 mx-auto"></div>
      </div>
    );
};

export default OrderProductDetails;