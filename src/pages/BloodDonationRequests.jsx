import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import SectionTitle from "../components/SectionTitle";
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
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Helmet>
        <title>Donation Requests</title>
      </Helmet>
      <SectionTitle title="Pending Requests" />

      {donationRequests.length > 0 ? (
        <div className="overflow-x-auto mt-2">
          <table className="table border">
            {/* head */}
            <thead className="bg-slate-100 uppercase font-semibold">
              <tr>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Donation Date & Time</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map((dn) => (
                <tr key={dn._id} className="hover:bg-gray-100 bg-gray-50">
                  <td>{dn.recipientName}</td>
                  <td>{dn.fullAddress}</td>
                  <td>
                    {dn.donationDate} | {dn.donationTime}
                  </td>

                  <td>
                    <Link
                      to={`/dashboard/donation-request-details/${dn._id}`}
                      className="bg-primary text-white rounded-full px-2 py-1 text-xs font-semibold"
                    >
                      {/* <TbListDetails
                        title="Details"
                        size={20}
                        className="hover:text-primary hover:scale-110 hover:transition-all hover:duration-300"
                      /> */}
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No pending donation request found</p>
      )}
    </div>
  );
};

export default BloodDonationRequests;
