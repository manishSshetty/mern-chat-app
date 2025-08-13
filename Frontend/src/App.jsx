import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/Login";
import useCurrentUser from "./Hooks/useCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import useOtherUser from "./Hooks/useOtherUser";

const App = () => {
  useCurrentUser();
  useOtherUser();
  const { userData } = useSelector((state) => state.user);
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
