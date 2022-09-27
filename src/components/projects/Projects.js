import React from "react";
import logo from "../../assests/images/logo.png";
import FooterLogo from "../../ui/FooterLogo";
import Header from "../../ui/Header";
import BackLog from "./BackLog";
import BlockedState from "./BlockedState";
import DoingState from "./DoingState";
import DoneState from "./DoneState";
import ReadyState from "./ReadyState";
import ReviewState from "./ReviewState";
const Projects = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <BackLog />
          <ReadyState />
          <DoingState />
          <ReviewState />
          <BlockedState />
          <DoneState />
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>

      {/* // footer */}
      <FooterLogo />
    </>
  );
};

export default Projects;
