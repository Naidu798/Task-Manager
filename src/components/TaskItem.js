import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const TaskItem = ({
  taskItem,
  setEditInput,
  setEditDescription,
  setShowEdit,
  deleteTask,
  changeTaskStatus,
  isMyTasksActive,
}) => {
  const getDateTime = (string) => {
    const dateTime = new Date(string);
    const dateTimeString = dateTime.toUTCString();
    const slicedString = dateTimeString.slice(0, dateTimeString.length - 4);
    return slicedString;
  };

  return (
    <div>
      <li className="bg-[#2f4e87] rounded-md px-2 py-2 text-lg my-3">
        <div className="flex items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row items-start md:items-center md:gap-3">
            <p>{taskItem.task}</p>
            {isMyTasksActive ? (
              <span className="text-sm">{`( Updated ${taskItem.updatedCount} ${
                taskItem.updatedCount === 1 ? "time" : "times"
              } )`}</span>
            ) : (
              <span className="text-sm text-gray-100">{`( Completed At : ${getDateTime(
                taskItem.completedAt
              )} )`}</span>
            )}
          </div>
          <div className="flex items-center gap-4 pr-2">
            {isMyTasksActive && (
              <MdModeEditOutline
                className="text-xl"
                onClick={() => {
                  setEditInput(taskItem.task);
                  setEditDescription(taskItem.description);
                  setShowEdit({ open: true, taskId: taskItem.id });
                }}
              />
            )}
            {isMyTasksActive && (
              <FaCheck
                className="text-xl text-green-600"
                onClick={() => changeTaskStatus(taskItem.id, new Date())}
              />
            )}
            <MdDeleteForever
              className="text-2xl text-red-400"
              onClick={() => deleteTask(taskItem.id)}
            />
          </div>
        </div>
        <p className="pl-3 text-sm text-gray-300 mt-1">
          {taskItem.description}
        </p>
      </li>
    </div>
  );
};

export default TaskItem;
