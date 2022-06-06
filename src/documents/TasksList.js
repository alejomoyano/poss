import { Document } from "firestorter";

export default class TasksList extends Document {
  constructor(path, options) {
    super(`tasksboards/${path}`, options);
  }

  // obtenemos todas las tasks del taskboard
  async fetchAllTasks() {
    return this.data;
  }
}
