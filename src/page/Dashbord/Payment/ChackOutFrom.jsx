import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
const ChackOutFrom = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [id, setId] = useState('');
  console.log(clientSecret);
  const stript = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const [cart] = useCart();
  console.log(cart);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  console.log(totalPrice);
  useEffect(() => {
    if (totalPrice > 0 && user?.email) {
      axiosSecure
        .post('/create-payment-intent', {
          price: totalPrice,
        })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (!stript || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stript.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('payments is not ok', error);
      setError(error.message);
    } else {
      console.log('ooooooookkkk', paymentMethod);
      setError('');
    }
    // confrm payment
    const { paymentIntent, error: confirmError } =
      await stript.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      console.log('confiremes error', confirmError);
    } else {
      console.log('paymentInite', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        setId(paymentIntent.id);
        const payments = {
          email: user?.email,
          price: totalPrice,
          date: new Date(),
          transactionId: paymentIntent.id,
          cardId: cart.map(item => item._id),
          menuId: cart.map(item => item.menuId),
          status: 'under panding',
        };

        const res = await axiosSecure.post('/payments', payments);
        console.log('payments saved', res.data);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="btn  btn-neutral"
          
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {<p className="text-green-600">{id}</p>}
      </form>
    </div>
  );
};

export default ChackOutFrom;
