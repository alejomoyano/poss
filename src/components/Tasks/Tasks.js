import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
// import { fetchTasks } from "../../redux/slices/tasks";

export default function Tasks() {
  const tasks = useSelector((state) => state.task.taskboard );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTasks())
  // },[dispatch])

  return (
    <>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </>
  );
}
