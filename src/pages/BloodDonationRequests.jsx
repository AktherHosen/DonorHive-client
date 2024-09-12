import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const BloodDonationRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios(
          `${
            import.meta.env.VITE_API_URL
          }/blood-donation-requests?status=pending`
        );
        setDonationRequests(result.data);
      } catch (err) {
        toast.error(err?.message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Blogs</title>
      </Helmet>

      <h1>Pending donation request are shwon here {donationRequests.length}</h1>
    </div>
  );
};

export default BloodDonationRequests;
