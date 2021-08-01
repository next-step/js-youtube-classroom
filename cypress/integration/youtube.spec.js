describe('racing-car', () => {
    beforeEach(() => {
        // 페이지 접속. 띄워진 서버 port를 작성해주세요.
        cy.visit('http://localhost:5500/');
    });

    describe('유튜브 검색 테스트', () => {
        before(() => {});

        it('저장된 영상이 없을 경우, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.', () => {
            cy.get('#video-list').contains('영상이 없습니다. 😥');
        });

        it('동영상 검색 버튼을 클릭 시 모달을 화면에 띄운다.', () => {
            cy.get('#search-button').click();
            cy.get('.modal').should('class', 'modal open');
        });

        it('검색 결과가 없는 경우 결과 없음 이미지와 메세지를 화면에 띄운다.', () => {
            cy.searchVideo('뷁갓시노량');
            cy.wait(1 * 1000).then(() => {
                cy.get('#video-search-result h2').contains('검색결과가 없습니다.');
            });
        });

        it(`최초 검색결과는 10개까지만 보여준다.`, () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('#video-search-result').children().should('have.length', 10);
            });
        });

        it(`스크롤을 끝까지 내렸을 때, 추가로 10개의 검색 결과를 가지고 온다.`, () => {});

        it('동영상의 저장 버튼을 누르면, 동영상의 id를 localStorage에 저장한다.', () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('.save-button').first().click();
                cy.getLocalStorage('savedVideoList').should('contains', 'videoId');
            });
        });

        it('동영상이 이미 저장된 경우에는 저장버튼을 누를 수 없게 한다.', () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('.save-button').first().click();
                cy.get('#video-search-result button').first().should('have.text', '↪️ 저장 취소');
            });
        });

        it(`최근 검색 키워드를 3개 까지 화면상의 검색창 하단에 보여준다.`, () => {
            cy.searchVideo('BTS');

            cy.addKeywordSearch('여름');
            cy.addKeywordSearch('가을');
            cy.addKeywordSearch('겨울');

            cy.get('.js-latest-keyword').should('have.length', 3);
        });

        it('검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.', () => {
            cy.searchVideo('BTS');
            cy.get('#modal-close-button').click();
            cy.get('#search-button').click();

            cy.get('#video-search-result').children().should('have.length', 10);
        });

        it('저장된 영상 중 "볼 영상"이 있는 경우, 기본 메인 화면은 "볼 영상" 리스트를 보여준다.', () => {
            cy.get('#toWatch').should('have.class', 'bg-cyan-100');
        });

        it('✅ 버튼을 누르면 "본 영상"으로 상태가 변경된다.', () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('.save-button').first().click();
                cy.get('#modal-close-button').click();
                cy.get('.js-watched-button').click();
                cy.get('#watched').click();
                cy.get('.js-watched-button').should('have.class', 'false');
            });
        });

        it('👍 버튼을 누르면 "좋아요를 누른 영상" 탭에서 영상을 확인할 수 있다.', () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('.save-button').first().click();
                cy.get('#modal-close-button').click();
                cy.get('.js-liked-button').click();

                cy.get('#liked').click();
                cy.get('.js-liked-button').should('have.class', 'false');
            });
        });

        it('🗑️ 버튼을 누르면 사용자에게 정말 삭제할 것인지 물어본 후 저장된 리스트에서 해당 영상을 삭제한다.', () => {
            cy.searchVideo('BTS');
            cy.wait(200).then(() => {
                cy.get('.save-button').first().click();
                cy.get('#modal-close-button').click();
                cy.get('.js-delete-button').click();

                cy.on('window:alert', (str) => {
                    expect(str).to.equal('해당 영상을 삭제하시겠습니까?');
                });

                cy.get('#video-list').contains('영상이 없습니다. 😥');
            });
        });

        it(`저장된 동영상의 개수가 100개일 때, 동영상 저장을 할 수 없다.`, () => {});
    });
});
