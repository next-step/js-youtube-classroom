import { BASE_URL } from "../_testUtils/index";

describe("검색창 모달", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.get(searchButton).click();
  });

  const searchButton = "#search-button";
  const modal = ".modal";
  const modalInner = ".modal-inner";
  const modalClose = ".modal-close";
  const openClass = "open";
  const searchInput = "input";
  const searchForm = "#search-form";
  const searchResult = "#search-result";
  const searchHistory = "#search-history";
  const saveButton = "#save";
  const unsaveButton = "#unsave";
  const storedCounter = "#stored-counter";

  describe("모달 UI 렌더링", () => {
    it("검색 버튼을 누르면 모달창이 열린다.", () => {
      cy.get(modal).should("have.class", openClass);
    });

    it("모달창이 열렸을 때 닫기 버튼을 누르면 모달창이 닫힌다.", () => {
      cy.get(modalClose).click();
      cy.get(modal).should("not.have.class", openClass);
    });
  });

  describe("유튜브 검색 기능", () => {
    beforeEach(() => {
      cy.get(searchInput).type("JavaScript");
      return cy.get(searchForm).submit();
    });
    it("초기에 10개의 데이터를 렌더링한다.", () => {
      cy.get(searchResult).children().should("have.length", 10);
    });

    it("무한 스크롤이 제대로 적용된다.", () => {
      cy.get(modalInner)
        .scrollTo("bottom")
        .then(() => {
          return cy.get(searchResult).children().should("have.length", 20);
        });
    });

    it("새로운 키워드로 검색을 새로 할 수 있다.", async () => {
      cy.get(modalInner)
        .scrollTo("bottom")
        .then(() => {
          cy.get(searchInput).clear();
          cy.get(searchInput).type("TypeScript");
          return cy
            .get(searchForm)
            .submit()
            .then(() => {
              return cy.get(searchResult).children().should("have.length", 10);
            });
        });
    });
  });

  describe("최근 검색어 저장 기능", () => {
    const mockData = ["JavaScript", "TypeScript", "HTML"];
    beforeEach(() => {
      mockData.forEach((keyword) => {
        cy.get(searchInput).clear();
        cy.get(searchInput).type(keyword);
        cy.get(searchForm).submit();
      });
    });

    it("검색어를 저장한다.", () => {
      cy.get(searchHistory).children().should("have.length", 4);
      mockData.forEach((data) => cy.contains(data).should("be.visible"));
    });

    it("검색어의 갯수가 3개가 넘어갈 경우 오래된 순으로 삭제된다.", () => {
      cy.get(searchInput).clear();
      cy.get(searchInput).type("Java");
      cy.get(searchForm)
        .submit()
        .then(() => {
          cy.get(searchHistory).children().should("have.length", 4);
          ["TypeScript", "HTML", "Java"].forEach((data) => {
            cy.contains(data).should("be.visible");
          });
        });
    });

    it("최근 검색어에 저장된 검색어를 클릭 할 시 검색된다.", () => {
      cy.contains("TypeScript")
        .click()
        .then(() => {
          return cy.get(searchInput).should("have.value", "TypeScript");
        });
    });
  });

  describe("동영상 저장 및 저장 취소 기능", () => {
    const counterText = (counter: number) =>
      `저장된 영상 갯수: ${counter} / 100개`;

    beforeEach(() => {
      cy.get(searchInput).clear();
      cy.get(searchInput).type("JavaScript");
      return cy.get(searchForm).submit();
    });

    it("동영상 저장 버튼을 누르면, 동영상이 저장된다.", () => {
      cy.get(storedCounter).should("have.text", counterText(0));
      cy.get(saveButton).click();
      cy.get(storedCounter).should("have.text", counterText(1));
    });

    it("동영상 저장 취소 버튼을 누르면 동영상 저장이 취소된다.", () => {
      cy.get(saveButton).click();
      cy.get(storedCounter).should("have.text", counterText(1));
      cy.get(unsaveButton).click();
      cy.get(storedCounter).should("have.text", counterText(0));
    });
  });
});
