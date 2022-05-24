import React from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

export default function Tasks() {
  const tasks = useSelector((tasks) => tasks.taskReducer);

  return (
    <>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </>
  );
}
