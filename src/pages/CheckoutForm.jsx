import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ userName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [price, setAmount] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate("/");
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
      return;
    } else {
      console.log("Payment method", paymentMethod);
      setError("");
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "annonymous",
            name: user?.displayName || "annonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Error confirming payment:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("Payment successful, paymentIntent:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transactionId", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // Now i have to store data
        const payment = {
          email: user?.email,
          name: user?.displayName,
          transactionId: paymentIntent.id,
          price: price,
          date: new Date(),
        };
        const result = await axiosSecure.post("/payments", payment);
        console.log(result);
      }
      setError("");
      navigate("/funding");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="w-[600px] flex flex-col justify-center gap-4 border rounded-md shadow-md px-5 py-8 bg-primary text-white">
        {transactionId && (
          <p>
            TransactionId:{" "}
            <span className="text-green-500">{transactionId}</span>
          </p>
        )}
        <h1 className="font-normal font-bebas mb-2 text-lg tracking-wider">
          Pay Donation
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="price" className="block text-sm  mb-2">
              Enter amount
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-2 py-2  rounded mb-4 w-full"
              required
              min="1"
            />
          </div>

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffffff",

                  "::placeholder": {
                    color: "#ffffff",
                  },
                },
                invalid: {
                  color: "#ffffff",
                },
              },
            }}
          />
          <button
            className="bg-black text-white px-6 py-2 mt-6 rounded-md"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          {error && <p className="text-primary">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
