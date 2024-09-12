import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DonationRequestDetails = () => {
  const [donationRequest, setDonationRequest] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  const getData = async (id) => {
    try {
      const result = await axios(
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
        { status: newStatus }
      );
      getData(id);
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div>
      <h1>This is detail page {donationRequest.requesterName}</h1>
      <h1>{donationRequest.status}</h1>
      <button
        className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Donate
      </button>

      {/* Modal with Donation Form */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Donation Form</h3>
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

                {/* Donor Email (Read-Only) */}
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
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                    type="submit"
                    className="btn bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Confirm Donation
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;
