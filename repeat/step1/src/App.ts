import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";

export const App = () => {
  return `
    <div class="d-flex justify-center mt-5 w-100">
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
