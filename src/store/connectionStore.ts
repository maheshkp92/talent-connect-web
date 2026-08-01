import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../utils/constants";

// Define the Store properties and actions
interface ConnectUserState {
  connectionUsers: any[];
  isLoading: boolean;
  error: string | null;
  fetchConnectionUsers: () => Promise<void>;
}

export const connectionStore = create<ConnectUserState>((set) => ({
  // Initial States
  connectionUsers: [],
  isLoading: false,
  error: null,

  // Async Action to Fetch and Store API Data
  fetchConnectionUsers: async () => {
    set({ isLoading: true, error: null }); // Reset states before fetching
    try {
      const response = await axios.get<any>(BASE_URL + "/request/connections", {
        withCredentials: true,
      });
      set({ connectionUsers: response?.data, isLoading: false }); // Store response
    } catch (err: any) {
      set({ error: err.message || "Something went wrong", isLoading: false });
    }
  },
}));
