import React from "react";
import { DEFAULT_PROFILE_IMG_URL } from "../utils/constants";

const ConnectionCard = ({ info }) => {
  const { photoUrl, firstName, lastName, bio, industries } = info;
  return (
    <div className="card card-side bg-base-200 shadow-lg my-10 m-2">
      <figure className="w-50 h-50 overflow-hidden rounded-lg">
        <img
          src={photoUrl || DEFAULT_PROFILE_IMG_URL}
          alt="connection-profile"
          className="w-full h-full object-cover rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p className="text-left w-full">{bio}</p>
        <p className="text-left w-full">
          {[industries?.length ? `${industries.join(", ")}` : null]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </div>
    </div>
  );
};

export default ConnectionCard;
