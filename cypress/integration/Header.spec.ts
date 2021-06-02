import {
  BASE_URL,
  HEADER_SELECTORS,
  BUTTON_SELECT_CLASS,
} from "../_testUtils/index";

describe("헤더 필터", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("헤더 UI 렌더링", () => {
    it("처음에는 볼 영상 버튼이 선택된다.", () => {
      [HEADER_SELECTORS.WATCHED_BUTTON, HEADER_SELECTORS.LIKED_BUTTON].forEach(
        (button) => cy.get(button).should("not.have.class", BUTTON_SELECT_CLASS)
      );
      cy.get(HEADER_SELECTORS.LATER_BUTTON).should(
        "have.class",
        BUTTON_SELECT_CLASS
      );
    });

    [
      HEADER_SELECTORS.LATER_BUTTON,
      HEADER_SELECTORS.WATCHED_BUTTON,
      HEADER_SELECTORS.LIKED_BUTTON,
    ].forEach((selected) =>
      it("버튼을 누르면 하이라이트 클래스가 추가된다.", () => {
        cy.get(selected).click();
        [
          HEADER_SELECTORS.LATER_BUTTON,
          HEADER_SELECTORS.WATCHED_BUTTON,
          HEADER_SELECTORS.LIKED_BUTTON,
        ].forEach((button) => {
          if (button === selected)
            cy.get(button).should("have.class", BUTTON_SELECT_CLASS);
          else cy.get(button).should("not.have.class", BUTTON_SELECT_CLASS);
        });
      })
    );
  });
});
