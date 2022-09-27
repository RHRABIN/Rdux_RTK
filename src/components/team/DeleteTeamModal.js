import React from "react";
import { toast } from "react-toastify";
import { useDeleteTeamMutation } from "../../features/tems/teamApi";

const DeleteTeamModal = ({
  showDeleteModal,
  setShowDeleteModal,
  setShow,
  deleteId,
}) => {
  const [deleteTeam, isLoading, isError, isSuccess] = useDeleteTeamMutation();
  const handleDelete = () => {
    deleteTeam(deleteId);
    toast.success("This Team deleted");
  };

  let content = "";
  if (isLoading) {
    content = <div>Loading..</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400">There are something error</div>;
  }
  if (!isLoading && !isError && isSuccess) {
    alert("successfully delete");
  }

  return (
    <>
      <div>
        <div
          // onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-center">
            <h1 className="font-bold text-xl text-center  text-secondary">
              Delete Team
            </h1>
          </div>
          <div className="flex mt-20 gap-4 justify-center">
            <button
              className="bg-slate-500 text-white px-2 py-2 rounded font-bold"
              onClick={() => {
                setShowDeleteModal(false);
                setShow(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-red-400 text-white px-2 py-2 rounded font-bold"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTeamModal;
