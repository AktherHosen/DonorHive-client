import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import DatePicker from "react-datepicker";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const CrateDonationRequest = () => {
  const { user } = useAuth();

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

    const status = "pending";
    const requestInfo = {
      requesterName,
      requesterEmail,
      recipientName,
      fullAddress,
      requestMessage,
      hospitalName,
      district,
      status,
    };
    // console.log(requestInfo);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-request`,
        requestInfo
      );
      toast.success("Donation request submitted.");
      e.target.reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="pr-8 w-96 md:w-full lg:w-full">
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
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
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
                className="border-2 w-full px-2 py-3 rounded-md outline-none"
              />
            </div>

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

            <div className="row-span-1 lg:row-span-3  mb-2">
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
                  <option value="Comilla">Comilla</option>
                  <option value="Feni">Feni</option>
                  <option value="Brahmanbaria">Brahmanbaria</option>
                  <option value="Rangamati">Rangamati</option>
                  <option value="Noakhali">Noakhali</option>
                  <option value="Chandpur">Chandpur</option>
                  <option value="Chandpur">Chandpur</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Coxsbazar">Coxsbazar</option>
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
                  <option value="Jhenaidah">Jhenaidah</option>
                  <option value="Patuakhali">Patuakhali</option>
                  <option value="Pirojpur">Pirojpur</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Bhola">Bhola</option>
                  <option value="Barguna">Barguna</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Moulvibazar">Moulvibazar</option>
                  <option value="Habiganj">Habiganj</option>
                  <option value="Habiganj">Habiganj</option>
                  <option value="Habiganj">Habiganj</option>
                  <option value="Gazipur">Gazipur</option>
                  <option value="Shariatpur">Shariatpur</option>
                  <option value="Narayanganj">Narayanganj</option>
                  <option value="Tangail">Tangail</option>
                  <option value="Kishoreganj">Kishoreganj</option>
                  <option value="Manikganj">Manikganj</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Rajbari">Rajbari</option>
                  <option value="Madaripur">Madaripur</option>
                  <option value="Gopalganj">Gopalganj</option>
                  <option value="Faridpur">Faridpur</option>
                  <option value="Panchagarh">Panchagarh</option>
                  <option value="Dinajpur">Dinajpur</option>
                  <option value="Lalmonirhat">Lalmonirhat</option>
                  <option value="Nilphamari">Nilphamari</option>
                  <option value="Gaibandha">Gaibandha</option>
                  <option value="Thakurgaon">Thakurgaon</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Kurigram">Kurigram</option>
                  <option value="Sherpur">Sherpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Jamalpur">Jamalpur</option>
                  <option value="Netrokona">Netrokona</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-start">
            <button className="w-fit my-2 bg-primary text-white px-4 py-2 rounded">
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrateDonationRequest;
