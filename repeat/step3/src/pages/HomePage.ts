import {_BasePage} from "./_BasePage";

export const HomePage = () => {
  return _BasePage({
    notFoundText: "볼 영상이 없습니다.",
    filtering: v => !v.viewed,
  })
}
