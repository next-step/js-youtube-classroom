export default class SearchInput {
  constructor({$searchInput, $searchInputButton}) {
    this.$searchInput = $searchInput;
    this.$searchInputButton = $searchInputButton;

    this.$searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log(e);
        
      }
    })
    this.$searchInputButton.addEventListener('click', () => {
      console.log(this.$searchInput.value)
    })
  }
}