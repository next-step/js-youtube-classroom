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
            it('영상 저장하면 저장 버튼 보이지 않게 함', () => {});
            it('저장 가능한 최대 동영상 갯수는 100개', () => {});
        });
        describe('키워드 기능', () => {
            it('모달에 다시 접근 시 가장 마지막에 검색한 키워드 검색 결과 보여줌', () => {});
            it('최근 검색 키워드 3개까지 화면상에 검색창 하단에 보여줌', () => {});
            it('최근 검색 키워드 클릭하면 해당 키워드로 검색한 결과 보여줌', () => {});
        });
    });
});
