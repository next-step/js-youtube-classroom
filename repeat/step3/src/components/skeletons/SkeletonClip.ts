export interface SkeletonClipProps {
  count: number;
}

export const SkeletonClip = ({ count }: SkeletonClipProps) => {
  return `
    <div class="d-flex justify-between flex-wrap">
      ${Array(count).fill(0).map(() => `
        <div class="skeleton">
          <div class="image"></div>
          <p class="line"></p>
          <p class="line"></p>
        </div>
      `).join('')}
    </div>
  `;
}
