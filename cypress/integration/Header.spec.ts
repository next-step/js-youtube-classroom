import { BASE_URL, SELECTORS } from '../_testUtils/index';
import { BUTTON_HIGHLIGHT } from '@/utils/constants';

describe('헤더 필터', () => {
    beforeEach(()=>{
        cy.visit(BASE_URL)
    });

    it("초기에는 볼 영상 버튼이 선택된다.",()=>{
        [SELECTORS.SEARCH_BUTTON, SELECTORS.WATCHED_BUTTON].forEach((button)=> cy.get(button).should('not.have.class',BUTTON_HIGHLIGHT))
        cy.get(SELECTORS.LATER_BUTTON).should('have.class', BUTTON_HIGHLIGHT);
    })

    it("버튼을 누르면 하이라이트 클래스가 추가된다.",()=>{
        cy.get(SELECTORS.WATCHED_BUTTON).click();
        cy.get(SELECTORS.WATCHED_BUTTON).should('have.class',BUTTON_HIGHLIGHT);
        [SELECTORS.SEARCH_BUTTON, SELECTORS.LATER_BUTTON].forEach((button)=>cy.get(button).should('not.have.class', BUTTON_HIGHLIGHT));
    })
})
