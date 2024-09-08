import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      e.target.reset();
      toast.success("Login successful");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex h-[600px] justify-center items-center">
      <div className="grid grid-cols-2 gap-4">
        <div></div>
        <div className="space-y-12 w-[400px]">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="space-y-2">
              {/* Change type from "button" to "submit" */}
              <button
                type="submit"
                className="my-4 w-full font-semibold font-inter hover:transition-all hover:duration-200 px-4 py-2 rounded-md  hover:bg-primary hover:text-white border-2 "
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="px-6 text-sm text-center">
            Don't have an account yet?{" "}
            <Link
              rel="noopener noreferrer"
              to="/registration"
              className="hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
