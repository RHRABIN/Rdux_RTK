import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddTeamMutation } from "../../features/tems/teamApi";
import "./Modal.css";
const AddTeamModal = ({ setOpenModal, openModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const [addTeam, { isLoading, isError, isSuccess }] = useAddTeamMutation();

  const handleAdd = (e) => {
    e.preventDefault();

    const generatedDate = Date.now();
    addTeam({
      name,
      description,
      color,
      date: new Date().toDateString(),
    });
    setOpenModal(false);
  };
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isSuccess) {
    // alert("success");
  }
  return (
    <>
      <div
        className={`bg-black bg-opacity-50 absolute inset-0 ${
          openModal ? "flex" : "hidden"
        } justify-center items-center `}
      >
        <div className="bg-white max-w-sm py-2 px-3 rounded shadow-xl  w-[500px]">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-center text-lg text-secondary">
              Add Team
            </h3>
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              X
            </button>
          </div>

          <form
            className="grid grid-cols-1 gap-2 justify-items-center mt-10 w-full "
            onSubmit={handleAdd}
          >
            <input
              type="name"
              required
              className="input input-bordered w-full max-w-xs rounded-lg border border-red-300	outline-0  rounded py-4 px-2"
              placeholder="Team Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              required
              rows={4}
              type="description"
              placeholder="Add descriptions"
              name="email"
              className="textarea input-bordered rounded-lg border border-red-300 px-2 pt-2 w-full max-w-xs outline-0"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <HexColorPicker
              width={50}
              color={color}
              onChange={setColor}
              className="mt-4 "
            />

            <h4 className="font-bold">
              <span className={` text-[${color}]`}>{color}</span>
            </h4>

            <button
              type="submit"
              value="Submit"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full max-w-"
            >
              Add to team
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTeamModal;
