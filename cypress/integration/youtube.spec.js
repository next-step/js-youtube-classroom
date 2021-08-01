describe('racing-car', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('검색 모달', () => {
        describe('검색 기능', () => {
            it('최초 검색 결과는 10개 보여줌', () => {
                cy.searchVideo('BTS');
                cy.wait(1 * 1000).then(() => {
                    cy.get('#video-search-result').children().should('have.length', 10);
                });
            });
            it('검색 결과 없는 경우 사용자에게 결과 없음 이미지 보여줌', () => {
                cy.searchVideo('뷁갓시노량');
                cy.wait(1 * 1000).then(() => {
                    cy.get('#video-search-result h2').contains('검색결과가 없습니다.');
                });
            });
        });
        describe('영상 저장', () => {
            it('저장 버튼을 클릭하면 저장 취소 버튼이 보이게 함', () => {
                cy.searchVideo('BTS');
                cy.wait(1 * 1000).then(() => {
                    cy.get('.save-button').first().click();
                    cy.get('#video-search-result button').first().should('have.text', '↪️ 저장 취소');
                });
            });
            it('영상을 저장하면 볼 영상에 추가', () => {
                cy.searchVideo('BTS');
                cy.wait(1 * 1000).then(() => {
                    cy.get('.save-button').first().click();
                    cy.get('#modal-close-button').click();
                    cy.get('#video-list').children().should('have.length', 1);
                });
            });
        });
    });
});
