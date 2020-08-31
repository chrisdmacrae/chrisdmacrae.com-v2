const AVERAGE_WPM = 250;

export function getReadingTime(content: string) {
  let count = getWordCount(content) || 0;
  let time = Math.ceil(count / AVERAGE_WPM);

  return time + " min read";
}

export function getWordCount(content: string){
  return content?.match(/\w+/g).length;
}