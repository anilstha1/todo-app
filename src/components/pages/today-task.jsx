import {useSelector} from "react-redux";
import BaseTaskList from "../task-list/base-task-list";

function TodayTask() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  return <BaseTaskList tasks={todayTasks} title="Today's Tasks" />;
}

export default TodayTask;
