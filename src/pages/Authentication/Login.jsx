import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import loginImg from "../../assets/login.png";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      e.target.reset();
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-[600px] flex items-center justify-center w-full">
        <div className="w-full px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="hidden md:flex items-center justify-center">
              <img
                src={loginImg}
                alt="Login"
                className="h-[300px] lg:h-[400px] "
              />
            </div>
            <div className="space-y-6 min-h-[400px] lg:w-[400px] p-4 rounded-md shadow-md border-2 w-full">
              <h1 className="font-bebas font-semibold uppercase text-center text-2xl text-slate-700">
                Login
              </h1>
              <form onSubmit={handleLogin} className="space-y-2 w-full ">
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
                    required
                  />
                </div>
                <div>
                  <div className="block mb-2 text-sm">
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
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-2 w-full font-semibold font-inter hover:transition-all hover:duration-200 px-4 py-2 text-white rounded-md bg-primary hover:bg-primary border-2"
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
      </div>
    </>
  );
};

export default Login;
