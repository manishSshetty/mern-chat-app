import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../config";
import axios from "axios";
import { setSelectedUser, setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let dispatch=useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setEmail("");
      setPassword("");
      setError("")
      dispatch(setUserData(res.data))
      dispatch(setSelectedUser(null))
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);  
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[570px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]  shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px] font-serif">
            Login to <span className="text-white">Pingzy</span>
          </h1>
        </div>

        <form
          className="w-full flex flex-col gap-[20px] items-center justify-center"
          onSubmit={handleLogin}
        >
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
            {loading ? "Loding..." : "Login"}
          </button>

          <p className="cursor-pointer" onClick={() => navigate("/signUp")}>
            Don't have an Account ?
            <span className="text-blue-500 font-semibold"> Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
