import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../utils/constants";

interface menteeInterest {
  skillName: string;
  desiredLevel: string;
  learningGoal: string;
}

interface mentorSkills {
  skillName: string;
  yearsOfExperience: number;
  level: string;
}
// Define the structure of your User data
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  bio: string;
  photoUrl: string;
  industries: string[];
  menteeInterests?: menteeInterest[];
  mentorSkills?: mentorSkills[];
}

// Define the Store properties and actions
interface MentorUserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  removeUser: (userId: string) => void;
}

export const mentorStore = create<MentorUserState>((set) => ({
  // Initial States
  users: [],
  isLoading: false,
  error: null,

  // Async Action to Fetch and Store API Data
  fetchUsers: async () => {
    set({ isLoading: true, error: null }); // Reset states before fetching
    try {
      const response = await axios.get<any>(BASE_URL + "/request/suggestions", {
        withCredentials: true,
      });
      set({ users: response?.data?.mentors, isLoading: false }); // Store response
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", isLoading: false });
    }
  },

  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user._id !== userId),
    })),
}));
