import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo.png";
import { userLoggedOut } from "../features/auth/authSlice";
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { name } = auth?.user;

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLoggedOut());
  };

  return (
    <div>
      <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75 justify-between">
        <div className="ml-10 flex gap-4 items-center">
          <img src={logo} className="h-10 w-10" />
          <Link
            className="mx-2 text-sm font-semibold text-indigo-700"
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
            to="/teams"
          >
            Team
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          {auth?.accessToken && (
            <button className="btn btn-xs btn-success" onClick={handleLogout}>
              Logout
            </button>
          )}
          {name && <p className="px-2 pb-0 bg-purple-200">{name}</p>}
          <buton className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
            <img
              src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
              alt=""
            />
          </buton>
        </div>
      </div>
    </div>
  );
};

export default Header;
