function assign_color() {
  var events = calendar.getEvents(beginDate, endDate);
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();
    if (/Submission:/.test(title)) {
      event.setColor('3');
    } else if (/Test:/.test(title)) {
      event.setColor('5');
    } else if (/Subscription:/.test(title)) {
      event.setColor('9');
    } else { }
  }
}