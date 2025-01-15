import {useState} from "react";
import {useDispatch} from "react-redux";
import {Bell, Calendar} from "lucide-react";
import {FaSortDown} from "react-icons/fa";
import {Star} from "lucide-react";
import {ThumbsDown} from "lucide-react";
import {
  addTask,
  deleteTask,
  updateTaskPriority,
} from "../../store/slices/taskSlice";
import DetailsSection from "../details-section";
import {useGrid} from "../../context/gridContext";

function BaseTaskList({tasks, title, allowAdd = true}) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const {view} = useGrid();

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title: newTask,
          completed: false,
          important: false,
          dueDate: new Date().toISOString(),
        })
      );
      setNewTask("");
    }
  };

  const toggleComplete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    dispatch(updateTaskPriority({id: taskId, completed: !task.completed}));
  };

  const toggleImportant = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    dispatch(updateTaskPriority({id: taskId, important: !task.important}));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    setCurrentTask(null);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="w-full max-w-[1056px] mx-auto p-6 pr-0 flex flex-col lg:flex-row gap-2">
      <div className="w-full flex flex-col">
        <div className="flex flex-row items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <FaSortDown className="h-4 w-4 ml-1 text-gray-600" />
        </div>

        {allowAdd && (
          <div className="bg-white dark:bg-transparent border-y border-y-[#496E4B33] py-4 w-full">
            <div
              className="h-auto lg:h-[178px]"
              style={{
                background:
                  "linear-gradient(180deg, #D0FFD21A 0%, #3579371A 100%)",
              }}
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <input
                  type="text"
                  placeholder="Add A Task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  className="w-full text-lg outline-none bg-transparent mb-4 lg:mb-0"
                />
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
                  <div className="flex gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Bell className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ThumbsDown className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <button
                    onClick={handleAddTask}
                    className="w-full lg:w-auto px-4 py-2 bg-[#35793729] text-[#347136] dark:text-white rounded-lg text-[15px] font-medium"
                  >
                    ADD TASK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            view === "list"
              ? "flex flex-col space-y-2 divide-y divide-[#496E4B33]"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          }`}
        >
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 ${
                view === "list" ? "" : "py-12 border border-[#496E4B33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="peer w-5 h-5 rounded-sm border-2 border-black dark:border-white appearance-none cursor-pointer"
                  />
                </div>
                <span
                  className="text-gray-700 dark:text-white cursor-pointer"
                  onClick={() => setCurrentTask(task)}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => toggleImportant(task.id)}
                className={`p-2 hover:bg-gray-100 rounded-lg ${
                  task.important ? "text-black" : "text-gray-400"
                }`}
              >
                <Star
                  className="h-5 w-5"
                  fill={task.important ? "currentColor" : "none"}
                />
              </button>
            </div>
          ))}
        </div>

        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Completed Tasks</h3>
            <div className="space-y-2 divide-y divide-gray-200">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between px-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="w-5 h-5 rounded-sm border-2 border-gray-300 checked:border-green-500 checked:bg-green-500"
                    />
                    <span
                      className="text-gray-400 line-through cursor-pointer"
                      onClick={() => setCurrentTask(task)}
                    >
                      {task.title}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleImportant(task.id)}
                    className={`p-2 hover:bg-gray-100 rounded-lg ${
                      task.important ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <Star
                      className="h-5 w-5"
                      fill={task.important ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {currentTask && (
        <div className="fixed inset-0 lg:relative lg:inset-auto z-50 lg:z-0">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setCurrentTask(null)}
          />
          <div className="absolute bottom-0 left-0 right-0 lg:relative lg:w-[452px]">
            <DetailsSection
              task={currentTask}
              setCurrentTask={setCurrentTask}
              toggleComplete={toggleComplete}
              toggleImportant={toggleImportant}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BaseTaskList;
