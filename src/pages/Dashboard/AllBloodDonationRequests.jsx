import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { TiCancel, TiTick } from "react-icons/ti";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteForever, MdCancel } from "react-icons/md";

const AllBloodDonationRequests = () => {
  const [allDonationRequests, setAllDonationRequests] = useState([]);
  const { isAdmin, isVolunteer } = useAdmin();
  const axiosSecure = useAxiosSecure();
  const getData = async () => {
    try {
      const result = await axiosSecure(`/donation-requests`);
      setAllDonationRequests(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteConfirmation = (id) => {
    toast((t) => (
      <span>
        Are you sure you want to delete this request?
        <div className="flex gap-2 mt-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDelete(id, t)}
          >
            <MdDeleteForever size={20} />
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            <MdCancel size={20} />
          </button>
        </div>
      </span>
    ));
  };

  const handleDelete = async (id, toastId) => {
    try {
      await axiosSecure.delete(`/donation-request/${id}`);
      toast.dismiss(toastId);
      toast.success("Donation request deleted successfully.");
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };
  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-request/${id}`, { status: status });
      toast.success("Status updated.");
      getData();
    } catch (err) {
      toast.error(err?.message);
    }
  };
  const inProgressRequests = allDonationRequests.filter(
    (dn) => dn.status === "In Progress"
  );
  return (
    <>
      <Helmet>
        <title>All Donation Requests</title>
      </Helmet>

      <div className="my-4">
        <SectionTitle
          title="All Donation Requests"
          subTitle="Manage all donation request."
        />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table table-sm border">
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
              <th>Manage Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allDonationRequests.map((dn) => (
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
                {dn.status === "In Progress" ? (
                  <>
                    <td>
                      {dn.donorName}
                      <br />
                      {dn.donorEmail}
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
                  <span className="bg-primary text-white opacity-50 px-3 text-xs py-0.5  rounded-full">
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
                    {isAdmin && (
                      <>
                        {/* Only admins can edit or delete */}
                        <Link
                          to={`/dashboard/update-donation-request/${dn._id}`}
                        >
                          <FaRegEdit
                            size={16}
                            className="hover:scale-110 hover:transition-all hover:text-primary"
                          />
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirmation(dn._id)}
                        >
                          <AiFillDelete
                            size={16}
                            className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                          />
                        </button>
                      </>
                    )}

                    <Link to={`/dashboard/donation-request-details/${dn._id}`}>
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
    </>
  );
};

export default AllBloodDonationRequests;
