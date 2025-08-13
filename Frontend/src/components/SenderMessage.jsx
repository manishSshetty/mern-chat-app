import React from "react";

const SenderMessage = ({ image, message }) => {
  return (
    <div className="w-fit max-w-[500px] bg-[#0c7ea4] px-[20px] py-[10px] text-white text-[19px] rounded-2xl rounded-tr-none relative right-0 ml-auto shadow-lg flex flex-col gap-[10px]">
      {image && <img src={image} className="w-[120px] rounded-lg" />}

      {message && <span>{message}</span>}
    </div>
  );
};

export default SenderMessage;
