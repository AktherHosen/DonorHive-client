import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import DatePicker from "react-datepicker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const [districs, setDistrict] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [donateDate, setDonateDate] = useState(new Date());

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistrict(data);
      });
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpozilas(data));
  }, []);

  const handleRequestSubmit = async (e) => {
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

    const formattedDonationDate = donateDate.toISOString().split("T")[0];
    const timeParts = donationTime.split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedDonationTime = `${hours}:${minutes} ${ampm}`;

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
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-request?email=${user?.email}`,
        requestInfo
      );
      toast.success("Donation request submitted.");
      e.target.reset();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err?.message);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Donation Request</title>
      </Helmet>
      <SectionTitle
        title="Donation Request"
        subTitle="Create your donation request"
      />

      <div className="mt-2">
        <form onSubmit={handleRequestSubmit}>
          <div className="w-full grid grid-row-6 grid-cols-1 lg:grid-cols-2 gap-4">
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
                className="border-2 bg-gray-100 w-full px-2 py-3 rounded-md outline-none"
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
                className="border-2 bg-gray-100 w-full px-2 py-3 rounded-md outline-none"
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
                placeholder="Enter recipient name"
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* Request Message textarea */}
            <div className="row-span-1 lg:row-span-3 mb-2">
              <label htmlFor="message" className="block text-sm">
                Request Message
              </label>
              <textarea
                name="requestMessage"
                id="message"
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
                name="fullAddress"
                placeholder="Write full address"
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

            {/* District and Upozila dropdowns */}
            <div className="col-span-1 lg:col-span-2 flex flex-wrap items-center gap-2">
              <div className="flex-grow">
                <label htmlFor="district" className="text-sm">
                  Choose District
                </label>
                <select
                  name="district"
                  id="district"
                  className="w-full rounded-md px-2 py-3 border focus:border-collapse focus:ring-1 focus:outline-none"
                >
                  {districs.map((dt) => (
                    <option key={dt.id} value={dt.name}>
                      {dt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-grow">
                <label htmlFor="upozila" className="text-sm">
                  Choose Upozila
                </label>
                <select
                  name="upozila"
                  id="upozila"
                  className="w-full rounded-md px-2 py-3 border focus:border-collapse focus:ring-1 focus:outline-none"
                >
                  {upozilas.map((up) => (
                    <option key={up.id} value={up.name}>
                      {up.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row-span-1">
                <label htmlFor="donation-date" className="block text-sm">
                  Donation Date
                </label>
                <DatePicker
                  selected={donateDate}
                  name="donationDate"
                  onChange={(date) => setDonateDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-2 w-full px-2 py-3 rounded-md"
                />
              </div>
              <div className="row-span-1">
                <label htmlFor="donation-time" className="block text-sm">
                  Donation Time
                </label>
                <input
                  type="time"
                  name="donationTime"
                  className="border-2 w-full px-2 py-3 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-start">
            <button className="w-fit my-2 bg-primary font-bebas tracking-widest text-white px-4 py-2 rounded">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
