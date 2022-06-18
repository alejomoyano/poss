import React from "react";
import ItemBreak from "./ItemBreak";
import ItemStudy from "./ItemStudy";

import { useSelector } from "react-redux";

export default function Tasks() {
  const { value: {tasks,timerState} } = useSelector((state) => state.task);
  
  return (
    <>
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
