const template = (histories: string[]): string => {
  const list = histories.map((keyword) => `<a class="chip">${keyword}</a>`);
  list.unshift(` <span class="text-gray-700">최근 검색어: </span>`);
  return list.join("");
};

export default template;
