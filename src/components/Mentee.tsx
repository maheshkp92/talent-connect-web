import React from "react";
import MentorCard from "./MentorCard";
import { useAuthStore } from "../store/useAuthStore";

const Mentee = () => {
  const user = useAuthStore((store) => store.user);
  return (
    <div className="flex justify-center my-3">
      <MentorCard user={user} />
    </div>
  );
};

export default Mentee;
