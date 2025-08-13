import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../config";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser()
  }, []);
};

export default useCurrentUser;
