import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Mentee from "./components/Mentee";
import Mentor from "./components/Mentor";
import Connection from "./components/Connection";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentee" element={<Mentee />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/connections" element={<Connection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
