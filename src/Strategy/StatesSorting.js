class StatesSorting {
  sort(tasks) {
    console.log(tasks)
    const arr = Array.from(tasks);
    const temp = [];
    const states = ["active", "pending", "suspended", "terminated"];
    const length = arr.length
    
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < length; i++) {
        if (arr[i].state === states[j]) {
          temp.push(arr[i]);
        }
      }
    }
    console.log(temp)

    return temp;
  }
}

export default StatesSorting;
