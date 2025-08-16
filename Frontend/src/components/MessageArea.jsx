import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { serverUrl } from "../../config";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { useEffect } from "react";

const MessageArea = () => {
  const { selectedUser, userData, socket } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let { messages } = useSelector((state) => state.message);
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const image = useRef();

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage == null) {
      return;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      dispatch(setMessages([...messages, msg]));
    });
    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div
      className={`lg:w-[70%] ${
        selectedUser ? "flex" : "hidden"
      } lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300 flex flex-col relative`}
    >
      {selectedUser && (
        <div className="w-full h-[100px] bg-[#0c7ea4] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[10px] gap-[20px] ">
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setSelectedUser(null))}
          >
            <IoMdArrowRoundBack className="h-[40px] w-[40px] text-white" />
          </div>

          <div
            className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center  shadow-gray-500 shadow-lg cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src={selectedUser?.image || dp}
              alt="profile image"
              className="h-[100%]"
            />
          </div>

          <h1 className="text-white font-semibold text-[20px]">
            {selectedUser?.name || selectedUser?.userName}
          </h1>
        </div>
      )}

      {selectedUser && (
        <div className="w-full h-[78vh] overflow-auto no-scrollbar px-[20px] py-[50px] flex flex-col gap-[25px]">
          {messages &&
            messages.map((msg) =>
              msg.sender == userData._id ? (
                <SenderMessage image={msg.image} message={msg.message} />
              ) : (
                <RecieverMessage image={msg.image} message={msg.message} />
              )
            )}
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[50px] font-serif">
            Welcome to Pingzy
          </h1>
          <span className="text-gray-600 font-semibold text-[30px] font-mono">
            Chat Friendly...
          </span>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px]  flex items-center justify-center">
          <form
            className="w-[95%] lg:w-[70%] h-[60px] bg-[#0c7ea4] rounded-full shadow-gray-500 shadow-lg flex items-center gap-[20px] px-[10px]"
            onSubmit={handleSendMessage}
          >
            {frontendImage && (
              <div className="absolute bottom-[90px] right-[200px] bg-white p-2 rounded-lg shadow-lg flex items-center gap-2">
                <div className="relative">
                  <img
                    src={frontendImage}
                    alt="preview"
                    className="w-[80px] h-[80px] object-cover rounded-lg shadow"
                  />
                  <button
                    onClick={() => {
                      setFrontendImage(null);
                      setBackendImage(null);
                    }}
                    className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <div>
              <RiEmojiStickerLine
                className="w-[25px] h-[25px] text-white cursor-pointer"
                onClick={() => setShowEmoji((prev) => !prev)}
              />
            </div>

            {showEmoji && (
              <div className="absolute bottom-[80px] left-[10px] mb-[10px]">
                <EmojiPicker
                  width={250}
                  height={350}
                  className="shadow-lg"
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}

            <input
              type="text"
              placeholder="Message"
              className="w-full h-full bg-transparent outline-none placeholder-white text-white font-semibold"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />

            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />

            <div>
              <FaImages
                className="w-[25px] h-[25px] text-white cursor-pointer"
                onClick={() => image.current.click()}
              />
            </div>

            {(input.length > 0 || backendImage != null) && (
                <button>
                  <IoMdSend className="w-[25px] h-[25px] text-white cursor-pointer" />
                </button>
              )}
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
