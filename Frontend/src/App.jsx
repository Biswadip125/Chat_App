import { useEffect, useState } from "react";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authUser = useSelector((store) => store.user.authUser);
  return (
    <Router>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
