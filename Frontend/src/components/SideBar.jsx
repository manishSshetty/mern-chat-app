import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../../config";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setSearchData(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] lg:block relative ${
        selectedUser ? "hidden" : "block"
      } w-full min-h-screen bg-slate-200 overflow-hidden`}
    >
      <div
        className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-[#20c7ff] shadow-gray-500 shadow-lg cursor-pointer fixed bottom-[20px] left-[10px]"
        onClick={handleLogout}
      >
        <RiLogoutCircleLine className="w-[25px] h-[25px]" />
      </div>

      {input.length > 0 && (
        <div className="flex w-full h-[600px] overscroll-y-auto flex-col gap-[10px] absolute top-[220px] bg-white z-[150] items-center pt-[20px] shadow-lg">
          {searchData?.map((user) => (
            <div
              className="w-[95%] h-[70px] bg-white flex justify-start items-center gap-[20px] px-[20px] cursor-pointer hover:bg-[#e1e8ea] border-b-2 border-gray-400"
              onClick={() => {
                dispatch(setSelectedUser(user));
                setInput("");
                setSearch(false);
              }}
            >
              <div className="relative">
                <div
                  key={user._id}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center "
                >
                  <img
                    src={user.image || dp}
                    alt="profile image"
                    className="h-[100%]"
                  />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-[15px] h-[15px] rounded-full bg-[#0bed0bd3] absolute bottom-0 right-0"></span>
                )}
              </div>

              <h1 className="text-gray-800 font-semibold text-[20px]">
                {user.name || user.userName}
              </h1>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[10px] gap-[5px]">
        <h1 className="text-white font-bold text-[25px]">Pingzy</h1>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px]">
            Hii , {userData.name || "user"}
          </h1>
          <div
            className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center  shadow-gray-500 shadow-lg cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData.image || dp}
              alt="profile image"
              className="h-[100%]"
            />
          </div>
        </div>

        <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[15px] no-scrollbar">
          {!search && (
            <div
              className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg cursor-pointer sticky left-0 z-10 shrink-0"
              onClick={() => setSearch(true)}
            >
              <FaSearch className="w-[25px] h-[25px] " />
            </div>
          )}

          {search && (
            <form className="w-full h-[50px] bg-white shadow-gray-500 shadow-md flex items-center gap-[10px] mt-[12px] rounded-full overflow-hidden px-[20px] ">
              <FaSearch className="w-[25px] h-[25px] cursor-pointer" />
              <input
                type="text"
                placeholder="search users..."
                className="w-full h-full outline-none border-0 text-[17px]"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => {
                  setSearch(false);
                  setInput("");
                  dispatch(setSearchData([]));
                }}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div className="relative">
                    <div
                      key={user._id}
                      className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center  shadow-gray-500 shadow-lg"
                      onClick={() => dispatch(setSelectedUser(user))}
                    >
                      <img
                        src={user.image || dp}
                        alt="profile image"
                        className="h-[100%]"
                      />
                    </div>
                    <span className="w-[15px] h-[15px] rounded-full bg-[#0bed0bd3] absolute bottom-0 right-0"></span>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="overflow-y-auto no-scrollbar flex flex-col gap-[20px] items-center mt-[20px] px-2 pb-4 min-h-0 max-h-[calc(100vh-350px)]">
        {otherUsers?.map((user) => (
          <div
            className="w-[95%] h-[60px] bg-white rounded-full flex justify-start items-center shadow-gray-500 shadow-md gap-[20px] cursor-pointer hover:bg-[#e1e8ea]"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative">
              <div
                key={user._id}
                className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center  shadow-gray-500 shadow-lg"
              >
                <img
                  src={user.image || dp}
                  alt="profile image"
                  className="h-[100%]"
                />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="w-[15px] h-[15px] rounded-full bg-[#0bed0bd3] absolute bottom-0 right-0"></span>
              )}
            </div>

            <h1 className="text-gray-800 font-semibold text-[20px]">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
