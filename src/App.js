import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Projects from "./components/projects/Projects";
import Teams from "./components/team/Teams";
import PrivateRoute from "./ui/RequireAuth";
import useAuthCheck from "./components/hooks/useAuthCheck";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
