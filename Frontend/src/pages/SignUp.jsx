import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let dispatch=useDispatch()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data))
      setLoading(false);
      setEmail("");
      setPassword("");
      setError("")
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[570px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px] font-serif">
            Welcome to <span className="text-white">Pingzy</span>
          </h1>
        </div>

        <form
          className="w-full flex flex-col gap-[20px] items-center justify-center"
          onSubmit={handleSignup}
        >
          <input
            type="text"
            placeholder="username"
            className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px]  shadow-gray-400 shadow-md outline-none text-gray-700 text-[19px]"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            placeholder="email"
            className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px]  shadow-gray-400 shadow-md outline-none text-gray-700 text-[19px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg  shadow-gray-400 shadow-md overflow-hidden relative">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="password"
              className="w-full h-full  px-[20px] py-[10px] outline-none text-gray-700 text-[19px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="absolute top-[10px] right-[10px] text-[17px] text-[#20c7ff] font-semibold cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            >{`${show ? "hidden" : "show"}`}</span>
          </div>

          {error && (
            <p className="text-red-700 font-bold font-mono">{"*" + error}</p>
          )}

          <button className=" w-[200px] px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl text-[20px]  shadow-gray-400 shadow-lg mt-[20px] font-semibold hover:shadow-inner" disabled={loading}>
            {loading ? "Loding..." : "Sign up"}
          </button>

          <p className="cursor-pointer" onClick={() => navigate("/login")}>
            Already have an Account ?
            <span className="text-blue-500 font-semibold"> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
