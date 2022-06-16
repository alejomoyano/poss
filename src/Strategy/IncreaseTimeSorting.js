class IncreaseTimeSorting {
  sort(tasks) {
    const arr = Array.from(tasks);
    for (let i = 0; i < length; i++) {
      console.log(i);
      for (let j = 0; j < length - i - 1; j++) {
        if (arr[j].creationTime > arr[j + 1].creationTime) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
}

const ITSorting = new IncreaseTimeSorting();

export default ITSorting;