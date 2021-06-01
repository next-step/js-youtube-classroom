import { BASE_URL } from "../_testUtils/index";

describe("헤더 필터", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("헤더 UI 렌더링", () => {
    const selectedClass = "bg-cyan-100";
    const later = "#later";
    const watched = "#watched";
    const liked = "#liked";
    it("처음에는 볼 영상 버튼이 선택된다.", () => {
      [watched, liked].forEach((button) =>
        cy.get(button).should("not.have.class", selectedClass)
      );
      cy.get(later).should("have.class", selectedClass);
    });

    [later, watched, liked].forEach((selected) =>
      it("버튼을 누르면 하이라이트 클래스가 추가된다.", () => {
        cy.get(selected).click();
        [later, watched, liked].forEach((button) => {
          if (button === selected)
            cy.get(button).should("have.class", selectedClass);
          else cy.get(button).should("not.have.class", selectedClass);
        });
      })
    );
  });
});
