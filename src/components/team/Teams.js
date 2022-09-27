import React, { useState } from "react";
import FooterLogo from "../../ui/FooterLogo";
import Header from "../../ui/Header";
import AddTeamModal from "./AddTeamModal";
import SingleTeam from "./SingleTeam";
import { useGetTeamQuery } from "../../features/tems/teamApi.js";

const Teams = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data: teams, isLoading, isError } = useGetTeamQuery();
  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (!isLoading && isError) {
    content = <p>There are something error</p>;
  }
  if (!isLoading && !isError && teams?.length === 0) {
    content = <p>There are No Team</p>;
  }
  if (!isLoading && !isError && teams?.length > 0) {
    content = teams?.map((team) => <SingleTeam key={team.id} team={team} />);
  }

  return (
    <div>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Header />{" "}
        <div className="px-10 mt-6 flex justify-between">
          <h1 className="text-2xl font-bold">Teams</h1>
          <label
            onClick={() => setOpenModal(!openModal)}
            data-modal-toggle="defaultModal"
            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100  modal-button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
          {" "}
          {content}{" "}
        </div>
      </div>
      {openModal && (
        <AddTeamModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <FooterLogo />
    </div>
  );
};

export default Teams;
