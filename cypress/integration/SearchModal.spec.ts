import {
  BASE_URL,
  SEARCH_MODAL_SELECTORS,
  MODAL_OPEN_CLASS,
} from "../_testUtils/index";

describe("검색창 모달", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get(SEARCH_MODAL_SELECTORS.SEARCH_BUTTON).click();
  });

  describe("모달 UI 렌더링", () => {
    it("검색 버튼을 누르면 모달창이 열린다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.MODAL).should(
        "have.class",
        MODAL_OPEN_CLASS
      );
    });

    it("모달창이 열렸을 때 닫기 버튼을 누르면 모달창이 닫힌다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.MODAL_CLOSE).click();
      cy.get(SEARCH_MODAL_SELECTORS.MODAL).should(
        "not.have.class",
        MODAL_OPEN_CLASS
      );
    });
  });

  describe("유튜브 검색 기능", () => {
    beforeEach(() => {
      cy.get(SEARCH_MODAL_SELECTORS.INPUT).type("JavaScript");
      return cy.get(SEARCH_MODAL_SELECTORS.FORM).submit();
    });
    it("초기에 10개의 데이터를 렌더링한다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.RESULT)
        .children()
        .should("have.length", 10);
    });

    it("무한 스크롤이 제대로 적용된다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.MODAL_INNER)
        .scrollTo("bottom")
        .then(() => {
          return cy
            .get(SEARCH_MODAL_SELECTORS.RESULT)
            .children()
            .should("have.length", 20);
        });
    });

    it("새로운 키워드로 검색을 새로 할 수 있다.", async () => {
      cy.get(SEARCH_MODAL_SELECTORS.MODAL_INNER)
        .scrollTo("bottom")
        .then(() => {
          cy.get(SEARCH_MODAL_SELECTORS.INPUT).clear();
          cy.get(SEARCH_MODAL_SELECTORS.INPUT).type("TypeScript");
          return cy
            .get(SEARCH_MODAL_SELECTORS.FORM)
            .submit()
            .then(() => {
              return cy
                .get(SEARCH_MODAL_SELECTORS.RESULT)
                .children()
                .should("have.length", 10);
            });
        });
    });
  });

  describe("최근 검색어 저장 기능", () => {
    const mockData = ["JavaScript", "TypeScript", "HTML"];
    beforeEach(() => {
      mockData.forEach((keyword) => {
        cy.get(SEARCH_MODAL_SELECTORS.INPUT).clear();
        cy.get(SEARCH_MODAL_SELECTORS.INPUT).type(keyword);
        cy.get(SEARCH_MODAL_SELECTORS.FORM).submit();
      });
    });

    it("검색어를 저장한다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.HISTORY)
        .children()
        .should("have.length", 4);
      mockData.forEach((data) => cy.contains(data).should("be.visible"));
    });

    it("검색어의 갯수가 3개가 넘어갈 경우 오래된 순으로 삭제된다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.INPUT).clear();
      cy.get(SEARCH_MODAL_SELECTORS.INPUT).type("Java");
      cy.get(SEARCH_MODAL_SELECTORS.FORM)
        .submit()
        .then(() => {
          cy.get(SEARCH_MODAL_SELECTORS.HISTORY)
            .children()
            .should("have.length", 4);
          ["TypeScript", "HTML", "Java"].forEach((data) => {
            cy.contains(data).should("be.visible");
          });
        });
    });

    it("최근 검색어에 저장된 검색어를 클릭 할 시 검색된다.", () => {
      cy.contains("TypeScript")
        .click()
        .then(() => {
          return cy
            .get(SEARCH_MODAL_SELECTORS.INPUT)
            .should("have.value", "TypeScript");
        });
    });
  });

  describe("동영상 저장 및 저장 취소 기능", () => {
    const counterText = (counter: number) =>
      `저장된 영상 갯수: ${counter} / 100개`;

    beforeEach(() => {
      cy.get(SEARCH_MODAL_SELECTORS.INPUT).clear();
      cy.get(SEARCH_MODAL_SELECTORS.INPUT).type("JavaScript");
      return cy.get(SEARCH_MODAL_SELECTORS.FORM).submit();
    });

    it("동영상 저장 버튼을 누르면, 동영상이 저장된다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.COUNTER).should(
        "have.text",
        counterText(0)
      );
      cy.get(SEARCH_MODAL_SELECTORS.SAVE).click();
      cy.get(SEARCH_MODAL_SELECTORS.COUNTER).should(
        "have.text",
        counterText(1)
      );
    });

    it("동영상 저장 취소 버튼을 누르면 동영상 저장이 취소된다.", () => {
      cy.get(SEARCH_MODAL_SELECTORS.SAVE).click();
      cy.get(SEARCH_MODAL_SELECTORS.COUNTER).should(
        "have.text",
        counterText(1)
      );
      cy.get(SEARCH_MODAL_SELECTORS.UNSAVE).click();
      cy.get(SEARCH_MODAL_SELECTORS.COUNTER).should(
        "have.text",
        counterText(0)
      );
    });
  });
});
