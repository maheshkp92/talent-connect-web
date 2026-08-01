import axios from "axios";
import React from "react";
import { mentorStore } from "../store/mentorStore";
import { BASE_URL, DEFAULT_PROFILE_IMG_URL } from "../utils/constants";

const MentorCard = ({ user }) => {
  if (!user) {
    return null;
  }

  const removeUser = mentorStore((state) => state.removeUser);
  const { photoUrl, firstName, lastName, bio, industries, _id, mentorSkills } =
    user;

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
        <h2 className="card-title">
          {firstName + " " + lastName} | {industries.join(", ")}
        </h2>
        <p>{bio}</p>
        {mentorSkills && mentorSkills.length > 0 && (
          <div className="space-y-3 mb-2">
            <p className="font-semibold">Skills</p>
            <div className="grid gap-2">
              {mentorSkills.map((skill, index) => (
                <div
                  key={`${skill.skillName}-${index}`}
                  className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 shadow-sm"
                >
                  <div className="font-semibold text-sm text-primary">
                    {skill.skillName}
                  </div>
                  <div className="mt-1 text-xs text-base-content/70">
                    {skill.level} • {skill.yearsOfExperience} yrs
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="card-actions justify-center">
          <button className="btn btn-secondary" onClick={handleSendRequest}>
            Send a request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
