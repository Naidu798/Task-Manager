import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditTask from "./EditTask";
import TaskItem from "./TaskItem";

const TaskManager = () => {
  const [todosList, setTodosList] = useState([]);
  const [completedTasksList, setCompletedTasksList] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showEdit, setShowEdit] = useState({ open: false, taskId: null });
  const [editInput, setEditInput] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isMyTasksActive, setIsMyTasksActive] = useState(true);

  const addTaskToList = () => {
    const taskItem = {
      id: uuidv4(),
      task: taskInput,
      description: taskDescription,
      updatedCount: 0,
    };
    setTodosList((prev) => [...prev, taskItem]);
    setTaskInput("");
    setTaskDescription("");

    localStorage.setItem("todosList", JSON.stringify([...todosList, taskItem]));
  };

  const addTaskItem = () => {
    if (taskInput.trim() === "" && taskDescription.trim() === "") {
      setTaskInput("");
      setTaskDescription("");
      alert("Please enter task details");
    } else if (taskInput.trim() === "") {
      setTaskInput("");
      alert("Please enter task name");
    } else if (taskDescription.trim() === "") {
      setTaskDescription("");
      alert("Please enter task description");
    } else {
      addTaskToList();
    }
  };

  const saveTask = () => {
    const updatedList = todosList.map((task) =>
      task.id === showEdit.taskId
        ? {
            ...task,
            updatedCount: task.updatedCount + 1,
            task: editInput,
            description: editDescription,
          }
        : task
    );
    setTodosList(updatedList);
    localStorage.setItem("todosList", JSON.stringify(updatedList));
    setShowEdit({ open: false, taskId: null });
  };

  const deleteTask = (id) => {
    if (isMyTasksActive) {
      const filteredList = todosList.filter((task) => task.id !== id);
      setTodosList([...filteredList]);
      localStorage.setItem("todosList", JSON.stringify([...filteredList]));
    } else {
      const filteredList = completedTasksList.filter((task) => task.id !== id);
      setCompletedTasksList([...filteredList]);
      localStorage.setItem("completedList", JSON.stringify([...filteredList]));
    }
  };

  const changeTaskStatus = (id, time) => {
    const filteredTodosList = [];
    let completedTask;
    todosList.forEach((task) => {
      if (task.id === id) {
        completedTask = { ...task, completedAt: time };
      } else {
        filteredTodosList.push(task);
      }
    });

    setTodosList(filteredTodosList);
    setCompletedTasksList((prev) => [...prev, completedTask]);

    localStorage.setItem("todosList", JSON.stringify(filteredTodosList));
    localStorage.setItem(
      "completedList",
      JSON.stringify([...completedTasksList, completedTask])
    );
  };

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todosList"));
    const completedList = JSON.parse(localStorage.getItem("completedList"));
    if (todosList) {
      setTodosList(todosList);
    }
    if (completedList) {
      setCompletedTasksList(completedList);
    }
  }, []);

  return (
    <div
      className={`relative w-screen h-screen flex justify-center items-start pt-10 text-white bg-[#3c6374]`}
    >
      <div
        className={`bg-[#1e1d66] px-3 md:px-6 py-4 rounded-lg w-[90%] h-[90vh] md:w-[60%] lg:w-[50%] ${
          showEdit.open && "blur"
        }`}
      >
        <h1 className="text-3xl md:text-4xl text-center mb-10 font-bold">
          Task Manager !
        </h1>
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <input
              type="text"
              className="h-10 w-full md:w-[50%] rounded-md outline-none text-gray-800 font-semibold px-3 text-md"
              placeholder="Enter Task Here"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <input
              type="text"
              className="h-10 w-full md:w-[50%] rounded-md outline-none text-gray-800 font-semibold px-3 text-md"
              placeholder="Enter Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          <button
            className="bg-blue-900 rounded-md py-1.5 px-6 text-md mt-3"
            onClick={addTaskItem}
          >
            Add Task
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button
            className={`mt-7 mb-3 text-xl font-semibold pb-2 ${
              isMyTasksActive
                ? "text-green-400 border-b-2 border-b-green-400"
                : ""
            }`}
            onClick={() => setIsMyTasksActive(true)}
          >
            My Tasks
          </button>
          <button
            className={`mt-7 mb-3 text-xl font-semibold pb-2 ${
              isMyTasksActive
                ? ""
                : "text-green-400 border-b-2 border-b-green-400"
            }`}
            onClick={() => setIsMyTasksActive(false)}
          >
            Completed
          </button>
        </div>
        <ul className="px-1 md:px-3 h-[50vh] overflow-auto custom-scrollbar">
          {isMyTasksActive &&
            (todosList.length > 0 ? (
              todosList.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    taskItem={task}
                    setEditInput={setEditInput}
                    setEditDescription={setEditDescription}
                    setShowEdit={setShowEdit}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                    isMyTasksActive={isMyTasksActive}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <span className="text-lg font-normal">No Tasks Here</span>
              </div>
            ))}
          {!isMyTasksActive &&
            (completedTasksList.length > 0 ? (
              completedTasksList.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    taskItem={task}
                    deleteTask={deleteTask}
                    isMyTasksActive={isMyTasksActive}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <span className="text-lg font-normal">No Tasks Here</span>
              </div>
            ))}
        </ul>
      </div>
      {showEdit.open && (
        <EditTask
          setEditInput={setEditInput}
          setShowEdit={setShowEdit}
          editInput={editInput}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          saveTodo={saveTask}
        />
      )}
    </div>
  );
};

export default TaskManager;
