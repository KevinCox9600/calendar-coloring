const MS_IN_DAY = 24 * 60 * 60 * 1000;
const COLORS = CalendarApp.EventColor;
const textColorPairs = [
  {
    regex: /[Ww] /, // Work
    remove: true,
    color: COLORS.BLUE,
  },
  {
    regex: /[Ss] /, // Social
    remove: true,
    color: COLORS.CYAN,
  },
  {
    regex: /[Pp] /, // Productive
    remove: true,
    color: COLORS.GREEN,
  },
  {
    regex: /[Ee] /, // Exercise
    remove: true,
    color: COLORS.PALE_GREEN,
  },
  {
    regex: /[Cc] /, // Class
    remove: true,
    color: COLORS.PALE_RED,
  },
  {
    regex: /[Ff] /, // Fudge I just wasted time
    remove: true,
    color: COLORS.ORANGE,
  },
  {
    regex: /[Gg] /, // Gray
    remove: true,
    color: COLORS.GRAY,
  },
  {
    regex: /[Aa] /, // Alert
    remove: true,
    color: COLORS.RED,
  },
];

function assign_color() {
  var calendar = CalendarApp.getDefaultCalendar();
  // begin one week before, end one year after
  var beginDate = new Date(new Date().getTime() - (7 * MS_IN_DAY));
  var endDate = new Date(new Date().getTime() + (52 * 7 * MS_IN_DAY));
  var events = calendar.getEvents(beginDate, endDate);

  for (let i = 0; i < events.length; i++) {
    var event = events[i];
    var title = event.getTitle();
    // color the events and change titles appropriately
    for (const textColorPair of textColorPairs) {
      if (textColorPair.regex.test(title)) {
        event.setColor(textColorPair.color);
        if (textColorPair.remove) {
          const newTitle = title.replace(textColorPair.regex, '');
          event.setTitle(newTitle);
        }
        Utilities.sleep(1000);
        break;
      }
    }
  }
}