import React from "react";

const MentorCard = ({ user }) => {
  const { photoUrl, firstName, lastName, bio, skills, _id } = user;
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure className="mx-auto my-4 w-44 h-44 overflow-hidden rounded-xl">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt="user-profile-pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {skills && <p>Skills: {skills}</p>}
        <p>{bio}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            // onClick={() => handleSendReuqest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            // onClick={() => handleSendReuqest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
