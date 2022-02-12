function assign_color() {
  var calendar = CalendarApp.getDefaultCalendar();
  // begin one week before, end one year after
  var beginDate = new Date(new Date().getTime() - (7 * 86400000));
  var endDate = new Date(new Date().getTime() + (52 * 7 * 86400000));
  var events = calendar.getEvents(beginDate, endDate);

  const textColorPairs = [
    {
      regex: /Test: /,
      remove: true,
      color: '5',
    }
  ];

  for (let i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();
    // color pairs and change titles appropriately
    for (const textColorPair of textColorPairs) {
      if (textColorPair.regex.test(title)) {
        event.setColor(textColorPair.color);
        if (textColorPair.remove) {
          const newTitle = title.replace(textColorPair.regex, '');
          event.setTitle(newTitle);
        }
      }
    }
  }
}