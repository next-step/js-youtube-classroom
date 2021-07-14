export default class SearchInput {
  constructor({$searchInput, $searchInputButton, onInput}) {
    this.$searchInput = $searchInput;
    this.$searchInputButton = $searchInputButton;

    this.$searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // console.log(e);
        onInput(e.target.value);
        
      }
    })
    this.$searchInputButton.addEventListener('click', () => {
      // console.log(this.$searchInput.value)
      onInput(this.$searchInput.value);
    })
  }
}