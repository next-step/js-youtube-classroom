import {MoviesContainer} from "~components";

export const ViewedPage = () => {
  return MoviesContainer({
    notFoundText: "본 영상이 없습니다.",
    filtering: v => v.viewed,
  })
}
