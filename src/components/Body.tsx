import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Body = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
