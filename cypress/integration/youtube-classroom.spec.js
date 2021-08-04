import {YOUTUBE_API_DOMAIN} from '../../src/js/apis/youtubeApis.js';
import {SAVED_VIDEO_STORE_KEY} from '../../src/js/store/videoStore.js';

describe('유튜브 검색 테스트', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.intercept({
              method: 'GET',
              url: `${YOUTUBE_API_DOMAIN}/youtube/v3/videos**`,
          })
          .as('dataGetFirst');
        cy.wait('@dataGetFirst'); //메인페이지 접근 시 youtube API 호출 대기


    });

    afterEach(() => {
        cy.clearLocalStorage(SAVED_VIDEO_STORE_KEY);
    });

    it('저장된 영상이 없을 경우, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.', () => {
        cy.getBySel('empty-video-message')
          .should('be.visible');
    });

    it('동영상 검색 버튼을 클릭 시 모달을 화면에 띄운다.', () => {
        cy.getBySel('open-search-modal-btn')
          .click();

        cy.getBySel('search-modal-wrap')
          .should('be.visible');
    });

    it('검색 결과가 없는 경우 결과 없음 이미지와 메세지를 화면에 띄운다.', () => {
        cy.getBySel('open-search-modal-btn')
          .click();
        cy.getBySel('search-modal-input')
          .type('aflkjdsjfldksjf');
        cy.getBySel('search-modal-form')
          .submit();

        cy.getBySel('search-modal-not-exist-result')
          .should('be.visible');
    });

    it(`최초 검색결과는 10개까지만 보여준다.`, () => {
        cy.getBySel('open-search-modal-btn')
          .click();
        cy.getBySel('search-modal-input')
          .type('hello');
        cy.getBySel('search-modal-form')
          .submit();

        cy.getBySel('search-modal-article')
          .should('have.length', 10);
    });

    it(`스크롤을 끝까지 내렸을 때, 추가로 10개의 검색 결과를 가지고 온다.`, () => {
        cy.getBySel('open-search-modal-btn')
          .click();
        cy.getBySel('search-modal-input')
          .type('hello');
        cy.getBySel('search-modal-form')
          .submit();
        cy.getBySel('search-modal-article')
          .should('have.length', 10);

        cy.getBySel('search-modal-wrap-scroll')
          .scrollTo('bottom');

        cy.getBySel('search-modal-article')
          .should('have.length', 20);
    });

    // it('동영상의 저장 버튼을 누르면, 동영상의 id를 localStorage에 저장한다.', () => {
    // });
    //
    // it('동영상이 이미 저장된 경우에는 저장버튼을 누를 수 없게 한다.', () => {
    // });
    //
    // it(`최근 검색 키워드를 3개 까지 화면상의 검색창 하단에 보여준다.`, () => {
    // });
    //
    // it('검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.', () => {
    // });
    //
    // it('저장된 영상 중 "볼 영상"이 있는 경우, 기본 메인 화면은 "볼 영상" 리스트를 보여준다.', () => {
    // });
    //
    // it('✅ 버튼을 누르면 "본 영상"으로 상태가 변경된다.', () => {
    // });
    //
    // it('👍 버튼을 누르면 "좋아요를 누른 영상" 탭에서 영상을 확인할 수 있다.', () => {
    // });
    //
    // it('🗑️ 버튼을 누르면 사용자에게 정말 삭제할 것인지 물어본 후 저장된 리스트에서 해당 영상을 삭제한다.', () => {
    // });
    //
    // it(`저장된 동영상의 개수가 100개일 때, 동영상 저장을 할 수 없다.`, () => {
    // });
});

