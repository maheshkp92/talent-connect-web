import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("maheshpat@example.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("securePassword123");
  const [isLoginForm, setIsloginForm] = useState(true);
  const [role, setRole] = useState("mentee");
  const [error, setError] = useState("");

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/auth/login",
        {
          email: emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result?.data);
      //   dispatch(addUser(result.data));
      //   navigate("/");
    } catch (e: any) {
      setError(
        e?.response?.data?.message?.join("\n") || "Something Went Wrong!",
      );
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/auth/signup",
        {
          firstName,
          lastName,
          email: emailId,
          password,
          userType: role,
        },
        {
          withCredentials: true,
        },
      );
      console.log(result);
      //   dispatch(addUser(result?.data?.data));
      //   navigate("/profile");
    } catch (e: any) {
      setError(
        e?.response?.data?.message?.join("\n") || "Something Went Wrong!",
      );
    }
  };

  return (
    <div className="flex justify-center pt-2">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="email"
              className="input"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="email"
              className="input"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <span className="label-text font-medium mt-2">
              Choose your user type:
            </span>

            <div className="flex gap-6 my-1">
              {/* Mentee Option */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="user-role"
                  value="mentee"
                  className="radio radio-primary radio-sm"
                  checked={role === "mentee"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="text-sm font-medium">Mentee</span>
              </label>

              {/* Mentor Option */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="user-role"
                  value="mentor"
                  className="radio radio-primary radio-sm"
                  checked={role === "mentor"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="text-sm font-medium">Mentor</span>
              </label>
            </div>
          </>
        )}

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-white font-bold my-2 text-center cursor-pointer"
          onClick={() => setIsloginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New User? Sign Up Here"
            : "Existing User? Sign In Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
