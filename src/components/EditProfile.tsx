import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const EditProfile = ({ user }) => {
  const loginGlobal = useAuthStore((state) => state.login);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [bio, setBio] = useState(user?.bio || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showToast, setShowToast] = useState(false);
  //   const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const result = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, bio, photoUrl },
        { withCredentials: true },
      );
      //   console.log(result?.data?.data);
      loginGlobal(result?.data?.data);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (e: any) {
      setError(e?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="justify-center mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="label">Bio</label>
            <input
              type="text"
              className="input"
              placeholder="About"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <p className="text-red-500">{error}</p>
            <button className="btn btn-neutral mt-4" onClick={saveProfile}>
              Save
            </button>
          </fieldset>
        </div>
        {/* <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        /> */}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
