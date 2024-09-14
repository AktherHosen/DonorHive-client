import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { MdBloodtype, MdMarkEmailRead } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";

const Profile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [districs, setDistrict] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [edit, setEdit] = useState(false);

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
    const photo = form.photo.value;
    const district = form.district.value;
    const upozila = form.upozila.value;
    const bloodGroup = form.bloodGroup.value;
    const userInfo = {
      name,
      email,
      photo,
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
  console.log(edit);
  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <SectionTitle title="Profile" subTitle={userProfile?.name} />
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="lg:flex-1">
          <div className="flex justify-end">
            <button
              onClick={() => setEdit(!edit)}
              className="my-2 font-bold border p-0.5 shadow-sm rounded-sm text-sm"
            >
              <BiSolidEdit
                size={25}
                className="hover:text-primary hover:transition-colors hover:duration-300 "
              />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full lg:w-[800px]">
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
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
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
                  className="w-full rounded-md px-2 py-2 border  focus:outline-none  bg-gray-100"
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
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                  onChange={(e) => setUserProfile(e.target.value)}
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
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
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
                  Photo URL
                </label>
                <input
                  id="photo"
                  type="text"
                  name="photo"
                  disabled={!edit}
                  defaultValue={userProfile?.photo || ""}
                  placeholder="Enter your photo URL"
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                />
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
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
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

            {edit ? (
              <div className="w-full flex justify-start my-4">
                <button className="px-5 w-fit py-2 rounded-md bg-primary text-white">
                  Save
                </button>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className="w-full lg:min-w-[250px] min-h-[320px] border rounded-3xl shadow-md px-2 py-1 hover:bg-primary hover:text-white hover:transition-all duration-300 hover:bg-opacity-95">
          <div className="flex justify-center  mt-2">
            <img
              src={userProfile?.photo}
              alt=""
              className="h-[170px] w-full rounded-xl p-3 border-2 shadow-sm"
            />
          </div>
          <div className="p-2 space-y-1 mb-4">
            <h1 className="font-semibold font-bebas uppercase text-sm">
              {userProfile?.name}
            </h1>
            <div className="flex gap-x-2 items-center">
              <MdMarkEmailRead className="text-lg " />
              <span> {userProfile?.email}</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <FaLocationDot className="text-lg" />
              <span> {userProfile?.district}, </span>
              <span>{userProfile?.upozila}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <MdBloodtype className="text-xl" />
              <span className=" font-bold">{userProfile?.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
