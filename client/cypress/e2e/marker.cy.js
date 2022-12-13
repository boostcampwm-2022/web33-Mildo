describe('마커 테스트', () => {
  beforeEach('밀도 입장', () => {
    cy.visit(Cypress.env('products_url')).wait(7000);
  });

  it.skip('마커 출력', () => {
    // 마커 개수 50개 확인
    cy.get('div')
      .find('svg[width="35"][height="50"]')
      .should('have.length', 50);
  });

  it('마커 클릭 이벤트', () => {
    cy.get('div')
      .find('svg[width="35"][height="50"]')
      .each($el => {
        // 마커 클릭
        cy.wrap($el).click({ force: true });

        // 포커싱된 마커 개수 1개
        cy.get('div')
          .find('svg[width="60"][height="86"]')
          .should('have.length', 1);

        // 포커싱되지 않은 마커 개수 49개
        cy.get('div')
          .find('svg[width="35"][height="50"]')
          .should('have.length', 49);

        // 1단계 상세 모달창 출력 확인
        cy.get('#root > div > div').eq(3).should('have.attr', 'open');

        // 2단계 상세 모달창 출력 확인
        cy.get('#root > div > div > div > div')
          .last()
          .children()
          .should('have.length', 0);

        // 2단계 상세 모달창 열기
        cy.get('#root > div > div > div > img').eq(0).click({ force: true });

        // 2단계 상세 모달창 출력 확인
        cy.get('#root > div > div > div > div')
          .last()
          .children()
          .should('have.length', 1);

        // 2단계 상세 모달창 닫기
        cy.get('#root > div > div > div > img').eq(0).click({ force: true });

        // 지도 클릭
        cy.get('#root > div').eq(0).click(1, 1);

        // 1단계 상세 모달창 출력 확인
        cy.get('#root > div > div').eq(3).should('not.have.attr', 'open');

        // 포커싱된 마커 개수 0개
        cy.get('div')
          .find('svg[width="60"][height="86"]')
          .should('have.length', 0);

        // 포커싱되지 않은 마커 개수 50개
        cy.get('div')
          .find('svg[width="35"][height="50"]')
          .should('have.length', 50);
      });
  });
});
