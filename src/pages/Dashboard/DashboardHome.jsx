import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import toast from "react-hot-toast";
import { TiTick, TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useAuth();
  const [myDonationRequests, setMyDonationRequests] = useState([]);

  const getData = async () => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests/${user?.email}`
      );
      setMyDonationRequests(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getData();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`
      );
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`,
        { status: status }
      );
      toast.success("Status updated.");
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const inProgressRequests = myDonationRequests.filter(
    (dn) => dn.status === "In Progress"
  );

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <SectionTitle title={"Welcome"} subTitle={user?.displayName} />

      {myDonationRequests.length > 0 ? (
        <>
          <SectionTitle title={"Recent Donation Requests"} />
          <div className="overflow-x-auto mt-2">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>

                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  {inProgressRequests.length > 0 && (
                    <>
                      <th>Donor Information</th>
                    </>
                  )}
                  <th>Status</th>
                  <th>Manage Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myDonationRequests.slice(0, 3).map((dn) => (
                  <tr key={dn._id} className="py-2">
                    <td>{dn.recipientName}</td>
                    <td>
                      {dn.district} - {dn.upozila}
                    </td>

                    {/* Conditionally render Requester Name and Email if status is "In Progress" */}

                    <td>
                      {new Date(dn.donationDate).toLocaleDateString("en-GB", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td>{dn.donationTime ? dn.donationTime : "N/A"}</td>
                    {dn.status === "In Progress" ? (
                      <>
                        <td>
                          {dn.requesterName}
                          <br />
                          {dn.requesterEmail}
                        </td>
                      </>
                    ) : (
                      inProgressRequests.length > 0 && (
                        <>
                          <td>-</td>
                        </>
                      )
                    )}
                    <td className="py-2">
                      <span className="bg-primary text-white opacity-50 px-3 text-xs py-0.5 rounded-full">
                        {dn.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-x-2">
                        {dn.status === "In Progress" && (
                          <>
                            <button
                              title="Done"
                              onClick={() => handleStatus(dn._id, "Done")}
                            >
                              <TiTick
                                size={20}
                                className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                              />
                            </button>
                            <button
                              title="Cancel"
                              onClick={() => handleStatus(dn._id, "Cancel")}
                            >
                              <TiCancel
                                size={20}
                                className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                              />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-x-2">
                        <Link
                          to={`/dashboard/update-donation-request/${dn._id}`}
                        >
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
                        <Link
                          to={`/dashboard/donation-request-details/${dn._id}`}
                        >
                          <TbListDetails
                            size={16}
                            className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                          />
                        </Link>
                      </div>
                    </td>
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
              View All My Requests
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardHome;
