import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";
import { Link } from "react-router-dom";
import { TiCancel, TiTick } from "react-icons/ti";
import toast from "react-hot-toast";
import { MdCancel, MdDeleteForever } from "react-icons/md";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [myDonationRequests, setMyDonationRequests] = useState([]);
  const [filter, setFilter] = useState("");

  const getData = async () => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/donation-requests/${
          user?.email
        }?filter=${filter}`
      );
      setMyDonationRequests(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

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
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`
      );
      toast.dismiss(toastId);
      toast.success("Donation request deleted successfully.");
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
    <>
      <Helmet>
        <title>My Donation Requests</title>
      </Helmet>

      <SectionTitle title={"My Donation Requests"} />
      <div className="flex justify-end mb-3">
        <div>
          <label htmlFor="filterStatus" className="label block text-xs">
            Filter By Status
          </label>
          <select
            name="filterStatus"
            id="filterStatus"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="border px-2 py-1 rounded-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>
      </div>
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
                    <Link to={`/dashboard/update-donation-request/${dn._id}`}>
                      <FaRegEdit
                        size={16}
                        className="hover:scale-110 hover:transition-all hover:text-primary"
                      />
                    </Link>

                    <button onClick={() => handleDeleteConfirmation(dn._id)}>
                      <AiFillDelete
                        size={16}
                        className="hover:scale-110 hover:transition-all hover:text-primary hover:font-semibold"
                      />
                    </button>

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

export default MyDonationRequests;
