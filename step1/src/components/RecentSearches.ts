import {Component} from "~_core/Component";

interface Props {
  items: string[]
}

export class RecentSearches extends Component<{}, Props> {

  protected template(): string {
    const { items } = this.$props;
    return `
      <span class="text-gray-700">최근 검색어: </span>
      ${items.map(item => `
        <a class="chip">${item}</a>
      `).join('')}
      ${items.length === 0 ? '<span>최근 검색어가 없습니다.</span>' : ''}
    `;
  }

}
