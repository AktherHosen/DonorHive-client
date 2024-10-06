import axios from "axios";
import React from "react";
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
import { useQuery } from "@tanstack/react-query";

const AllBloodDonationRequests = () => {
  const { isAdmin } = useAdmin();
  const axiosSecure = useAxiosSecure();

  // Use useQuery to fetch donation requests
  const {
    data: allDonationRequests = [],
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/donation-requests`);
      return result.data;
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  console.log(allDonationRequests);
  // Error handling
  if (isError) {
    toast.error(error?.message);
  }

  // Filter out requests with status "Done"
  const filteredRequests = allDonationRequests.filter(
    (dn) => dn.status !== "Done" && dn.status !== "Cancel"
  );

  const handleDeleteConfirmation = (id) => {
    toast(
      (t) => (
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
      ),
      { autoClose: 3000 }
    );
  };

  const handleDelete = async (id, toastId) => {
    try {
      await axiosSecure.delete(`/donation-request/${id}`);
      toast.dismiss(toastId);
      toast.success("Donation request deleted successfully.");
      refetch(); // Refetch data after delete
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // const handleStatus = async (id, status) => {
  //   try {
  //     await axiosSecure.patch(`/donation-request/${id}`, { status: status });
  //     toast.success("Status updated.");
  //     refetch(); // Refetch data after status update
  //   } catch (err) {
  //     toast.error(err?.message);
  //   }
  // };
  const handleStatus = async (id, status) => {
    try {
      // Sending only the status field unless donor information is updated
      await axiosSecure.patch(`/donation-request/${id}`, { status });
      toast.success("Status updated.");
      refetch(); // Refetch data after status update
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const inProgressRequests = filteredRequests.filter(
    (dn) => dn.status === "In Progress"
  );

  return (
    <>
      <Helmet>
        <title>Donation Requests | Dashboard</title>
      </Helmet>

      <div className="my-4">
        <SectionTitle
          title="All Donation Requests"
          subTitle="Manage all donation requests."
        />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table  border">
          <thead className="uppercase font-semibold bg-slate-100">
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date & Time</th>

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
            {filteredRequests.map((dn) => (
              <tr key={dn._id} className="py-2 bg-gray-50 hover:bg-gray-100">
                <td>{dn.recipientName}</td>
                <td>
                  {dn.district} - {dn.upozila}
                </td>
                <td>
                  {new Date(dn.donationDate).toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  | {dn.donationTime ? dn.donationTime : "N/A"}
                </td>

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
                  <span
                    className={`px-3 text-xs py-0.5 rounded-full ${
                      dn.status === "In Progress"
                        ? "bg-yellow-500 text-white"
                        : dn.status === "Cancel"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
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
                            size={25}
                            className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                          />
                        </button>
                        <button
                          title="Cancel"
                          onClick={() => handleStatus(dn._id, "Cancel")}
                        >
                          <TiCancel
                            size={25}
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
                            size={20}
                            className="hover:scale-110 hover:transition-all hover:text-primary"
                          />
                        </Link>
                        <button
                          onClick={() => handleDeleteConfirmation(dn._id)}
                        >
                          <AiFillDelete
                            size={20}
                            className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                          />
                        </button>
                      </>
                    )}

                    <Link to={`/dashboard/donation-request-details/${dn._id}`}>
                      <TbListDetails
                        size={20}
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
