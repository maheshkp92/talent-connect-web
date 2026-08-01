import { useState } from "react";
import {
  BASE_URL,
  DEFAULT_PROFILE_IMG_URL,
  INDUSTRY_SUGGESTIONS,
  LEVEL_OPTIONS,
  SKILL_SUGGESTIONS,
  UserType,
} from "../utils/constants";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import type {
  ActiveTab,
  MenteeInterest,
  MentorSkill,
  User,
} from "../types/userDataTypes";
import MentorCard from "./MentorCard";
import MenteeCard from "./MenteeCard";

const EditProfile = ({ user }: { user: User }) => {
  const loginGlobal = useAuthStore((state) => state.login);

  const [firstName, setFirstName] = useState<string | undefined>(
    user?.firstName,
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.lastName);
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [photoUrl, setPhotoUrl] = useState<string>(
    user?.photoUrl || DEFAULT_PROFILE_IMG_URL,
  );
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    user?.industries || [],
  );
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menteeInterests, setMenteeInterests] = useState<MenteeInterest[]>(
    user?.menteeInterests || [
      { skillName: "", desiredLevel: "beginner", learningGoal: "" },
    ],
  );
  const defaultMentorSkills: MentorSkill[] = [
    {
      skillName: "NestJS",
      yearsOfExperience: 4,
      level: "advanced",
    },
  ];

  const [mentorSkills, setMentorSkills] = useState<MentorSkill[]>(
    user?.mentorSkills && user.mentorSkills.length > 0
      ? user.mentorSkills
      : defaultMentorSkills,
  );

  const showLearningTab = user?.userType === UserType.MENTEE;
  const showMentoringTab = user?.userType === UserType.MENTOR;
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  const handleMentorFieldChange = (
    index: number,
    field: keyof MentorSkill,
    value: string,
  ) => {
    const updatedSkills = mentorSkills.map((skill, idx) =>
      idx === index
        ? {
            ...skill,
            [field]: field === "yearsOfExperience" ? Number(value) : value,
          }
        : skill,
    );
    setMentorSkills(updatedSkills);
  };

  // Add an empty placeholder template row for new skillset blocks
  const addNewSkill = () => {
    setMentorSkills([
      ...mentorSkills,
      { skillName: "", yearsOfExperience: 1, level: "intermediate" },
    ]);
  };

  // Remove skill row item
  const removeSkill = (indexToRemove: number) => {
    setMentorSkills(mentorSkills.filter((_, index) => index !== indexToRemove));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const payload = {
        firstName,
        lastName,
        bio,
        photoUrl,
        industries: selectedIndustries,
        ...(user?.userType === UserType.MENTEE ? { menteeInterests } : {}),
        ...(user?.userType === UserType.MENTOR ? { mentorSkills } : {}),
      };

      const result = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
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
  const addIndustry = (industry: string) => {
    const cleaned = industry.trim();
    if (cleaned && !selectedIndustries.includes(cleaned)) {
      setSelectedIndustries([...selectedIndustries, cleaned]);
    }
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // Remove tag handler
  const removeIndustry = (indexToRemove: number) => {
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

  // Handle updates to specific fields inside a specific interest block
  const handleFieldChange = (
    index: number,
    field: keyof MenteeInterest,
    value: string,
  ) => {
    const updatedInterests = [...menteeInterests];
    updatedInterests[index][field] = value;
    setMenteeInterests(updatedInterests);
  };

  // Add an empty template block for a new skill
  const addNewInterest = () => {
    setMenteeInterests([
      ...menteeInterests,
      { skillName: "", desiredLevel: "beginner", learningGoal: "" },
    ]);
  };

  // Remove an interest block completely
  const removeInterest = (indexToRemove: number) => {
    setMenteeInterests(
      menteeInterests.filter((_, index) => index !== indexToRemove),
    );
  };
  return (
    <>
      <div className="flex justify-center my-10 px-4">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="w-full">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <legend className="fieldset-legend">Edit Profile</legend>

              <div className="tabs tabs-boxed mb-4 overflow-x-auto">
                <button
                  type="button"
                  className={`tab ${activeTab === "profile" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                {showLearningTab && (
                  <button
                    type="button"
                    className={`tab ${activeTab === "learning" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("learning")}
                  >
                    Learning Interests
                  </button>
                )}
                {showMentoringTab && (
                  <button
                    type="button"
                    className={`tab ${activeTab === "mentoring" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("mentoring")}
                  >
                    Mentor Skills
                  </button>
                )}
              </div>

              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div>
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Photo URL</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Photo URL"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="About"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <div>
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
                          onBlur={() =>
                            setTimeout(() => setIsDropdownOpen(false), 200)
                          }
                          className="flex-1 min-w-30 bg-transparent outline-none text-sm text-base-content"
                        />
                      </div>

                      {isDropdownOpen && filteredSuggestions.length > 0 && (
                        <ul className="dropdown-content menu z-1 p-2 shadow bg-base-100 rounded-box w-full max-h-48 overflow-y-auto mt-1 border border-base-content/10 block">
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
                  </div>
                </div>
              )}

              {activeTab === "learning" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-base-content">
                      Learning Interests
                    </h3>
                    <p className="text-sm text-base-content/60">
                      Detail the specific skills you want to master with your
                      mentor.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {menteeInterests.map((interest, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-base-content/10 bg-base-50/30 relative group transition-all hover:border-primary/30"
                      >
                        {menteeInterests.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInterest(index)}
                            className="absolute top-3 right-3 btn btn-ghost btn-xs btn-circle text-error"
                            aria-label="Remove skill block"
                          >
                            ✕
                          </button>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="form-control w-full">
                            <label className="label py-1">
                              <span className="label-text font-medium text-xs">
                                Skill / Technology
                              </span>
                            </label>
                            <select
                              className="select select-bordered select-sm w-full font-medium"
                              value={interest.skillName}
                              onChange={(e) =>
                                handleFieldChange(
                                  index,
                                  "skillName",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="" disabled>
                                Select a skill...
                              </option>
                              {SKILL_SUGGESTIONS.map((skill) => (
                                <option key={skill} value={skill}>
                                  {skill}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-control w-full">
                            <label className="label py-1">
                              <span className="label-text font-medium text-xs">
                                Target Proficiency
                              </span>
                            </label>
                            <select
                              className="select select-bordered select-sm w-full font-medium capitalize"
                              value={interest.desiredLevel}
                              onChange={(e) =>
                                handleFieldChange(
                                  index,
                                  "desiredLevel",
                                  e.target.value,
                                )
                              }
                            >
                              {LEVEL_OPTIONS.map((level) => (
                                <option key={level} value={level}>
                                  {level}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-control w-full">
                          <label className="label py-1">
                            <span className="label-text font-medium text-xs">
                              Learning Goal & Context
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered textarea-sm w-full h-20 text-sm leading-relaxed"
                            placeholder="What exactly do you want to build or understand with a mentor?"
                            value={interest.learningGoal}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "learningGoal",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addNewInterest}
                    className="btn btn-outline btn-primary btn-sm gap-2"
                  >
                    <span className="text-base">+</span> Add Another Skill
                  </button>
                </div>
              )}

              {activeTab === "mentoring" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-base-content">
                      Expertise & Skills
                    </h3>
                    <p className="text-sm text-base-content/60">
                      List the technologies you are comfortable teaching and
                      your level of mastery.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {mentorSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-end gap-3 p-4 rounded-xl border border-base-content/10 bg-base-50/20 relative group transition-all hover:border-primary/30"
                      >
                        <div className="form-control w-full sm:flex-1">
                          <label className="label py-1">
                            <span className="label-text font-medium text-xs">
                              Skill / Tool
                            </span>
                          </label>
                          <select
                            className="select select-bordered select-sm w-full font-medium"
                            value={skill.skillName}
                            onChange={(e) =>
                              handleMentorFieldChange(
                                index,
                                "skillName",
                                e.target.value,
                              )
                            }
                          >
                            <option value="" disabled>
                              Select skill...
                            </option>
                            {SKILL_SUGGESTIONS.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-control w-full sm:w-32">
                          <label className="label py-1">
                            <span className="label-text font-medium text-xs">
                              Experience
                            </span>
                          </label>
                          <div className="join w-full">
                            <input
                              type="number"
                              min="0"
                              max="40"
                              className="input input-bordered input-sm join-item w-full font-medium text-center"
                              value={skill.yearsOfExperience}
                              onChange={(e) =>
                                handleMentorFieldChange(
                                  index,
                                  "yearsOfExperience",
                                  e.target.value,
                                )
                              }
                            />
                            <span className="bg-base-200 border border-bordered px-3 flex items-center text-xs join-item font-semibold text-base-content/70">
                              Yrs
                            </span>
                          </div>
                        </div>

                        <div className="form-control w-full sm:w-40">
                          <label className="label py-1">
                            <span className="label-text font-medium text-xs">
                              Your Level
                            </span>
                          </label>
                          <select
                            className="select select-bordered select-sm w-full font-medium capitalize"
                            value={skill.level}
                            onChange={(e) =>
                              handleMentorFieldChange(
                                index,
                                "level",
                                e.target.value,
                              )
                            }
                          >
                            {LEVEL_OPTIONS.map((lvl) => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                        </div>

                        {mentorSkills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="btn btn-ghost btn-sm btn-circle text-error sm:mb-0.5"
                            aria-label="Delete experience block"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addNewSkill}
                    className="btn btn-outline btn-primary btn-sm gap-2"
                  >
                    <span className="text-base">+</span> Add Technical Skill
                  </button>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-red-500">{error}</p>
                <button className="btn btn-neutral" onClick={saveProfile}>
                  Save
                </button>
              </div>
            </fieldset>
          </div>
          <div className="flex items-start justify-center">
            {user.userType === "mentor" ? (
              <MentorCard
                user={{
                  firstName,
                  lastName,
                  bio,
                  photoUrl,
                  industries: selectedIndustries,
                  mentorSkills,
                }}
              />
            ) : (
              <MenteeCard
                user={{
                  firstName,
                  lastName,
                  bio,
                  photoUrl,
                  industries: selectedIndustries,
                  menteeInterests,
                }}
              />
            )}
          </div>
        </div>
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
