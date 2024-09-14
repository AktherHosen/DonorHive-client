import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");

  // Fetch user data
  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await axiosPublic.get(`/users?filter=${filter}`);
      setUsers(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [filter]);

  // Handle user status change (Block/Unblock)
  const handleStatus = async (id, status) => {
    const newStatus = status === "active" ? "blocked" : "active";
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        status: newStatus,
      });
      getUserData();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Handle making user an admin or volunteer
  const handleMakeAdmin = async (user, role) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/admin/${user?._id}`,
        {
          role: role,
        }
      );
      toast.success(`Congratulations. Made ${role} successful.`);
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

      {/* Filter options */}
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

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"></div>
          <p className="ml-2 text-primary">Loading users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table Head */}
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
                  <td>
                    <img
                      src={user.photo}
                      className="h-12 w-12 rounded-full"
                      alt={user?.name}
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 ${
                        user?.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                    >
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
                        {/* Block/Unblock button */}
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

                        {/* Make Volunteer button */}
                        {user?.role !== "volunteer" && (
                          <li>
                            <button
                              onClick={() => handleMakeAdmin(user, "volunteer")}
                            >
                              Make Volunteer
                            </button>
                          </li>
                        )}

                        {/* Make Admin button */}
                        {user?.role !== "admin" && (
                          <li>
                            <button
                              onClick={() => handleMakeAdmin(user, "admin")}
                            >
                              Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
