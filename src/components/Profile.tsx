import React from "react";
import EditProfile from "./EditProfile";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
