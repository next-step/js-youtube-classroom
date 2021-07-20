import {MoviesContainer} from "~components";

export const HomePage = () => {
  return MoviesContainer({
    notFoundText: "볼 영상이 없습니다.",
    filtering: v => !v.viewed,
  })
}
