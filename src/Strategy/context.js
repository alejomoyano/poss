import DTSorting from "./DecreaseTimeSorting";
import ITSorting from "./IncreaseTimeSorting";
import statesSorting from "./StatesSorting";

function sortTasks(type, tasks) {
  switch (type) {
    case "decrease":
      return DTSorting.sort(tasks);
    case "increase":
      return ITSorting.sort(tasks);
    case "states":
      return statesSorting.sort(tasks);
  }
}

export default sortTasks;