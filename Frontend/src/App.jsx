import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/Login";
import useCurrentUser from "./Hooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import useOtherUser from "./Hooks/useOtherUser";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "../config";
import { setOnlineUsers, setSocket } from "./redux/userSlice";

const App = () => {
  useCurrentUser();
  useOtherUser();
  const { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    if(userData){
    const socketio = io(`${serverUrl}`, {
      query: {
        userId: userData?._id,
      },
    });
    dispatch(setSocket(socketio))
    socketio.on("getOnlineUsers",(users)=>{
      dispatch(setOnlineUsers(users))
    })
    return ()=>socketio.close()
  }else{
    if(socket){
      socket.close()
      dispatch(setSocket(null))
    }
  }
  }, [userData]);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/profile" />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/Login" />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/SignUp" />}
      />
    </Routes>
  );
};

export default App;
