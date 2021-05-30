import { BASE_URL, SELECTORS } from '../_testUtils/index';

describe('검색창 모달', () => {
    beforeEach(()=>{
        cy.visit(BASE_URL)
    });

    it("검색 버튼을 누르면 모달창이 열린다.",()=>{
       cy.get(SELECTORS.SEARCH_BUTTON).click();
       cy.get(SELECTORS.MODAL).should('have.class','open');
    })

    it("모달창이 열렸을 때 닫기 버튼을 누르면 모달창이 닫힌다.",()=>{
        cy.get(SELECTORS.SEARCH_BUTTON).click();
        cy.get(SELECTORS.MODAL_CLOSE).click();
        cy.get(SELECTORS.MODAL).should('not.have.class','open');
    })
})
