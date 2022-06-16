import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
// import { fetchTasks } from "../../redux/slices/tasks";

export default function Tasks() {
  const { value: taskboardDoc } = useSelector((state) => state.task);
  // const dispatch = useDispatch();

  // useEffect(() => {
    // console.log(taskboardDoc.tasks);
    // dispatch(fetchTasks(taskboardDoc.document));
  // },[]);

  return (
    <>
      {/* {console.log(taskboardDoc.tasks.tasks)} */}
      {taskboardDoc.tasks.map((task) => (
        <TaskItem task={task} key={task.date} />
      ))}
    </>
  );
}
