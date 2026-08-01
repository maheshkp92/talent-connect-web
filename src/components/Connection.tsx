import React, { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import { connectionStore } from "../store/connectionStore";
import { useAuthStore } from "../store/useAuthStore";

const Connection = () => {
  const user = useAuthStore((state) => state.user);
  const connectionUsers = connectionStore((state) => state.connectionUsers);
  const isLoading = connectionStore((state) => state.isLoading);
  const error = connectionStore((state) => state.error);
  const fetchConnectionUsers = connectionStore(
    (state) => state.fetchConnectionUsers,
  );

  useEffect(() => {
    void fetchConnectionUsers();
  }, [fetchConnectionUsers]);

  return (
    <div className="text-center my-10">
      {isLoading && <p className="text-center">Loading mentors...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && connectionUsers.length > 0 ? (
        <>
          <h1 className="font-bold text-xl">Connections</h1>
          <div className="flex justify-evenly flex-wrap">
            {connectionUsers.map((item, index) => (
              <ConnectionCard
                key={index}
                info={
                  user?.userType === "mentor" ? item?.menteeId : item?.mentorId
                }
              />
            ))}
          </div>
        </>
      ) : (
        <h1 className="font-bold text-2xl">No Connection Found!</h1>
      )}
    </div>
  );
};

export default Connection;
