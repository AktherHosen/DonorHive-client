import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Funding = () => {
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();

  const getPaymentData = async () => {
    try {
      const result = await axiosPublic("/payments");
      setPayments(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Helmet>
        <title>Funding</title>
      </Helmet>

      <div className="flex justify-between items-center">
        <SectionTitle title="Funding" subTitle="All funding history" />
        <Link
          to="/payment"
          className="px-4 py-2 text-sm rounded-md bg-primary text-white"
        >
          Donate
        </Link>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table table-sm border">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id}>
                <th>{idx + 1}</th>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.price}</td>
                <td>{formatDate(payment.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;
