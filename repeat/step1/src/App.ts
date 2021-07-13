import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";

export const App = () => {

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const openModal = () => setVisibleModal(true);
  const closeModal = () => setVisibleModal(false);



  return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        ${Header({ openModal })}
        <main class="mt-10">
          ${Movies()}
        </main>
      </div>
    </div>
    ${SearchModal({ visibleModal, closeModal })}
  `;
}
