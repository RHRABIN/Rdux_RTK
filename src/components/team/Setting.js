import React, { useRef, useState } from "react";
import AddMember from "./AddMember";
import DeleteTeamModal from "./DeleteTeamModal";
import SeeAllMember from "./SeeAllMember";

const Setting = ({ deleteId, show, setShow }) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAllMemberModal, setShowAllMemberModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      <div
        className={`bg-black bg-opacity-50 absolute inset-0 ${
          show ? "flex" : "hidden"
        } justify-center items-center h-100`}
      >
        <div className="bg-white max-w-sm py-2 px-3 rounded shadow-xl  w-[500px] ">
          <div className="flex justify-center">
            <span
              className="text-center bg-black px-2 py-1 text-white"
              onClick={() => setShow(false)}
            >
              Cancel
            </span>
          </div>
          <div className="">
            <p
              onClick={() => {
                setShowAddMemberModal(true);
              }}
              className="font-semibold hover:bg-slate-100 px-2"
            >
              Add Member
            </p>
            <p
              onClick={() => {
                setShowAllMemberModal(true);
              }}
              className="font-semibold hover:bg-slate-100 px-2"
            >
              See Member
            </p>
            <p
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className="font-semibold hover:bg-slate-100 px-2"
            >
              Delete Team
            </p>
          </div>
        </div>
        {showAddMemberModal && (
          <AddMember
            showAddMemberModal={showAddMemberModal}
            setShowAddMemberModal={setShowAddMemberModal}
            setShow={setShow}
            deleteId={deleteId}
          />
        )}
        {showAllMemberModal && (
          <SeeAllMember
            showAllMemberModal={showAllMemberModal}
            setShowAllMemberModal={setShowAllMemberModal}
            setShow={setShow}
            deleteId={deleteId}
          />
        )}
        {showDeleteModal && (
          <DeleteTeamModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setShow={setShow}
            deleteId={deleteId}
          />
        )}
      </div>
    </div>
  );
};

export default Setting;
