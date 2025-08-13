import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../config";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const useMessages = () => {
  let dispatch = useDispatch();
  let {userData,selectedUser} = useSelector((state) => state.user);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
          withCredentials: true,
        });
        dispatch(setMessages(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage()
  }, [selectedUser,userData]);
};

export default useMessages;
