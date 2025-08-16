import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.png"

const SenderMessage = ({ image, message }) => {
  let scroll = useRef();
  let { userData } = useSelector((state) => state.user);

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [image, message]);

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-start gap-[10px]">
      <div ref={scroll} className="w-fit max-w-[500px] bg-[#0c7ea4] px-[20px] py-[10px] text-white text-[19px] rounded-2xl rounded-tr-none relative right-0 ml-auto shadow-lg flex flex-col gap-[10px]">
        {image && (
          <img
            src={image}
            className="w-[120px] rounded-lg"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
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
  );
};

export default SenderMessage;
