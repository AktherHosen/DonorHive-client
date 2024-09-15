import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import DatePicker from "react-datepicker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [donateDate, setDonateDate] = useState(new Date());
  const [donationRequest, setDonationRequest] = useState({});
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");
  const [upozilas, setUpozilas] = useState([]);
  const [allDistrict, setALDistrict] = useState([]);
  const [donationTime, setDonationTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setALDistrict(data);
      });
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpozilas(data);
      });
  }, []);

  const getData = async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`
      );
      const requestData = result.data;
      setDonationRequest(requestData);
      setDistrict(requestData.district || "");
      setUpozila(requestData.upozila || "");
      setDonateDate(new Date(requestData.donationDate) || new Date());

      // Ensure donationTime is in "HH:MM AM/PM" format
      setDonationTime(requestData.donationTime || "");
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = form.requesterName.value;
    const requesterEmail = form.requesterEmail.value;
    const recipientName = form.recipientName.value;
    const fullAddress = form.fullAddress.value;
    const hospitalName = form.hospitalName.value;
    const requestMessage = form.requestMessage.value;
    const district = form.district.value;
    const upozila = form.upozila.value;
    const donationTime = form.donationTime.value;

    // Format date
    const formattedDonationDate = donateDate.toISOString().split("T")[0];

    // Use donationTime directly in 12-hour format as required
    const formattedDonationTime = donationTime;

    const status = "pending";

    const requestInfo = {
      requesterName,
      requesterEmail,
      recipientName,
      fullAddress,
      hospitalName,
      requestMessage,
      district,
      upozila,
      donationDate: formattedDonationDate,
      donationTime: formattedDonationTime,
      status,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`,
        requestInfo
      );
      toast.success("Donation request updated.");
      e.target.reset();
      navigate("/dashboard/my-donation-requests");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const {
    fullAddress,
    requestMessage,
    requesterEmail,
    requesterName,
    hospitalName,
    recipientName,
  } = donationRequest;

  return (
    <div>
      <Helmet>
        <title>Update Donation Request</title>
      </Helmet>
      <SectionTitle
        title="Donation Request"
        subTitle="Update your donation request"
      />

      <div className="mt-2">
        <form onSubmit={handleUpdateRequest}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Name input */}
            <div className="row-span-1">
              <label htmlFor="requester-name" className="block text-sm">
                Requester Name
              </label>
              <input
                type="text"
                id="requester-name"
                name="requesterName"
                defaultValue={user?.displayName}
                readOnly
                placeholder="Enter name"
                className="border-2 w-full bg-gray-100 px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Email input */}
            <div className="row-span-1">
              <label htmlFor="email" className="block text-sm">
                Requester Email
              </label>
              <input
                type="email"
                id="email"
                name="requesterEmail"
                defaultValue={user?.email}
                readOnly
                placeholder="Enter email"
                className="border-2 w-full bg-gray-100 px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Recipient Name input */}
            <div>
              <label htmlFor="recipient-name" className="block text-sm">
                Recipient Name
              </label>
              <input
                type="text"
                id="recipient-name"
                name="recipientName"
                defaultValue={recipientName}
                placeholder="Enter recipient name"
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Request Message input */}
            <div className="row-span-1 lg:row-span-3 mb-2">
              <label htmlFor="message" className="block text-sm">
                Request Message
              </label>
              <textarea
                name="requestMessage"
                id="message"
                defaultValue={requestMessage}
                placeholder="Write message"
                className="border-2 w-full h-full resize-none px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Hospital Name input */}
            <div className="row-span-1">
              <label htmlFor="hospital" className="block text-sm">
                Hospital Name
              </label>
              <input
                name="hospitalName"
                type="text"
                defaultValue={hospitalName}
                id="hospital"
                placeholder="Hospital Name"
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Full Address input */}
            <div className="cols-span-1">
              <label htmlFor="full-address" className="block text-sm">
                Full Address
              </label>
              <input
                type="text"
                id="full-address"
                defaultValue={fullAddress}
                name="fullAddress"
                placeholder="Write full address"
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

            <div className="col-span-1 lg:col-span-2 flex flex-wrap items-center gap-2">
              <div className="flex-grow">
                <label htmlFor="district" className="block text-sm">
                  Choose District
                </label>
                <select
                  name="district"
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="border-2 w-full px-2 py-3 rounded-md outline-none"
                >
                  {allDistrict.map((dt) => (
                    <option key={dt.id} value={dt.name}>
                      {dt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-grow">
                <label htmlFor="upozila" className="block text-sm">
                  Choose Upozila
                </label>
                <select
                  name="upozila"
                  id="upozila"
                  value={upozila}
                  onChange={(e) => setUpozila(e.target.value)}
                  className="border-2 w-full px-2 py-3 rounded-md outline-none"
                >
                  <option value="">Choose Option</option>
                  {upozilas.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <label htmlFor="date" className="block text-sm">
                  Donation Date
                </label>
                <DatePicker
                  selected={donateDate}
                  onChange={(date) => setDonateDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-2 w-full px-2 py-3 rounded-md outline-none"
                  placeholderText="Select a date"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="donation-time" className="block text-sm">
                  Donation Time
                </label>
                <input
                  type="text"
                  id="donation-time"
                  name="donationTime"
                  value={donationTime}
                  onChange={(e) => setDonationTime(e.target.value)}
                  placeholder="Enter donation time (e.g., 12:41 AM)"
                  className="border-2 w-full px-2 py-3 rounded-md outline-none"
                />
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
