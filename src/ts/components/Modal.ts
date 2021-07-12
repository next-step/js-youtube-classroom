import youtubeAPI from '../api/youtube';
import { createNode } from '../domHelper';
import store from '../store';
import {
  modalCloseAction,
  searchYoutubeErrorAction,
  searchYoutubeLoadingAction,
  searchYoutubeSuccessAction,
} from '../store/actionCreator';
import { Component, YoutubeVideo } from '../types';
import { Button, Header, Heading } from './';
import Form from './Form';
import Input from './Input';
import SearchVideoSection from './SearchVideoSection';

interface Props {}

const Modal: Component<Props> = () => {
  const { searchList, recentSearchList } = store.getState();
  const { dispatch } = store;

  const onModalOpenHandler = () => {
    dispatch(modalCloseAction());
  };

  const onYoutubeSearchHandler = async (e: Event) => {
    e.preventDefault();

    const searchInput = (e.target as HTMLFormElement).querySelector(
      '.search-input'
    ) as HTMLInputElement;

    dispatch(searchYoutubeLoadingAction());
    try {
      const responseData = await youtubeAPI.searchYoutubeByTitle(searchInput.value);
      dispatch(searchYoutubeSuccessAction(responseData.items));
    } catch (error) {
      dispatch(searchYoutubeErrorAction());
    }

    searchInput.value = '';
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
          className: 'w-100 mr-2 pl-2 search-input',
          placeholder: '검색',
        }),
        Button({ className: 'btn bg-cyan-500', textContent: '검색', type: 'submit' }),
      ],
      onSubmit: onYoutubeSearchHandler,
    }),
    createNode(`
      <section class="mt-2">
        <span class="text-gray-700">최근 검색어: </span>
        ${recentSearchList.map(keyword => `<a class="chip">${keyword}</a>`).join('')}
      </section>
    `),
    SearchVideoSection({}),
  ]);

  const $modal = createNode(
    `
    <div class="modal">
      
    </div>
  `,
    [$modalInner]
  );

  return $modal;
};

export default Modal;
