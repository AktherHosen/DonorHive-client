import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [districs, setDistrict] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const navigate = useNavigate();
  const { setUser, createUser, updateUserProfile } = useAuth();

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedDistricts = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDistrict(sortedDistricts);
      });
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpozilas(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const district = form.district.value;
    const upozila = form.upozila.value;
    const bloodGroup = form.bloodGroup.value;
    const password1 = form.password1.value;
    const password2 = form.password2.value;
    const role = "donor";
    const status = "active";

    if (password1 !== password2) {
      return toast.error("Your password does not matched");
    }
    const userInfo = {
      name,
      email,
      photo,
      district,
      upozila,
      bloodGroup,
      role,
      status,
    };

    try {
      const result = await createUser(email, password1);
      await updateUserProfile(name, photo);
      setUser({ ...result?.user, photoURL: photo, displayName: name });
      const data = await axiosPublic.post("/users", userInfo);
      e.target.reset();
      toast.success("Registration successful.");
      navigate("/");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className="min-h-[600px] flex items-center justify-center">
        <div className=" w-full lg:w-[800px] max-w-lg flex flex-col items-center justify-center px-4">
          <div className="space-y-2 mb-6">
            <div className="flex flex-col items-center">
              <p className="font-medium text-xl">Please Register</p>
              <p className="text-xs">
                You have to register to access this website.
              </p>
            </div>
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
                  placeholder="Enter your email"
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
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
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                >
                  {districs.map((dis) => (
                    <option key={dis.id} value={dis.name}>
                      {dis.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazilla Field */}
              <div>
                <label htmlFor="upozila" className="text-sm">
                  Upazila
                </label>
                <select
                  name="upozila"
                  id="upozila"
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

              {/* Password Fields */}
              <div>
                <label htmlFor="password1" className="text-sm">
                  Enter Password
                </label>
                <input
                  id="password1"
                  type="password"
                  name="password1"
                  placeholder="Password"
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                />
              </div>

              <div>
                <label htmlFor="password2" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end my-4">
              <button className="px-4 w-full py-2 rounded-md bg-primary text-white">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
