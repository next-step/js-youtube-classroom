import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  document.body.addEventListener('click', () => {
    setCount(count + 1);
  })

  return `
    <div class="d-flex justify-center mt-5 w-100">
      ${count}
      <div class="w-100">
        ${Header()}
        <main class="mt-10">
          ${Movies()}
        </main>
      </div>
    </div>
    ${SearchModal()}
  `;
}
