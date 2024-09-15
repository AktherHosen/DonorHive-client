import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
  return (
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
