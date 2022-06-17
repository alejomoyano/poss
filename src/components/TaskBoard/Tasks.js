import React from "react";
import ItemBreak from "./ItemBreak";
import ItemStudy from "./ItemStudy";

import { useSelector } from "react-redux";

export default function Tasks() {
  // const { value: taskboard } = useSelector((state) => state.task);
  const { value: {tasks,timerState} } = useSelector((state) => state.task);

  return (
    <>
      {/* {taskboard.tasks.map((task) =>
        taskboard.timerState == "break" ? (
          <TaskItemBreak task={task} key={task.date} />
        ) : (
          <TaskItemStudy task={task} key={task.date} />
        )
      )} */}
      {tasks.map((task) =>
        timerState == "break" ? (
          <ItemBreak task={task} key={task.date} />
        ) : (
          <ItemStudy task={task} key={task.date} />
        )
      )}
    </>
  );
}
