import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  status: "idle",
  error: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTaskPriority: (state, action) => {
      const {id, ...updates} = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem("tasks");
    },
    addStep: (state, action) => {
      const {taskId, step} = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        if (!task.steps) task.steps = [];
        task.steps.push({
          id: Date.now().toString(),
          title: step,
          completed: false,
        });
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    toggleStep: (state, action) => {
      const {taskId, stepId} = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task && task.steps) {
        const step = task.steps.find((step) => step.id === stepId);
        if (step) step.completed = !step.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setReminder: (state, action) => {
      const {taskId, reminder} = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.reminder = reminder;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setDueDate: (state, action) => {
      const {taskId, dueDate} = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.dueDate = dueDate;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setRepeat: (state, action) => {
      const {taskId, repeat} = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.repeat = repeat;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskPriority,
  clearTasks,
  addStep,
  toggleStep,
  setReminder,
  setDueDate,
  setRepeat,
} = taskSlice.actions;
export default taskSlice.reducer;
