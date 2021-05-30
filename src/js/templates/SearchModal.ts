const searchHistory = (history: string[]): string => {
  return history.map((name) => `<a class="chip">${name}</a>`).join("");
};

const template = `
<button class="modal-close">
  <svg viewbox="0 0 40 40">
  <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>
</button>
`;

export default template;
