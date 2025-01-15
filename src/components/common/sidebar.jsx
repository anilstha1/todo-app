import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {FiPlus} from "react-icons/fi";
import DonutChart from "../donut-chart";

function Sidebar() {
  const location = useLocation();
  const tasks = useSelector((state) => state.tasks.tasks);
  const user = useSelector((state) => state.auth.user);

  // Calculate task statistics
  const allTasks = tasks.length;
  console.log(tasks);
  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate); // Using id as timestamp
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });
  const importantTasks = tasks.filter((task) => task.important).length;
  const completedTasks = todayTasks.filter((task) => task.completed).length;
  const pendingTasks = todayTasks.length - completedTasks;

  const chartData = {
    pending: pendingTasks,
    done: completedTasks,
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden lg:flex w-full max-w-[280px] flex-col mt-[102px] relative bg-[#EEF6EF] px-5 gap-[9px] dark:bg-[#2C2C2C] dark:text-white">
      <div className="w-[118px] h-[118px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src="/avatar.png"
          alt="avatar"
          className="w-[118px] h-[118px] rounded-full"
        />
        <h1 className="text-[15px] font-medium text-xl text-center mt-[14px] text-nowrap">
          hey, {user?.username || "Guest"}
        </h1>
      </div>

      <div className="flex flex-col bg-[#EEF6EF] dark:bg-[#232323] mt-[102px] py-6">
        <Link
          to="/"
          className={`px-4 py-2 text-[15px] font-medium text-xl flex gap-4 ${
            isActive("/") ? "bg-[#35793729] rounded-md text-[#357937]" : ""
          }`}
        >
          <img src="/icons/task.svg" alt="home" className="w-6 h-6" />
          All tasks ({allTasks})
        </Link>
        <Link
          to="/today-task"
          className={`px-4 py-2 text-[15px] font-medium text-xl flex gap-4 ${
            isActive("/today-task")
              ? "bg-[#35793729] rounded-md text-[#357937]"
              : ""
          }`}
        >
          <img src="/icons/calender.svg" alt="home" className="w-6 h-6" />
          Today ({todayTasks.length})
        </Link>
        <Link
          to="/important-task"
          className={`px-4 py-2 text-[15px] font-medium text-xl flex gap-4 ${
            isActive("/important-task")
              ? "bg-[#35793729] rounded-md text-[#357937]"
              : ""
          }`}
        >
          <img src="/icons/star.svg" alt="home" className="w-6 h-6" />
          Important ({importantTasks})
        </Link>
        <Link
          to="/profile"
          className={`px-4 py-2 text-[15px] font-medium text-xl flex gap-4 ${
            isActive("/planned")
              ? "bg-[#35793729] rounded-md text-[#357937]"
              : ""
          }`}
        >
          <img src="/icons/book.svg" alt="home" className="w-6 h-6" />
          Planned
        </Link>
        <Link
          to="/profile"
          className={`px-4 py-2 text-[15px] font-medium text-xl flex gap-4 ${
            isActive("/assigned-to-me")
              ? "bg-[#35793729] rounded-md text-[#357937]"
              : ""
          }`}
        >
          <img src="/icons/assigned.svg" alt="home" className="w-6 h-6" />
          Assigned to me
        </Link>
      </div>

      <div className="flex bg-white dark:bg-[#232323] py-6">
        <div className="px-4 py-2 text-[15px] font-medium text-xl flex gap-4">
          <FiPlus className="w-6 h-6" />
          <span>Add List</span>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-[#232323]">
        <div className="py-[18px] px-[20px] border-b border-b-[#F0F0F0] dark:border-gray-600">
          <div className="flex justify-between">
            <span>Today Tasks</span>
            <span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="8.75532" cy="8.52503" r="7.97749" fill="#BDBDBD" />
                <rect
                  x="7.42554"
                  y="6.75226"
                  width="2.65916"
                  height="7.09109"
                  rx="1.32958"
                  fill="white"
                />
                <rect
                  x="7.42554"
                  y="3.2067"
                  width="2.65916"
                  height="2.65916"
                  rx="1.32958"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-semibold">{todayTasks.length}</div>
        </div>

        <div className="p-4 flex items-center justify-center">
          <DonutChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
