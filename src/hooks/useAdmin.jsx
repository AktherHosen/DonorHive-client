import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      const fetchUserRole = async () => {
        try {
          setLoading(true);
          const { data } = await axiosSecure.get(`/user/admin/${user.email}`);

          setIsAdmin(data.role === "admin");
          setIsVolunteer(data.role === "volunteer");
        } catch (err) {
          console.error("Error fetching user role:", err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  return { isAdmin, isVolunteer, loading };
};

export default useAdmin;
