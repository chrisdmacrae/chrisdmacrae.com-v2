export function getPostTime(date: string | Date) {
  const now = Date.now();
  let d = date as Date;

  if (typeof date === "string") {
    d = new Date(date);
  }

  let currentMinutes = now / 1000 / 60;
  let postMinutes = d.getTime() / 1000 / 60;
  let difference = currentMinutes - postMinutes;

  if (difference <= 0) {
    return "Just now";
  }
  else if (difference < 10) {
    return "A few minutes ago"
  }
  else if (difference < 60) {
    return `${Math.ceil(difference)} minutes ago`
  }
  else if (difference / 60 < 10) {
    return "A few hours ago"
  }
  else if (difference / 60 < 24) {
    return `${Math.ceil(difference / 60)} hours ago`
  }
  else if (difference / 60 / 24 < 10) {
    return `A few days ago`
  }
  else if (difference / 60 / 24 / 7 < 7) {
    return "A few weeks ago"
  }
  else if (difference / 60 / 24 / 7 / 4 < 12) {
    return "A few months ago"
  }
  else if (difference / 60 / 24 / 7 / 4 >= 12) {
    "Over a year ago"
  }
}