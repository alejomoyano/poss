class DecreaseTimeSorting {
  sort(tasks) {
    console.log(tasks)
    const arr = Array.from(tasks);
    const length = arr.length
    
    for (let i = 0; i < length; i++) {
      console.log(i);
      for (let j = 0; j < length - i - 1; j++) {
        if (arr[j].date < arr[j + 1].date) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    console.log(arr)

    return arr;
  }
}

export default DecreaseTimeSorting;