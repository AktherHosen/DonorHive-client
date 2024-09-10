import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
const DashboardHome = () => {
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
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <SectionTitle title={"Welcome"} subTitle={user?.displayName} />

      <SectionTitle title={"Recent Donation requests"} />
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
            {myDonationRequests.slice(0, 3).map((dn) => (
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
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 text-center">
        <Link
          to="/dashboard/my-donation-requests"
          className="text-xs bg-primary text-white rounded-md px-3 py-1.5"
        >
          View All My Request
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
