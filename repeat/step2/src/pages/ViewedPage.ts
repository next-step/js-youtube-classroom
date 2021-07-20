import {_BasePage} from "./_BasePage";

export const ViewedPage = () => {
  return _BasePage({
    notFoundText: "본 영상이 없습니다.",
    filtering: v => v.viewed,
  })
}
