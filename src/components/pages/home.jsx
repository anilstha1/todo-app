import {useSelector} from "react-redux";
import BaseTaskList from "../task-list/base-task-list";

function Home() {
  const tasks = useSelector((state) => state.tasks.tasks);

  return <BaseTaskList tasks={tasks} title="All Tasks" />;
}

export default Home;
