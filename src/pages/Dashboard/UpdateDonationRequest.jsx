import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import DatePicker from "react-datepicker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import TimePicker from "react-time-picker";
const UpdateDonationRequest = () => {
  const { id } = useParams();
  const [donateDate, setDonateDate] = useState(new Date());
  const [donateTime, setDonateTime] = useState();
  const { user } = useAuth();
  const [donationRequest, setDonationRequest] = useState({});
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");

  const [upozlias, setUpozilas] = useState([]);
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
      setDonationRequest(result.data);
      setDistrict(result.data.district);
      setUpozila(result.data.upozila);
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requesterName = form.requesterName.value;
    const requesterEmail = form.requesterEmail.value;
    const recipientName = form.recipientName.value;
    const fullAddress = form.fullAddress.value;
    const hospitalName = form.hospitalName.value;
    const district = form.district.value;
    const requestMessage = form.requestMessage.value;
    const upozila = form.upozila.value;
    const status = "pending";
    const requestInfo = {
      requesterName,
      requesterEmail,
      recipientName,
      fullAddress,
      requestMessage,
      hospitalName,
      district,
      upozila,
      donationDate,
      donationTime,
      status,
    };

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/donation-request/${id}`,
        requestInfo
      );
      toast.success("Donation request updated.");
      e.target.reset();
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
    donationDate,
    donationTime,
  } = donationRequest;

  return (
    <div className="pr-8 w-96 md:w-full lg:w-full">
      <Helmet>
        <title>Update Donation Request</title>
      </Helmet>
      <SectionTitle
        title="Donation Request"
        subTitle="Update your donation request"
      />

      <div className="mt-2">
        <form onSubmit={handleUpdateRequest}>
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

            {/* District (controlled select element) */}
            <div className="col-span-1 lg:col-span-2 flex flex-wrap items-center gap-2">
              <div className="flex-grow">
                <label htmlFor="district" className="text-sm">
                  Choose District
                </label>
                <select
                  name="district"
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-md px-2 py-3 border focus:border-collapse focus:ring-1 focus:outline-none"
                >
                  <option value="">Choose Option</option>
                  <option value="Comilla">Comilla</option>
                  <option value="Feni">Feni</option>
                  <option value="Brahmanbaria">Brahmanbaria</option>
                  <option value="Rangamati">Rangamati</option>
                  <option value="Noakhali">Noakhali</option>
                  <option value="Chandpur">Chandpur</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Coxsbazar">Coxsbazar</option>
                  <option value="Bandarban">Bandarban</option>
                  <option value="Sirajganj">Sirajganj</option>
                  <option value="Pabna">Pabna</option>
                  <option value="Bogura">Bogura</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Natore">Natore</option>
                  <option value="Joypurhat">Joypurhat</option>
                  <option value="Chapainawabganj">Chapainawabganj</option>
                  <option value="Naogaon">Naogaon</option>
                  <option value="Jashore">Jashore</option>
                  <option value="Satkhira">Satkhira</option>
                  <option value="Meherpur">Meherpur</option>
                  <option value="Narail">Narail</option>
                  <option value="Chuadanga">Chuadanga</option>
                  <option value="Kushtia">Kushtia</option>
                  <option value="Magura">Magura</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Bagerhat">Bagerhat</option>
                  <option value="Jhenaidah">Jhenaidah</option>
                  <option value="Patuakhali">Patuakhali</option>
                  <option value="Pirojpur">Pirojpur</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Bhola">Bhola</option>
                  <option value="Barguna">Barguna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Moulvibazar">Moulvibazar</option>
                  <option value="Habiganj">Habiganj</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Shariatpur">Shariatpur</option>
                  <option value="Narayanganj">Narayanganj</option>
                  <option value="Dhaka">Dhaka</option>
                </select>
              </div>
              <div className="flex-grow">
                <label htmlFor="upozila" className="text-sm">
                  Choose Upozila
                </label>
                <select
                  name="upozila"
                  id="upozila"
                  value={upozila}
                  onChange={(e) => setUpozila(e.target.value)}
                  className="w-full rounded-md px-2 py-3 border focus:border-collapse focus:ring-1 focus:outline-none"
                >
                  {upozlias.map((up) => (
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
                  selected={donationDate}
                  onChange={(date) => setDonateDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border-2 w-full px-2 py-3 rounded-md"
                />
              </div>
              <div className="row-span-1">
                <label htmlFor="donation-time" className="block text-sm">
                  Donation Time
                </label>
                <TimePicker
                  className="border-2 w-full px-2 py-3 rounded-md"
                  onChange={setDonateTime}
                  value={donationTime}
                />
              </div>
            </div>

            {/* Donation Date input */}

            {/* Submit Button */}
            <div className="row-span-1 col-span-1 lg:col-span-2">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-md w-full"
              >
                Update Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
