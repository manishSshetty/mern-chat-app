import React, { useRef, useState } from "react";
import dp from "../assets/dp.png";
import { TiCameraOutline } from "react-icons/ti";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [frontEndImage, setFrontEndImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const image = useRef();
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setSaving(false);
      navigate("/")
    } catch (error) {
      console.log(`error:${error}`);
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col gap-[40px] items-center justify-center">
      <div
        className="fixed left-[10px] top-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoMdArrowRoundBack className="h-[40px] w-[40px] text-gray-600" />
      </div>

      <div
        className=" bg-white border-4 rounded-full border-[#20c7ff] shadow-gray-600 shadow-lg hover:shadow-inner relative"
        onClick={() =>image.current.click()}
      >
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">
          <img src={frontEndImage} alt="profile image" className="h-[100%]" />
        </div>
        <div className="absolute bottom-[15px] right-[20px] bg-[#20c7ff] w-[30px] h-[30px] rounded-full">
        <TiCameraOutline className="w-[100%] h-[100%] text-gray-700" />
        </div>
      </div>

      <form
        className="w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />

        <input
          type="text"
          placeholder="Enter your name"
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px]  shadow-gray-400 shadow-md outline-none text-gray-700 text-[19px]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          readOnly
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px]  shadow-gray-400 shadow-md outline-none text-gray-400 text-[19px]"
          value={userData?.userName}
        />
        <input
          type="email"
          readOnly
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] rounded-lg px-[20px] py-[10px]  shadow-gray-400 shadow-md outline-none text-gray-400 text-[19px]"
          value={userData?.email}
        />
        <button className=" w-[200px] px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl text-[20px]  shadow-gray-400 shadow-lg mt-[20px] font-semibold hover:shadow-inner" disabled={saving}>
          {saving?"Saving...":"Save"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
