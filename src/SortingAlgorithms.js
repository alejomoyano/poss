tasks = [
  {
    creationTime: 1654399395305,
    content: "1",
    state: "activo",
  },
  {
    creationTime: 1654399395305 + 5,
    content: "4",
    state: "pendiente",
  },
  {
    creationTime: 1654399395305 + 2,
    content: "3",
    state: "suspendido",
  },
  {
    creationTime: 1654399395305 + 8,
    content: "5",
    state: "teminado",
  },
  {
    creationTime: 1654399395305 + 1,
    content: "2",
    state: "activo",
  },
];

const length = tasks.length;

// bubble sort - increase creation time sort
const increaseTimeSorting = () => {
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
};

// bubble sort - decrease creation time sort
const decreaseTimeSorting = () => {
  const arr = Array.from(tasks);
  for (let i = 0; i < length; i++) {
    console.log(i);
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j].creationTime < arr[j + 1].creationTime) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
};

// states sort
const statesSorting = () => {
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
};
