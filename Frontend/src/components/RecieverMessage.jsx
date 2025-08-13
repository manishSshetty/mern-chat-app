import React from "react";

const RecieverMessage = ({ image, message }) => {
  return (
    <div className="w-fit max-w-[500px] bg-[#20c7ff] px-[20px] py-[10px] text-white text-[19px] rounded-2xl rounded-tl-none relative left-0 shadow-lg flex flex-col gap-[10px]">
      {image && <img src={image} className="w-[120px] rounded-lg" />}

      {message && <span>{message}</span>}
    </div>
  );
};
export default RecieverMessage;
