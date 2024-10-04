import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Donors = () => {
  const [districts, setDistricts] = useState([]);
  const [upozilas, setUpozilas] = useState([]);
  const [donors, setDonors] = useState([]);

  // Fetch districts
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedDistricts = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDistricts(sortedDistricts);
      });
  }, []);

  // Fetch upozilas
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpozilas(data));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upozila = form.upozila.value;

    if (!bloodGroup && !district && !upozila) {
      toast.error("Please select at least one filter");
      return;
    }

    try {
      const query = new URLSearchParams();
      if (bloodGroup) query.append("bloodGroup", bloodGroup);
      if (district) query.append("district", district);
      if (upozila) query.append("upozila", upozila);

      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/donors?${query.toString()}`
      );
      setDonors(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="px-4 md:px-3 lg:px-2">
      <h1 className="font-bebas font-medium tracking-wider text-lg uppercase text-center">
        Search Your Donor
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-[100px] flex gap-4 justify-center items-center"
      >
        <div>
          <select
            name="bloodGroup"
            className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
          >
            <option value="">Select Blood Group</option>
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

        <div>
          <select
            name="district"
            className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
          >
            <option value="">Select District</option>
            {districts.map((dis) => (
              <option key={dis.id} value={dis.name}>
                {dis.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="upozila"
            className="w-full rounded-md px-2 py-2 border focus:border-collapse focus:ring-1 focus:outline-none border-red"
          >
            <option value="">Select Upozila</option>
            {upozilas.map((up) => (
              <option key={up.id} value={up.name}>
                {up.name}
              </option>
            ))}
          </select>
        </div>

        <button className="px-4 py-2 border-none outline-none bg-primary text-white rounded-md">
          Search
        </button>
      </form>

      {donors.length > 0 ? (
        <>
          <p className="text-gray-500 mb-1">{donors.length} results found.</p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>District</th>
                  <th>Upozila</th>
                  <th>Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((dn) => (
                  <tr key={dn._id} className="hover:bg-gray-50">
                    <th>
                      <img
                        src={dn.photo}
                        className="h-10 w-10 rounded-full"
                        alt=""
                      />
                    </th>

                    <td>{dn.name}</td>
                    <td>{dn.email}</td>
                    <td>{dn.district}</td>
                    <td>{dn.upozila}</td>
                    <td>{dn.bloodGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-primary text-center">
          No donors found. Please try a different search.
        </p>
      )}
    </div>
  );
};

export default Donors;
