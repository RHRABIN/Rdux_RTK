import React, { useEffect, useState } from "react";
import {
  useAddMemberMutation,
  useGetUserQuery,
  useGetMemberQuery,
  useGetSingleMemberByEmailQuery,
} from "../../features/tems/teamApi";
import Select from "react-select";
import { toast } from "react-toastify";
import isValidEmail from "../../ui/isValidEmail";

const AddMember = ({
  showAddMemberModal,
  setShowAddMemberModal,
  setShow,
  deleteId: cardId,
}) => {
  const [user, setUser] = useState("");
  const [userCheck, setUserCheck] = useState(false);
  const [addEmail, setAddEmail] = useState("");

  const { data: members, isLoading: getMemberLoading } = useGetMemberQuery();

  const { data: isEmailExists } = useGetSingleMemberByEmailQuery(cardId, {
    skip: !userCheck,
  });

  const { data: users, isLoading, isError } = useGetUserQuery();

  const [addMember, { isLoading: addLoading, isError: addError, isSuccess }] =
    useAddMemberMutation();
  console.log(isEmailExists);
  // useEffect(()=>{
  //   if(isEmailExists){

  //   }
  // },[isEmailExists])

  let content = "";
  // let options = [];

  if (isLoading || addLoading || getMemberLoading) {
    content = <div>Loading..</div>;
  }
  if ((!isLoading && isError) || addError) {
    content = <div className="text-red-400">There are something error</div>;
  }

  const finder = isEmailExists?.find((e) => e.email === addEmail);
  console.log("finder++++++", finder);

  const handleSearch = (value) => {
    if (isValidEmail(value)) {
      // check user API

      setUserCheck(true);
      setAddEmail(value);
    }
  };
  // const finder = isEmailExists?.filter((e) => e.email !== addEmail);
  // console.log(finder);
  const handleAdd = (e) => {
    e.preventDefault();

    if (!finder) {
      addMember({
        cardId: cardId,
        email: addEmail,
      });

      setShowAddMemberModal(false);
      setShow(false);
      toast.success("Member added");
    } else {
      toast.error("email already exists");
    }
  };

  return (
    <div>
      <div>
        <div
          // onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between">
            <h3 className="font-bold text-center text-lg text-secondary">
              Add Member
            </h3>
            <button
              className="bg-black text-white px-2 rounded font-bold"
              onClick={() => {
                setShowAddMemberModal(false);
                setShow(false);
              }}
            >
              Cancel
            </button>
          </div>
          {!content ? (
            <form onSubmit={handleAdd}>
              <select
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {users.map((item) => (
                  <option value={item.email}>{item.email}</option>
                ))}
              </select>
              <button
                type="submit"
                value="Submit"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full max-w- mt-6"
              >
                Add Member
              </button>
            </form>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMember;
