import { NAN_CHARACTER } from "../constants/classroom.js";

export function formatDate(dateString) {
  const d = new Date(dateString);
  const year = d.getFullYear() || NAN_CHARACTER;
  const month = d.getMonth() || NAN_CHARACTER;
  const date = d.getDate() || NAN_CHARACTER;

  return `${year}년 ${month}월 ${date}일`;
}
