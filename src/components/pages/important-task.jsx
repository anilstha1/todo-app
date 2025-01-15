import {useSelector} from "react-redux";
import BaseTaskList from "../task-list/base-task-list";

function ImportantTask() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const importantTasks = tasks.filter((task) => task.important);

  return (
    <BaseTaskList
      tasks={importantTasks}
      title="Important Tasks"
      allowAdd={false}
    />
  );
}

export default ImportantTask;
