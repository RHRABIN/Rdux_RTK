import React, { useState } from "react";
import { useDeleteBacklogByIdMutation } from "../../features/projects/projectsApi";
import AddProjectModal from "./AddProjectModal";

const FirstModal = ({ setOpenFirstModal, id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteBacklogById, { isLoading, isError }] =
    useDeleteBacklogByIdMutation();

  let content = null;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = (
      <p className="text-danger text-center">There are something error</p>
    );
  }

  //handleDelete
  const handleDelete = () => {
    setOpenFirstModal(false);
    deleteBacklogById(id);
  };

  return (
    <>
      <div>
        <div
          // onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between">
            <h1 className="font-bold text-xl text-center  text-secondary">
              Add Project
            </h1>
            <div
              onClick={() => setOpenFirstModal(false)}
              className="bg-black rounded px-2 py-1 text-white cursor-pointer"
            >
              Cancel
            </div>
          </div>
          <div className="flex mt-20 gap-4 justify-center">
            <button
              onClick={handleDelete}
              className="bg-[#FF0000] text-white px-2 py-1 rounded"
            >
              Delete Project
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#00FF00] px-2 py-1 rounded text-red"
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <AddProjectModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default FirstModal;
