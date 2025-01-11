import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ChackOutFrom from './ChackOutFrom';
// TODO
const stripePromse = loadStripe(import.meta.env.VITE_Payment_Gatway_Api_key);


const Payment = () => {
  
  return (
    <div>
      <SectionTitle
        heading={'Payment'}
        subHeading={'Plase Pay to eat'}
      ></SectionTitle>
      <Elements stripe={stripePromse}>
        <ChackOutFrom></ChackOutFrom> 
      </Elements>
    </div>
  );
};

export default Payment;