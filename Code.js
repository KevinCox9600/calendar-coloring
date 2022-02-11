function assign_color() {
  var calendar = CalendarApp.getDefaultCalendar();
  // begin one week before, end one year after
  var beginDate = new Date(new Date().getTime() - (7 * 86400000));
  var endDate = new Date(new Date().getTime() + (52 * 7 * 86400000));
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