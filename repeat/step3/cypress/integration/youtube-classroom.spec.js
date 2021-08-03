const { lectureVideos, cache } = require('../fixtures/example.json');

describe("유튜브 검색 테스트", () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    localStorage.setItem('YOUTUBE_SERVICE_CACHE', JSON.stringify(cache));
  })

  describe('모달창에 대한 테스트', () => {

    it("저장된 영상이 없을 경우, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.", () => {
      cy.contains('볼 영상이 없습니다.').should('exist');
    });

    it("동영상 검색 버튼을 클릭 시 모달을 화면에 띄운다.", () => {
      cy.contains('동영상 검색').click();
      cy.get('.modal').should('exist');
    });

    it("검색 결과가 없는 경우 결과 없음 이미지와 메세지를 화면에 띄운다.", () => {
      cy.contains('검색 결과가 없습니다.').should('exist');
      cy.get('[alt="검색 결과가 없습니다."]').should('exist');
    });

    it(`최초 검색결과는 10개까지만 보여준다.`, () => {
      cy.get('[name="searchKey"]').type("포동이{enter}");
      cy.get('.modal .clip').should('have.length', 10);
    });

    it(`스크롤을 끝까지 내렸을 때, 추가로 10개의 검색 결과를 가지고 온다.`, () => {
      // 아직 구현하지 않았음
    });

    it("동영상의 저장 버튼을 누르면, 동영상의 id를 localStorage에 저장한다.", () => {
      cy.get('.modal .clip:nth-child(1) .video-clip-save')
        .click()
        .then(() => {
          const data = JSON.parse(localStorage.getItem('LectureVideo'));
          expect(data.length).to.equal(1);
        });
    });

    it("동영상이 이미 저장된 경우에는 저장버튼을 누를 수 없게 한다.", () => {
      cy.get('.modal .clip:nth-child(1)').contains('저장').should("not.exist");
    });

    it(`최근 검색 키워드를 3개 까지 화면상의 검색창 하단에 보여준다.`, () => {
      cy.get('[name="searchKey"]')
        .clear()
        .type("포동이{enter}")
        .clear()
        .type("블랙커피스터디{enter}")
        .clear()
        .type("황준일{enter}");

      cy.get('.recent-search').should("have.length", 3);
    });

    it("검색 모달에 다시 접근했을 때 가장 마지막에 검색한 키워드로 검색한 결과를 보여준다.", () => {
      cy.get('.modal-close').click();
      cy.wait(1000 / 60);
      cy.contains('동영상 검색').click();
      cy.wait(1000 / 60);
      cy.get('[name="searchKey"]').should('have.value', '황준일');
      cy.get('.modal-close').click();
    });
  })

  describe('데이터가 있을 경우에 대한 테스트', () => {

    beforeEach(() => {
      cy.visit('/');
      localStorage.setItem('LectureVideo', JSON.stringify(lectureVideos));
    })

    it('저장된 영상 중 "볼 영상"이 있는 경우, 기본 메인 화면은 "볼 영상" 리스트를 보여준다.', () => {
      cy.get('main .video-wrapper .clip')
        .should('have.length', lectureVideos.filter(v => !v.viewed).length);
    });

    it('✅ 버튼을 누르면 "본 영상"으로 상태가 변경된다.', () => {
      const viewingLength = lectureVideos.filter(v => !v.viewed).length;
      const viewedLength = lectureVideos.filter(v => v.viewed).length;
      cy.get('main .video-wrapper .clip:nth-child(1) .viewed')
        .click();

      cy.get('main .video-wrapper .clip')
        .should('have.length', viewingLength - 1);

      cy.contains('본 영상').click();

      cy.get('main .video-wrapper .clip')
        .should('have.length', viewedLength + 1);
    });

    it('👍 버튼을 누르면 "좋아요를 누른 영상" 탭에서 영상을 확인할 수 있다.', () => {
      const likedLength = lectureVideos.filter(v => v.isLike).length;
      cy.get('main .video-wrapper .clip:nth-child(2) .liked').click();
      cy.contains('좋아요 한 영상').click();
      cy.get('main .video-wrapper .clip').should('have.length', likedLength + 1);
    });

    it("🗑️ 버튼을 누르면 사용자에게 정말 삭제할 것인지 물어본 후 저장된 리스트에서 해당 영상을 삭제한다.", () => {
      const viewingLength = lectureVideos.filter(v => !v.viewed).length;
      const stub = cy.stub();
      stub.onFirstCall().returns(true)

      cy.on('window:confirm', stub);

      cy.get('main .video-wrapper .clip:nth-child(1) .remove')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('정말로 삭제하시겠습니까?');
          expect(lectureVideos.length - 1).to.equal(JSON.parse(localStorage.getItem('LectureVideo')).length);

          cy.get('main .video-wrapper .clip').should('have.length', viewingLength - 1);

        })

    });

  })

  describe('예외 처리 테스트', () => {

    before(() => {
      cy.visit('/');
      const filled = Array(100).fill(lectureVideos[0])
      localStorage.setItem('LectureVideo', JSON.stringify(filled));
    })

    it(`저장된 동영상의 개수가 100개일 때, 동영상 저장을 할 수 없다.`, () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('main .video-wrapper .clip').should('have.length', 100);
      cy.contains('동영상 검색').click();
      cy.get('[name="searchKey"]').clear().type("블랙커피{enter}");
      cy.get('.modal .video-clip-save')
        .first()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('강의는 최대 100개 까지 저장할 수 있습니다.');
        });
    });

  })
});
