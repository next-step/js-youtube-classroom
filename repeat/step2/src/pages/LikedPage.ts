import {MoviesContainer} from "~components";

export const LikedPage = () => {
  return MoviesContainer({
    notFoundText: "좋아요 한 영상이 없습니다.",
    filtering: v => v.isLike,
  })
}
