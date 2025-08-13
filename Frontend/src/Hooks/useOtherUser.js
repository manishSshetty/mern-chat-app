import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../config";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";

const useOtherUser = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/other`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser()
  }, [userData]);
};

export default useOtherUser;
