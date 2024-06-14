import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addDefaultLocale(ru);

export const Time = ({ date }: { date: string }) => {
  return (
    <span className="date">
      <ReactTimeAgo date={new Date(date)} locale="en-US" />
    </span>
  );
};
