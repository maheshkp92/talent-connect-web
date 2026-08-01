import { useEffect } from "react";
import { mentorStore } from "../store/mentorStore";
import MentorCard from "./MentorCard";

const Mentee = () => {
  const users = mentorStore((state) => state.users);
  const isLoading = mentorStore((state) => state.isLoading);
  const error = mentorStore((state) => state.error);
  const fetchUsers = mentorStore((state) => state.fetchUsers);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex justify-center my-3">
      {isLoading && <p className="text-center">Loading mentors...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && users.length > 0 && (
        <MentorCard user={users[0]} />
      )}
      {!isLoading && !error && users.length === 0 && (
        <p className="text-center">No mentors available right now.</p>
      )}
    </div>
  );
};

export default Mentee;
