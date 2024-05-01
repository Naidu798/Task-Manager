import React from "react";
import { RxCross2 } from "react-icons/rx";

const EditTask = ({
  setShowEdit,
  setEditInput,
  editInput,
  editDescription,
  setEditDescription,
  saveTodo,
}) => {
  return (
    <div className="bg-[#2a4d71] px-5 py-2 absolute top-[40%] left-[15%] md:left-[40%] md:h-[28vh] md:w-[25vw] h-[28vh] w-[70vw] rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-normal text-xl">Edit Task</h3>
        <RxCross2
          className="text-2xl"
          onClick={() => setShowEdit({ open: false, taskId: null })}
        />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <input
          className="h-8 w-full rounded-md text-gray-900 outline-none px-3"
          type="text"
          placeholder="Edit task"
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
        <input
          className="h-8 w-full rounded-md text-gray-900 outline-none px-3"
          type="text"
          placeholder="Edit Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <button
          className="bg-blue-700 rounded-md py-1.5 px-6 text-md mt-3 self-end"
          onClick={saveTodo}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
