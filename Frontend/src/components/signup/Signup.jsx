import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API_URL } from "../../utils/constant";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleGenderCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_API_URL}/auth/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const { message, success, ...usersData } = res.data;

      if (success) {
        toast.success(message);
        dispatch(setAuthUser(usersData));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="text-black min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Sign Up <span className="text-purple-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className="label p-2">
              <span className="text-base label-text ">FullName</span>
            </label>
            <input
              className="w-full input input-bordered text-white h-10 "
              placeholder="Enter your fullname"
              type="text"
              value={user.fullname}
              onChange={(e) => {
                setUser({ ...user, fullname: e.target.value });
              }}
            />
          </div>
          <div className="">
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              className="w-full input input-bordered text-white h-10"
              placeholder="Enter your username"
              type="text"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </div>
          <div className="">
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              className="w-full input input-bordered text-white h-10"
              placeholder="Enter your password"
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <div className="">
            <label className="label p-2 ">
              <span className="text-base label-text  ">Confirm Password</span>
            </label>
            <input
              className="w-full input input-bordered text-white h-10"
              placeholder="Re enter the password"
              type="password"
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-4  mt-4 mb-2 ml-2">
            <div className="flex items-center gap-2">
              <p className="">Male</p>
              <input
                type="checkbox"
                className="checkbox border-2 border-gray-400"
                checked={user.gender === "male"}
                onChange={() => {
                  handleGenderCheckBox("male");
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="">Female</p>
              <input
                type="checkbox"
                className="checkbox border-2 border-gray-400"
                checked={user.gender === "female"}
                onChange={() => {
                  handleGenderCheckBox("female");
                }}
              />
            </div>
          </div>

          <Link
            to="/login"
            className="text-gray-400  ml-2 hover:underline hover:text-purple-500"
          >
            Already have an account? Login
          </Link>

          <div className="mt-2">
            <button
              className="btn btn-block btn-sm border 
             border-slate-700"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
