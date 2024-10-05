import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { MdBloodtype, MdMarkEmailRead } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { imageUpload } from "../../api/utils";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [districs, setDistrict] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fetch user profile
  const getProfile = async () => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      );
      if (result.data && result.data.length > 0) {
        setUserProfile(result.data[0]);
      } else {
        toast.error("No profile data found");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      getProfile();
    }
  }, [user?.email]);

  // Fetch districts and upazilas
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const district = form.district.value;
    const upozila = form.upozila.value;
    const bloodGroup = form.bloodGroup.value;
    const photo = selectedPhoto || userProfile?.photo; // Use selected photo or current one
    const photo_url = selectedPhoto
      ? await imageUpload(photo)
      : userProfile.photo;

    const userInfo = {
      name,
      email,
      photo: photo_url,
      district,
      upozila,
      bloodGroup,
    };
    console.log(userInfo);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/${userProfile._id}`,
        userInfo
      );
      toast.success("Profile updated successfully!");
      setEdit(false);
      setUserProfile(result.data);
      getProfile();
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  if (!userProfile) return <div>Loading profile...</div>;

  return (
    <div>
      <Helmet>
        <title>Profile | Dashboard</title>
      </Helmet>
      <SectionTitle title="Profile" subTitle={userProfile?.name} />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-end">
            <button
              onClick={() => setEdit(!edit)}
              className="my-2 font-bold border p-1 shadow-sm rounded-sm text-sm"
            >
              <BiSolidEdit
                size={26}
                className="hover:bg-primary hover:text-white hover:transition-colors hover:duration-300 "
              />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  disabled={!edit}
                  defaultValue={userProfile?.name || ""}
                  placeholder="Enter your first name"
                  className="w-full input-md rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  disabled={!edit}
                  defaultValue={userProfile?.email || ""}
                  placeholder="Enter your email"
                  className="w-full input-md rounded-md px-2 py-2 border  focus:outline-none  bg-gray-100"
                  readOnly
                />
              </div>

              {/* District Field */}
              <div>
                <label htmlFor="district" className="text-sm">
                  Choose District
                </label>
                <select
                  name="district"
                  id="district"
                  disabled={!edit}
                  defaultValue={userProfile?.district}
                  className="w-full input-md rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                >
                  {districs.map((dis) => (
                    <option key={dis.id} value={dis.name}>
                      {dis.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila Field */}
              <div>
                <label htmlFor="upozila" className="text-sm">
                  Upazila
                </label>
                <select
                  name="upozila"
                  id="upozila"
                  disabled={!edit}
                  defaultValue={userProfile?.upozila}
                  className="w-full input-md rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                >
                  {upozilas.map((up) => (
                    <option key={up.id} value={up.name}>
                      {up.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Field */}
              <div>
                <label htmlFor="photo" className="text-sm">
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  disabled={!edit}
                  accept="image/*"
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                  className="file-input file-input-bordered file-input-md w-full rounded-md border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                />
                {/* Show the previous image name if no new photo is selected */}
                {userProfile?.photo && !selectedPhoto && (
                  <p className="text-sm text-gray-600 mt-1">
                    Current file: {userProfile.photo.split("/").pop()}
                  </p>
                )}
              </div>

              {/* Blood Group Field */}
              <div>
                <label htmlFor="blood" className="text-sm">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  id="blood"
                  disabled={!edit}
                  defaultValue={userProfile?.bloodGroup || ""}
                  className="w-full input-md rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="w-full flex justify-start my-4">
              <button
                disabled={!edit}
                className={`px-5 w-fit py-2 font-bebas tracking-widest rounded-md ${
                  edit
                    ? "bg-primary text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Profile Display Section */}
        <div className="lg:col-span-1 w-full  h-fit md:max-w-md border rounded-3xl shadow-md px-2 py-1 hover:bg-primary hover:text-white hover:transition-all duration-300 hover:bg-opacity-95">
          <div className="flex justify-center  mt-2">
            <img
              src={
                selectedPhoto
                  ? URL.createObjectURL(selectedPhoto)
                  : userProfile?.photo
              }
              alt="Profile"
              className="h-[170px] w-[170px] rounded-full p-1 border-2 shadow-sm"
            />
          </div>
          <div className="p-2 space-y-1 mb-4">
            <h1 className="font-semibold font-inter uppercase text-sm">
              {userProfile?.name}
            </h1>
            <div className="flex gap-x-2 items-center">
              <MdMarkEmailRead className="text-lg " />
              <span> {userProfile?.email}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <MdBloodtype className="text-lg " />
              <span> {userProfile?.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
