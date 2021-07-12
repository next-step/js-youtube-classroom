import { createNode } from '../domHelper';
import store from '../store';
import { changeInputValueAction, modalCloseAction } from '../store/actionCreator';
import { Component } from '../types';
import { Button, Header, Heading } from './';
import Form from './Form';
import Input from './Input';
import SearchVideoSection from './SearchVideoSection';

interface Props {}

const Modal: Component<Props> = () => {
  const { searchList, recentSearchList, inputValue } = store.getState();
  const { dispatch } = store;

  const onInputChangeHandler = () => {
    dispatch(changeInputValueAction(inputValue));
  };

  const onModalOpenHandler = () => {
    dispatch(modalCloseAction());
  };

  const $modalInner = createNode(`<div class="modal-inner p-8"></div>`, [
    Button({
      className: 'modal-close',
      children: [
        createNode(`
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>`),
      ],
      onClick: onModalOpenHandler,
    }),
    Header({
      children: [Heading({ className: 'text-center', level: 2, textContent: '🔎 유튜브 검색' })],
    }),
    Form({
      className: 'd-flex',
      children: [
        Input({
          value: inputValue,
          onInput: onInputChangeHandler,
          className: 'w-100 mr-2 pl-2',
          placeholder: '검색',
        }),
        Button({ className: 'btn bg-cyan-500', textContent: '검색' }),
      ],
    }),
    createNode(`
      <section class="mt-2">
        <span class="text-gray-700">최근 검색어: </span>
        ${recentSearchList.map(keyword => `<a class="chip">${keyword}</a>`).join('')}
      </section>
    `),
    SearchVideoSection({}),
  ]);

  const $modal = createNode(`
    <div class="modal">
      
    </div>
  `);

  // $modal.innerHTML = `<div class="modal-inner p-8">
  //   <button class="modal-close">
  //     <svg viewbox="0 0 40 40">
  //       <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  //     </svg>
  //   </button>
  //   <header>
  //     <h2 class="text-center">🔎 유튜브 검색</h2>
  //   </header>
  //   <form class="d-flex">
  //     <input type="text" class="w-100 mr-2 pl-2" placeholder="검색" />
  //     <button type="button" class="btn bg-cyan-500">검색</button>
  //   </form>
  //   <section class="mt-2">
  //     <span class="text-gray-700">최근 검색어: </span>
  //     <a class="chip">메이커준</a>
  //     <a class="chip">블랙커피</a>
  //     <a class="chip">자바스크립트</a>
  //   </section>
  //   <section>
  //     <div class="d-flex justify-end text-gray-700">저장된 영상 갯수: 50개</div>
  //     <section class="video-wrapper">
  //       <article class="clip">
  //         <div class="preview-container">
  //           <iframe
  //             width="100%"
  //             height="118"
  //             src="https://www.youtube.com/embed/Ngj3498Tm_0"
  //             frameborder="0"
  //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //             allowfullscreen
  //           ></iframe>
  //         </div>
  //         <div class="content-container pt-2 px-1">
  //           <h3>아두이노 무드등</h3>
  //           <div>
  //             <a
  //               href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
  //               target="_blank"
  //               class="channel-name mt-1"
  //             >
  //               메이커준
  //             </a>
  //             <div class="meta">
  //               <p>2021년 3월 2일</p>
  //             </div>
  //             <div class="d-flex justify-end">
  //               <button class="btn">⬇️ 저장</button>
  //             </div>
  //           </div>
  //         </div>
  //       </article>
  //     </section>
  //   </section>
  // </div>`;

  $modal.appendChild($modalInner);

  return $modal;
};

export default Modal;
