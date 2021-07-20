import {_BasePage} from "./_BasePage";

export const LikedPage = () => {
  return _BasePage({
    notFoundText: "좋아요 한 영상이 없습니다.",
    filtering: v => v.isLike,
  })
}
