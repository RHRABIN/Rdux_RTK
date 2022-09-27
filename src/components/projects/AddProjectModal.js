import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddBackLogProjectMutation,
  useGetSingleUserQuery,
} from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/tems/teamApi";

const AddProjectModal = ({ openModal, setOpenModal }) => {
  const { email } = useSelector((state) => state.auth.user);

  const { data: teams, isLoading, isError } = useGetTeamQuery();
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetSingleUserQuery(email);

  const [title, setTitle] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    if (teams?.length > 0) {
      setId(teams[0]?.id);
    }
  }, [teams]);

  const [
    addBackLogProject,
    { isLoading: addLoading, isError: addError, isSuccess },
  ] = useAddBackLogProjectMutation();

  let content = null;
  if (isLoading || addLoading || userLoading) {
    return <p>Loading...</p>;
  }
  if ((!isLoading && isError) || userError || addError) {
    content = (
      <p className="text-danger text-center">There are something error</p>
    );
  }
  if (!isLoading && !isError && teams?.length === 0) {
    content = <p className="text-danger text-center">There are no projects</p>;
  }
  if (!isLoading && !isError && teams?.length > 0) {
    content = <p className="text-danger text-center">There are no projects</p>;
  }

  const handleAdd = (e) => {
    e.preventDefault();

    const team = teams.find((t) => t.id == id);

    const { color, name } = team;
    addBackLogProject({
      name: name,
      title,
      url: user[0]?.url,
      color: color,
      date: new Date().toDateString(),
    });
    setOpenModal(false);
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
              onClick={() => setOpenModal(false)}
              className="bg-black rounded px-2 py-1 text-white cursor-pointer"
            >
              Cancel
            </div>
          </div>
          <div className="flex mt-20 gap-4 justify-center">
            <form
              className="grid grid-cols-1 gap-2 justify-items-center mt-10 w-full "
              onSubmit={handleAdd}
            >
              <input
                type="name"
                required
                className="input input-bordered w-full max-w-xs rounded-lg border border-red-300	outline-0  rounded py-4 px-2"
                placeholder="Team Description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                value={id}
                onChange={(e) => setId(e.target.value)}
                id="countries"
                class="input input-bordered w-full max-w-xs rounded-lg border border-red-300	outline-0  rounded py-4 px-2"
              >
                {teams.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                value="Submit"
                class="btn bg-black text-white py-2 w-full max-w-xs rounded-lg"
              >
                Add to team
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
