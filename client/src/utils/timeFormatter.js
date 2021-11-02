import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo("en-US");

export function parseDate(date) {
  date = Date.parse(date.split("T")[0]);
  return timeAgo.format(
    Date.now() - (Date.now() - Number(date)),
    "round-minute"
  );
}
