import BaseDocument from "./BaseDocument";

class TaskBoard extends BaseDocument {
  // le pasamos el mismo id que la sala? o hacemos usaa referencia en la room?
  static async create(id) {
    const taskboard = new TaskBoard(`tasksboards/${id}`);
    await taskboard.init();

    await taskboard.setDoc({
      tasks: [],
    });
  }
}

export default TaskBoard;