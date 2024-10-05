import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import { RxCross1 } from "react-icons/rx";
const DonationRequestDetails = () => {
  const [donationRequest, setDonationRequest] = useState({});
  const { id } = useParams();
  const { user } = useAuth();

  const getData = async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`
      );
      setDonationRequest(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStatus = "In Progress";

    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`,
        {
          status: newStatus,
          donorName: user?.displayName,
          donorEmail: user?.email,
        }
      );
      getData(id);
      toast.success("Donation request updated successfully!");

      document.getElementById("my_modal_3").close();
    } catch (err) {
      toast.error("Error updating donation request");
    }
  };

  const {
    requesterName,
    requesterEmail,
    recipientName,
    hospitalName,
    fullAddress,
    district,
    requestMessage,
    upozila,
    donationDate,
    donationTime,
    status,
  } = donationRequest;

  return (
    <>
      <Helmet>
        <title>Donation Request Detail | Dashboard</title>
      </Helmet>
      <div className="my-4">
        <SectionTitle title="Donation" subTitle="Donation request details." />
      </div>
      <div className="overflow-x-auto">
        <table className="table border table-auto table-sm break-words">
          <thead className="bg-slate-100">
            <tr>
              <th>Requester Name</th>

              <th>Recipient Name</th>
              <th>Hospital Name</th>
              <th>Requester Message</th>
              <th>Full Address</th>
              <th>District</th>
              <th>Donation Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td>
                {requesterName}
                <br />
                {requesterEmail}
              </td>

              <td>{recipientName}</td>
              <td>{hospitalName}</td>
              <td>{requestMessage}</td>
              <td>{fullAddress}</td>
              <td>
                {district} <br />
                {upozila}
              </td>

              <td>
                {donationDate} <br />
                {donationTime}
              </td>

              <td>
                <span
                  className={` rounded-full px-2 py-1 text-xs font-bold ${
                    status === "pending" ? "bg-primary text-white" : ""
                  }`}
                >
                  {status}
                </span>
              </td>
              <td>
                {status !== "In Progress" ? (
                  <button
                    className="px-2 bg-primary text-white py-1 rounded-md font-bebas tracking-widest"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Donate
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-lg">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          <h3 className="text-lg font-bebas uppercase tracking-widest">
            Donor Information
          </h3>
          <div className="py-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="donor-name" className="block text-sm">
                  Donor Name
                </label>
                <input
                  type="text"
                  id="donor-name"
                  name="donorName"
                  value={user?.displayName || ""}
                  readOnly
                  className="border-2 w-full px-2 py-3 rounded-md outline-none bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="donor-email" className="block text-sm">
                  Donor Email
                </label>
                <input
                  type="email"
                  id="donor-email"
                  name="donorEmail"
                  value={user?.email || ""}
                  readOnly
                  className="border-2 w-full px-2 py-3 rounded-md outline-none bg-gray-100"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="btn bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DonationRequestDetails;
