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
        this.setState()
    }

    addSearchHistory(searchKeyword) {
        if (this.searchHistoryAry !== null){
            const historyPos = this.searchHistoryAry.indexOf(searchKeyword)
            if (historyPos >= 0){
                this.searchHistoryAry.splice(historyPos, 1)
            }
            if (this.searchHistoryAry.length > 2) {
                this.searchHistoryAry.shift()
            }
        }
        this.searchHistoryAry.push(searchKeyword)
        saveDataToLocalStorage("searchHistory", this.searchHistoryAry)
        this.setState()
    }

    onSearchFormSubmit(event){
        const searchKeyword = this.$searchInput.value
        event.preventDefault()
        this.addSearchHistory(searchKeyword)
        this.onSubmit(searchKeyword)
    }

    onSearchHistoryClick(event){
        const searchKeyword = event.target.innerHTML
        this.addSearchHistory(searchKeyword)
        this.onSubmit(searchKeyword)
    }

    bindEvents(){
        this.$searchForm.addEventListener("submit", (event) => this.onSearchFormSubmit(event))
        this.$searchButton.addEventListener("click", (event) => this.onSearchFormSubmit(event))
        this.$seacrhHistory.addEventListener("click", (event) => this.onSearchHistoryClick(event))
    }

    render(){
        this.$seacrhHistory.innerHTML = buildSearchHistorySection(this.searchHistoryAry)
    }

    setState(){
        this.searchHistoryAry = loadDataFromLocalStorage("searchHistory")
        this.render()
    }
}

const buildSearchHistorySection = (searchHistory) => {
    let searchHistoryDom = `<span class="text-gray-700">최근 검색어: </span>`
    for(let i = searchHistory.length - 1; i >=0; i--){
        searchHistoryDom += `<a class="chip">${searchHistory[i]}</a>`
    }
    return searchHistoryDom
}

const saveDataToLocalStorage = (key, value) => {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
}

const loadDataFromLocalStorage = (key) => {
    const searchHistory = JSON.parse(localStorage.getItem(key))
    if (searchHistory === null) return []
    else return searchHistory
}