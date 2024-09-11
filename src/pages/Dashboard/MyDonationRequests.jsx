import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";
import { Link } from "react-router-dom";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [myDonationRequests, setMyDonationRequests] = useState([]);

  const getData = async () => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests/${user?.email}`
      );
      setMyDonationRequests(result.data);
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`
      );
      getData();
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Donation Requests</title>
      </Helmet>

      <SectionTitle title={"My Donation Requests"} />
      <div className="overflow-x-auto mt-2">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myDonationRequests.map((dn) => (
              <tr key={dn._id} className="py-2">
                <td>{dn.recipientName}</td>
                <td>
                  {dn.district} - {dn.upozila}
                </td>
                <td>
                  {new Date(dn.donationDate).toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>{dn.donationTime ? dn.donationTime : "N/A"}</td>

                <td className="py-2">
                  <span className="bg-primary text-white opacity-50 px-3 text-xs py-0.5  rounded-full">
                    {dn.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-x-2">
                    <Link to={`/dashboard/update-donation-request/${dn._id}`}>
                      <FaRegEdit
                        size={16}
                        className="hover:scale-110 hover:transition-all hover:text-primary"
                      />
                    </Link>

                    <button onClick={() => handleDelete(dn._id)}>
                      <AiFillDelete
                        size={16}
                        className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                      />
                    </button>
                    <TbListDetails
                      size={16}
                      className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyDonationRequests;
