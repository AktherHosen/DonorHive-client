import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [myDonationRequests, setMyDonationRequests] = useState([]);

  useEffect(() => {
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
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>My Donation Request</title>
      </Helmet>

      <SectionTitle title={"My Donation requests"} />
      <div className="overflow-x-auto mt-2">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Dontation Date</th>
              <th>Donation Time</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myDonationRequests.map((dn) => (
              <tr className="py-2">
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

                <td>
                  {new Date(dn.donationTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>

                <td className="py-2">
                  <span className="bg-primary text-white opacity-50 px-3 text-xs py-0.5  rounded-full">
                    {dn.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-x-2">
                    <FaRegEdit
                      size={16}
                      className="hover:scale-110 hover:transition-all hover:text-primary"
                    />
                    <AiFillDelete
                      size={16}
                      className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                    />
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
