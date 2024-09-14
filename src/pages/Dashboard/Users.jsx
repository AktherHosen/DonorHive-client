import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");

  const getUserData = async () => {
    try {
      const result = await axiosPublic.get(`/users?filter=${filter}`);
      setUsers(result.data);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [filter]);

  const handleStatus = async (id, status) => {
    const newStatus = status === "active" ? "blocked" : "active";
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/${id}`,
        { status: newStatus }
      );
      getUserData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <SectionTitle title="Users" subTitle="Manage all users" />
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
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end">Manage Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>
                  <img
                    src={user.photo}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />
                </th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <span className="rounded-full bg-primary text-white px-3 py-1 ">
                    {user?.status}
                  </span>
                </td>
                <td className="text-end relative overflow-visible">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <CiMenuKebab size={20} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-50 w-32 p-1 shadow text-xs font-semibold"
                    >
                      {user?.status === "active" ? (
                        <li>
                          <button
                            onClick={() =>
                              handleStatus(user?._id, user?.status)
                            }
                          >
                            Block
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() =>
                              handleStatus(user?._id, user?.status)
                            }
                          >
                            Unblock
                          </button>
                        </li>
                      )}

                      <li>
                        <button>Make Volunteer</button>
                      </li>
                      <li>
                        <button>Make Admin</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
