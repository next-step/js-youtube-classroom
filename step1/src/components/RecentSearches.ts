import {Component} from "~_core/Component";

export class RecentSearches extends Component {

  protected template(): string {
    return `
      <span class="text-gray-700">최근 검색어: </span>
      <a class="chip">메이커준</a>
      <a class="chip">블랙커피</a>
      <a class="chip">자바스크립트</a>
    `;
  }

}
