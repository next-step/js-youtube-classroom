import {useState} from "~@core";

export const Message = () => {
  const [message, setMessage] = useState('이곳에 메시지를 입력해주세요.');
  return `
    <button id="snackbar-button">snackbar</button>
    <div id="snackbar">${message}</div>
  `;
}
