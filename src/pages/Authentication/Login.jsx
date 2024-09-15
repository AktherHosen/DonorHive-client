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
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="min-h-[600px] flex flex-col md:flex-row justify-center lg:gap-8 items-center">
        <div className="flex items-center justify-center">
          <img src={loginImg} alt="Login" className="h-[200px] md:h-[400px] " />
        </div>
        <div className="space-y-6  p-4 rounded-md shadow-md border-2  w-full md:max-w-lg">
          <div>
            <h1 className="font-bebas font-semibold uppercase text-start text-2xl text-slate-700">
              Login <span className="font-extrabold text-green-500">.</span>
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-2">
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
  );
};

export default Login;
