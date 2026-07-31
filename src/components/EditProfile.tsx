import React, { useState } from "react";
import {
  BASE_URL,
  DEFAULT_PROFILE_IMG_URL,
  INDUSTRY_SUGGESTIONS,
} from "../utils/constants";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const EditProfile = ({ user }) => {
  const loginGlobal = useAuthStore((state) => state.login);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [bio, setBio] = useState(user?.bio || "");
  const [photoUrl, setPhotoUrl] = useState(
    user?.photoUrl || DEFAULT_PROFILE_IMG_URL,
  );
  const [showToast, setShowToast] = useState(false);
  //   const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState(
    user?.industries,
  );
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const saveProfile = async () => {
    // console.log(selectedIndustries);
    setError("");
    try {
      const result = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, bio, photoUrl, industries: selectedIndustries },
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

  // Add tag handler
  const addIndustry = (industry) => {
    const cleaned = industry.trim();
    if (cleaned && !selectedIndustries.includes(cleaned)) {
      setSelectedIndustries([...selectedIndustries, cleaned]);
    }
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // Remove tag handler
  const removeIndustry = (indexToRemove) => {
    setSelectedIndustries(
      selectedIndustries.filter((_, index) => index !== indexToRemove),
    );
  };

  // Filter out already selected options
  const filteredSuggestions = INDUSTRY_SUGGESTIONS.filter(
    (item) =>
      item.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedIndustries.includes(item),
  );

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

            <label className="label flex flex-col items-start gap-1 p-0">
              <span className="label-text font-semibold text-base-content">
                Industries & Interests
              </span>
              <span className="label-text-alt text-base-content/60">
                Select industries you want to mentor or learn about.
              </span>
            </label>
            <div className="dropdown w-full">
              <div
                className="flex flex-wrap gap-2 items-center p-2 min-h-12 w-full rounded-lg border border-base-content/20 bg-base-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all cursor-text"
                onClick={() => setIsDropdownOpen(true)}
              >
                {/* Active Tags */}
                {selectedIndustries.map((industry, index) => (
                  <div
                    key={index}
                    className="badge badge-primary badge-md gap-1 py-3 px-2.5 font-medium animate-fade-in"
                  >
                    <span>{industry}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeIndustry(index);
                      }}
                      className="btn btn-ghost btn-xs btn-circle text-primary-content hover:bg-primary-focus p-0 min-h-0 h-4 w-4"
                      aria-label={`Remove ${industry}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Text Input Block */}
                <input
                  type="text"
                  placeholder={
                    selectedIndustries.length === 0
                      ? "e.g. Fintech, SaaS..."
                      : ""
                  }
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputValue) {
                      e.preventDefault();
                      addIndustry(inputValue);
                    }
                  }}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay lets dropdown click register
                  className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-base-content"
                />
              </div>

              {/* Dynamic daisyUI Suggestion Dropdown Menu */}
              {isDropdownOpen && filteredSuggestions.length > 0 && (
                <ul className="dropdown-content menu z-[1] p-2 shadow bg-base-100 rounded-box w-full max-h-48 overflow-y-auto mt-1 border border-base-content/10 block">
                  {filteredSuggestions.map((item, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onMouseDown={() => addIndustry(item)}
                        className="w-full text-left py-2 px-3 hover:bg-base-200 transition-colors"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
