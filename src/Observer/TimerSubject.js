class TimerSubject {
  subscriberList = {};

  notify() {
    this.subscriberList.map((subscriptor) => {
      subscriptor.update();
    });
  }

  subscribe(subscriptor) {
    this.subscriberList = { ...subscriberList, subscriptor };
  }
}

export default TimerSubject;
