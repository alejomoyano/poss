import DecreaseTimeSorting from "./DecreaseTimeSorting";
import IncreaseTimeSorting from "./IncreaseTimeSorting";
import StatesSorting from "./StatesSorting";

class Sorting {
  /**
   * Metodo que ejecuta el algoritmo de ordenamiento elegido
   * @param tasks array de tareas a ordenar
   * @param type  tipo de algoritmo a usar
   * @returns tareas ordenadas
   */
  sortS(tasks, type) {
    if (type == "increase") {
      return new IncreaseTimeSorting().sort(tasks);
    }
    if (type == "decrease") {
      return new DecreaseTimeSorting().sort(tasks);
    }
    if (type == "states") {
      return new StatesSorting().sort(tasks);
    }
  }
}

export default Sorting;
