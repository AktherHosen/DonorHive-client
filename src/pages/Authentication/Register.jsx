import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const [districs, setDistrict] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const { user, setUser, loading, setLoading, createUser, updateUserProfile } =
    useAuth();
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
    const userInfo = {
      name,
      email,
      photo,
      district,
      upozila,
      bloodGroup,
      password1,
      password2,
      role,
    };
    try {
      const result = await createUser(email, password1);
      await updateUserProfile(name, photo);
      setUser({ ...result?.user, photoURL: photo, displayName: name });
      // const { data } = await axiosSecure.post(`/jwt`, {
      //   email: result?.user?.email,
      // });

      e.target.reset();
      toast.success("Registration successful.");
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div>
      <div className="space-y-2 col-span-full lg:col-span-1">
        <p className="font-medium text-xl">Please Register</p>
        <p className="text-xs">
          You have to register to access to this website.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="min-h-[500px] flex flex-col lg:items-center lg:justify-center p-4 rounded-md"
      >
        <div className="px-2 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
            <div className="">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="First your first name"
                className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
              />
            </div>
            <div className="">
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
            <div className="">
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
            <div className="">
              <label htmlFor="upozila" className="text-sm">
                Upazilla
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

            <div className="">
              <label htmlFor="photo" className="text-sm">
                Photo
              </label>
              <input
                id="photo"
                type="text"
                name="photo"
                placeholder="Enter your photo url"
                className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
              />
            </div>
            <div className="">
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

            <div className="">
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
            <div className="">
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
          <div className="w-full flex justify-end my-4">
            <button className="px-4 py-2 rounded-md bg-primary text-white">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
