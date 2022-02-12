const MS_IN_DAY = 24 * 60 * 60 * 1000;

function assign_color() {
  var calendar = CalendarApp.getDefaultCalendar();
  // begin one week before, end one year after
  var beginDate = new Date(new Date().getTime() - (7 * MS_IN_DAY));
  var endDate = new Date(new Date().getTime() + (52 * 7 * MS_IN_DAY));
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