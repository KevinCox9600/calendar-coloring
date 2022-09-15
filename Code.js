const MS_IN_DAY = 24 * 60 * 60 * 1000;
const COLORS = CalendarApp.EventColor;
const DAYS_BEFORE = 7 * MS_IN_DAY;
const DAYS_AFTER = 3 * 30 * MS_IN_DAY; // 3 months
const textColorPairs = [
  // Default color changes
  {
    regex: /^w /i, // Work
    remove: true,
    color: COLORS.BLUE,
  },
  {
    regex: /^s /i, // Social
    remove: true,
    color: COLORS.CYAN,
  },
  {
    regex: /^p /i, // Productive
    remove: true,
    color: COLORS.GREEN,
  },
  {
    regex: /^e /i, // Exercise
    remove: true,
    color: COLORS.PALE_GREEN,
  },
  {
    regex: /^c /i, // Class
    remove: true,
    color: COLORS.PALE_RED,
  },
  {
    regex: /^f /i, // Fudge I just wasted time
    remove: true,
    color: COLORS.ORANGE,
  },
  {
    regex: /^g /i, // Gray
    remove: true,
    color: COLORS.GRAY,
  },
  {
    regex: /^a /i, // Alert
    remove: true,
    color: COLORS.RED,
  },
  // Keyword color changes
  {
    regex: /^sec\b/i, // Security (sec)
    remove: false,
    color: COLORS.BLUE
  },
  {
    regex: /^22\b/i, // CS22
    remove: false,
    color: COLORS.BLUE
  },
  {
    regex: /^((germ)|(grmn))\b/i, // german (germ/grmn)
    remove: false,
    color: COLORS.BLUE
  },
  {
    regex: /^(musc)\b/i, // music theory (musc)
    remove: false,
    color: COLORS.BLUE
  },
  {
    regex: /^-/i, // assignment
    remove: false,
    color: COLORS.RED
  }
];
addColorRule('emb', 'blue', true, false);
addColorRule('ds', 'blue', true, false);
addColorRule('eng', 'blue', true, false);
addColorRule('sign', 'blue', true, false);
addColorRule('cl', 'blue', true, false);

/** Generate the object to represent coloring texts. */
function addColorRule(text, color = 'red', useBoundary = false, remove = false) {
  const rule = {
    regex: new RegExp(`/^${text + useBoundary ? '\\b' : ''}`),
    remove,
    color: COLORS[color.toUpperCase()]
  };
  textColorPairs.push(rule);
}

function assign_color() {
  var calendar = CalendarApp.getDefaultCalendar();
  // begin one week before, end one year after
  var beginDate = new Date(new Date().getTime() - (DAYS_BEFORE));
  var endDate = new Date(new Date().getTime() + (DAYS_AFTER));
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