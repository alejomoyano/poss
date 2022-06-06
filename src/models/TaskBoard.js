import BaseDocument from "./BaseDocument";

class TaskBoard extends BaseDocument {
  
  static async add(content) {
    await this.set({
      content,
      state:'active'
    })
  }
  
  // le pasamos el mismo id que la sala? o hacemos usaa referencia en la room?
  static async create(id) {
    const taskboard = new TaskBoard(`tasksboards/${id}`);
    await taskboard.init();

    await taskboard.set({
      tasks: [{
        content:'TaskBoard -> add tasks as you want and give them a state',
        state:'active'
      }],
    });
    return taskboard;
  }
}

export default TaskBoard;