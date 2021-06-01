import {Component} from "~@core";

interface Props {
  count: number;
}

export class Skeleton extends Component<{}, Props> {

  protected template(): string {
    return `
      <div class="d-flex justify-between flex-wrap">
        ${Array(this.$props.count).fill(0).map(() => `
          <div class="skeleton">
            <div class="image"></div>
            <p class="line"></p>
            <p class="line"></p>
          </div>
        `).join('')}
      </div>
    `;
  }

}
