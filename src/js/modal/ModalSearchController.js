import { $, $$ } from "../utils.js"

export default class ModalSearchController {
    constructor({ onSubmit }){
        this.$searchForm = $("form")
        this.$searchButton = $("form>button")
        this.$searchInput = $("form>input")
        this.onSubmit = onSubmit

        this.bindEvents();
    }

    onSearchFormSubmit(event){
        event.preventDefault()
        this.onSubmit(this.$searchInput.value)
    }

    bindEvents(){
        this.$searchForm.addEventListener("submit", (event) => this.onSearchFormSubmit(event))
        this.$searchButton.addEventListener("click", (event) => this.onSearchFormSubmit(event))
    }
}