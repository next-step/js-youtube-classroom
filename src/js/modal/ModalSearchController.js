import { $, $$ } from "../utils.js"

export default class ModalSearchController {
    constructor({ onSubmit }){
        this.$searchForm = $("form")
        this.$searchButton = $("form>button")
        this.$searchInput = $("form>input")
        this.$seacrhHistory = $("#search-history")
        this.onSubmit = onSubmit

        this.searchHistoryAry = []

        this.bindEvents();
    }

    onSearchFormSubmit(event){
        event.preventDefault()
        this.onSubmit(this.$searchInput.value)
    }

    onSearchHistoryClick(event){
        const searchKeyword = event.target.innerHTML
        const historyPos = this.searchHistoryAry.indexOf(searchKeyword)
        if (historyPos >= 0){
            this.searchHistoryAry.splice(historyPos, 1)
        }
        this.searchHistoryAry.push(searchKeyword)
        this.onSubmit(searchKeyword)
        console.log(this.searchHistoryAry)
    }

    bindEvents(){
        this.$searchForm.addEventListener("submit", (event) => this.onSearchFormSubmit(event))
        this.$searchButton.addEventListener("click", (event) => this.onSearchFormSubmit(event))
        this.$seacrhHistory.addEventListener("click", (event) => this.onSearchHistoryClick(event))
    }
}