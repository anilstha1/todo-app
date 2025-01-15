import {useState} from "react";
import {useDispatch} from "react-redux";
import {Bell, Calendar, Plus, Star, Trash2, X} from "lucide-react";
import {FaRepeat} from "react-icons/fa6";
import {
  addStep,
  toggleStep,
  setReminder,
  setDueDate,
  setRepeat,
} from "../store/slices/taskSlice";

function DetailsSection({
  task,
  setCurrentTask,
  toggleComplete,
  toggleImportant,
  handleDelete,
}) {
  const dispatch = useDispatch();
  const [newStep, setNewStep] = useState("");
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);

  if (!task) return null;

  const handleAddStep = () => {
    if (newStep.trim()) {
      dispatch(addStep({taskId: task.id, step: newStep.trim()}));
      setNewStep("");
    }
  };

  const handleSetReminder = (datetime) => {
    dispatch(setReminder({taskId: task.id, reminder: datetime}));
    setShowReminderPicker(false);
  };

  const handleSetDueDate = (date) => {
    dispatch(setDueDate({taskId: task.id, dueDate: date}));
    setShowDatePicker(false);
  };

  const handleSetRepeat = (option) => {
    dispatch(setRepeat({taskId: task.id, repeat: option}));
    setShowRepeatOptions(false);
  };

  return (
    <div className="w-full max-w-[452px] min-h-[calc(100vh-6rem)] pl-12 pt-[56px] bg-[#EEF6EF] dark:bg-[#2C2C2C] relative">
      <div className="w-full flex flex-col divide-y divide-[#496E4B33]">
        {/* Task header */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3 py-4">
            <div className="relative">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="peer w-5 h-5 rounded-sm border-2 border-black checked:border-green-500 checked:bg-green-500 appearance-none cursor-pointer"
              />
              <svg
                className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span
              className={`${
                task.completed ? "text-gray-400 line-through" : ""
              }`}
            >
              {task.title}
            </span>
          </div>
          <button
            onClick={() => toggleImportant(task.id)}
            className={`p-2 hover:bg-gray-100 rounded-lg ${
              task.important ? "text-black-500" : "text-gray-400"
            }`}
          >
            <Star
              className="h-5 w-5"
              fill={task.important ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Steps section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="h-6 w-6" />
            <input
              type="text"
              placeholder="Add Step"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddStep()}
              className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-500"
            />
          </div>
          {task.steps?.map((step) => (
            <div key={step.id} className="flex items-center gap-2 ml-6 mb-2">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() =>
                  dispatch(toggleStep({taskId: task.id, stepId: step.id}))
                }
                className="rounded-sm border-2 border-gray-300"
              />
              <span
                className={step.completed ? "line-through text-gray-500" : ""}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Reminder section */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex gap-2">
            <Bell className="h-6 w-6" />
            <span>Reminder</span>
          </div>
          {showReminderPicker ? (
            <input
              type="datetime-local"
              onChange={(e) => handleSetReminder(e.target.value)}
              className="border rounded px-2"
            />
          ) : (
            <button onClick={() => setShowReminderPicker(true)}>
              {task.reminder
                ? new Date(task.reminder).toLocaleString()
                : "Set Reminder"}
            </button>
          )}
        </div>

        {/* Due Date section */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex gap-2">
            <Calendar className="h-6 w-6" />
            <span>Due Date</span>
          </div>
          {showDatePicker ? (
            <input
              type="date"
              onChange={(e) => handleSetDueDate(e.target.value)}
              className="border rounded px-2"
            />
          ) : (
            <button onClick={() => setShowDatePicker(true)}>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "Add Due Date"}
            </button>
          )}
        </div>

        {/* Repeat section */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex gap-2">
            <FaRepeat className="h-6 w-6" />
            <span>Repeat</span>
          </div>
          {showRepeatOptions ? (
            <select
              onChange={(e) => handleSetRepeat(e.target.value)}
              className="border rounded px-2 py-1"
              value={task.repeat || ""}
            >
              <option value="">Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          ) : (
            <button onClick={() => setShowRepeatOptions(true)}>
              {task.repeat || "Set Repeat"}
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 w-full py-6 px-4 flex justify-between border-t border-[#496E4B33]">
        <button onClick={() => setCurrentTask(null)}>
          <X className="h-6 w-6" />
        </button>
        <span>Created Today</span>
        <button onClick={() => handleDelete(task.id)}>
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default DetailsSection;
