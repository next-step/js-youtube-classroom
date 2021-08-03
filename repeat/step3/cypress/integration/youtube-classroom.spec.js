const { lectureVideos } = require('../fixtures/example.json');

describe("유튜브 검색 테스트", () => {
  before(() => {
    cy.visit('/');
  });

  it("저장된 영상이 없을 경우, 비어있다는 것을 사용자에게 알려주는 상태를 보여준다.", () => {
    cy.contains('볼 영상이 없습니다.').should('exist');
  });

  it("동영상 검색 버튼을 클릭 시 모달을 화면에 띄운다.", () => {
    cy.contains('동영상 검색').click()
  });

  it("검색 결과가 없는 경우 결과 없음 이미지와 메세지를 화면에 띄운다.", () => {});

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
      cy.get('main .video-wrapper .clip:nth-child(1) .remove').click()
    });

    // it(`저장된 동영상의 개수가 100개일 때, 동영상 저장을 할 수 없다.`, () => {});

  })
});
