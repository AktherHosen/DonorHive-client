import React from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Donated = () => {
  const axiosSecure = useAxiosSecure();
  const { isAdmin } = useAdmin();
  const {
    data: donated = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["donated"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donated");
      return data;
    },
  });
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
  console.log(donated);
  return (
    <>
      <Helmet>
        <title>Donation Requests | Dashboard</title>
      </Helmet>

      <div className="my-4">
        <SectionTitle title="Donated History" />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="table  border">
          <thead className="uppercase font-semibold bg-slate-100">
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donated Date & Time</th>

              <>
                <th>Donor Information</th>
              </>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donated.map((dn) => (
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

                <td>
                  {dn.donorName}
                  <br />
                  {dn.donorEmail}
                </td>

                <td className="py-2">
                  <span
                    className={`px-3 text-xs py-0.5 rounded-full ${
                      dn.status === "Done"
                        ? "bg-green-500 text-white"
                        : dn.status === "Cancel"
                        ? "bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    {dn.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-x-2">
                    {isAdmin && (
                      <>
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

export default Donated;
