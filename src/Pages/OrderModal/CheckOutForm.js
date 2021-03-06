import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOutForm = ({price, buyerName, email, id}) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [process, setProcess] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const toastify = () =>{
      toast.success('Paid!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
  };

    useEffect(()=>{
        fetch('https://be9digital-market.herokuapp.com/create-payment-intent',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    },[price]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        setProcess(true);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if(error){
            setError(error.message);
            setSuccess('');
        }else{
            setError('');
        }

        // payment intent
        const {paymentIntent, error : intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: buyerName,
                  email: email
                },
              },
            },
          );
          if(intentError){
              setError(intentError.message);
              setSuccess('');
          }else{
              setError('');
              setSuccess('Your payment processed successfully');
              setProcess(false);

            //   save to db 
            const payment = {
                amount : paymentIntent.amount,
                created : paymentIntent.created,
                transaction : paymentIntent.client_secret.slice('_secret')[0],
                last4 : paymentMethod.card.last4
            };
              const url =  `https://be9digital-market.herokuapp.com/orders/${id}`;
              fetch(url, {
                  method: 'PUT',
                  headers: {
                      'content-type' : 'application/json'
                  },
                  body: JSON.stringify(payment)
              })
              .then(res => res.json())
              .then(data => {
                toastify(); 
                  navigate('/dashboard/myOrders');
              });
          }
    };

    return (
        <Container fluid>
        <form onSubmit={handleSubmit} className='w-100 d-flex flex-column'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {
            process ?
            <Spinner animation="border" role="status" className="mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            price  && <Button variant="primary" className="mx-auto mt-3" type="submit" disabled={!stripe || success}>Pay ${price}</Button>
        }
        {
            error && <p className='text-center fw-bold text-danger mt-3'>{error}</p>
        }
        {
            success &&             <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        }
      </form>
      </Container>
    );
};

export default CheckOutForm;