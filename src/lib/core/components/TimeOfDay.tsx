import { stringify } from "querystring";

export interface TimeMessageProps {
  morning: React.ReactChild,
  afternoon: React.ReactChild,
  evening: React.ReactChild
}

export function TimeOfDay({ morning, afternoon, evening }: TimeMessageProps) {
  const time = new Date();
  const isMorning = time.getHours() < 12;
  const isAfternoon = !isMorning && time.getHours() < 15;
  const isEvening = !isAfternoon && !isMorning;

  switch (true) {
    case isMorning:
      return (<>{ morning }</>);
    case isAfternoon:
      return (<>{ afternoon }</>);
    case isEvening:
      return (<>{ evening }</>);
    default:
      return null;
  }
}