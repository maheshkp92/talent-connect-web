import type { UserType } from "../utils/constants";

export type ActiveTab = "profile" | "learning" | "mentoring";

export type MentorSkill = {
  skillName: string;
  yearsOfExperience: number;
  level: string;
};

export type MenteeInterest = {
  skillName: string;
  desiredLevel: string;
  learningGoal: string;
};

export type User = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  photoUrl?: string;
  industries?: string[];
  menteeInterests?: MenteeInterest[];
  mentorSkills?: MentorSkill[];
  userType?: (typeof UserType)[keyof typeof UserType];
};
