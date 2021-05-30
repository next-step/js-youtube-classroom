import notFoundImg from 'js/../images/status/not_found.png';

const notFound = () => `
  <div class="not-found-container">
    <img src="${notFoundImg}" alt="" class="not-found-img" />
    <h3>검색결과가 없습니다.</h3>
    <span>다른 검색어를 시도해보세요 :(</span>
  </div>
`;

export default notFound;
