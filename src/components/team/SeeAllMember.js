import React from "react";
import { useGetMemberQuery } from "../../features/tems/teamApi";

const SeeAllMember = ({
  showAllMemberModal,
  setShowAllMemberModal,
  setShow,
  deleteId,
}) => {
  const { data: members, isLoading, isError } = useGetMemberQuery(deleteId);

  let content = null;
  if (isLoading) {
    content = <div>Loading..</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400">There are something error</div>;
  }
  if (
    (!isLoading && !isError && members?.length === 0) ||
    members?.length === undefined
  ) {
    content = <div className="text-red-400">There is no member</div>;
  }
  if (!isLoading && !isError && members?.length > 0) {
    content = members?.map((user) => (
      <p className="mt-2 " key={user.id}>
        <div className="flex items-center gap-2">
          <img
            class="w-10 h-10 rounded-full"
            src={
              user?.url
                ? user.url
                : "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?size=338&ext=jpg&uid=R69068951&ga=GA1.2.1020109167.1664221492"
            }
            alt={user?.email}
          />
          <p>{user?.email}</p>
        </div>
      </p>
    ));
  }
  console.log(content);
  return (
    <div>
      <div
        // onClick={control}
        className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer flex justify-center items-center"
      ></div>
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between">
          <h3 className="font-bold text-center text-lg text-secondary">
            See All Member
          </h3>
          <button
            className="bg-black text-white px-2 rounded font-bold"
            onClick={() => {
              setShowAllMemberModal(false);
              setShow(false);
            }}
          >
            Cancel
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default SeeAllMember;
