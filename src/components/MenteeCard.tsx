import axios from "axios";
import React from "react";
import { mentorStore } from "../store/mentorStore";
import { BASE_URL, DEFAULT_PROFILE_IMG_URL } from "../utils/constants";

const MenteeCard = ({ user }) => {
  if (!user) {
    return null;
  }

  const removeUser = mentorStore((state) => state.removeUser);
  const {
    photoUrl,
    firstName,
    lastName,
    bio,
    industries,
    _id,
    menteeInterests,
  } = user;

  const handleSendRequest = async () => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + _id,
        {},
        { withCredentials: true },
      );
      removeUser(_id);
    } catch (error) {
      console.error("Failed to send request", error);
    }
  };
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure className="mx-auto my-4 w-44 h-44 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          src={photoUrl || DEFAULT_PROFILE_IMG_URL}
          alt="user-profile-pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{bio}</p>

        {industries && industries.length > 0 && (
          <div className="mb-3">
            <p className="font-semibold text-base">Industry to learn about</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {industries.map((industry, index) => (
                <span
                  key={`${industry}-${index}`}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
        {menteeInterests && menteeInterests.length > 0 && (
          <div className="space-y-3 mb-4">
            <p className="font-semibold text-base">Learning Interests</p>
            <div className="grid gap-3">
              {menteeInterests.map((interest, index) => (
                <div
                  key={`${interest.skillName}-${index}`}
                  className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-sm text-primary">
                      {interest.skillName}
                    </div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {interest.desiredLevel}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-base-content/70">
                    {interest.learningGoal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleSendRequest}>
            Reject
          </button>
          <button className="btn btn-secondary" onClick={handleSendRequest}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeCard;
