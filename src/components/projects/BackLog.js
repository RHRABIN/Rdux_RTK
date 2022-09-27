import React, { useState } from "react";
import { useGetBackLogProjectsQuery } from "../../features/projects/projectsApi";
import AddProjectModal from "./AddProjectModal";
import FirstModal from "./FirstModal";

const BackLog = () => {
  const {
    data: backlogsProject,
    isLoading,
    isError,
  } = useGetBackLogProjectsQuery();

  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = (
      <p className="text-danger text-center">There are something error</p>
    );
  }
  if (!isLoading && !isError && backlogsProject?.length === 0) {
    content = <p className="text-danger text-center">There are no projects</p>;
  }
  if (!isLoading && !isError && backlogsProject?.length > 0) {
    content = backlogsProject?.map((project, _idx) => (
      <div
        key={_idx}
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        <button
          onClick={() => {
            setOpenFirstModal(true);
            setId(project.id);
          }}
          className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold text-[${project?.color}] bg-[${project?.color}]  bg-opacity-[0.2] rounded-full`}
        >
          {project?.name}
        </span>
        <h4 className="mt-3 text-sm font-medium">{project?.title}.</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">{project?.date}</span>
          </div>

          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={project?.url}
            alt={project?.name}
          />
        </div>
      </div>
    ));
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Backlog</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {backlogsProject?.length}
        </span>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
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
        </button>
      </div>
      <div className="flex flex-col pb-2 overflow-auto">{content}</div>

      {openFirstModal && (
        <FirstModal
          id={id}
          openFirstModal={openFirstModal}
          setOpenFirstModal={setOpenFirstModal}
        />
      )}
      {openModal && (
        <AddProjectModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default BackLog;
