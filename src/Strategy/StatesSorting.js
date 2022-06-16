class StatesSorting {
  sort(tasks) {
    const arr = Array.from(tasks);
    const temp = [];
    const states = ["active", "pending", "suspended", "terminated"];

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < length; i++) {
        if (arr[i].state === states[j]) {
          temp.push(arr[i]);
        }
      }
    }
    return temp;
  }
}


const statesSorting = new StatesSorting();

export default statesSorting;
