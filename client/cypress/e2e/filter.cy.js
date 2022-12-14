describe('필터 렌더링 테스트', () => {
  const populationLevels = ['매우 붐빔', '붐빔', '보통', '여유'];
  const populationColors = ['#FF1E1E', '#FF9900', '#FFDB1D', '#43EB40'];

  beforeEach(() => {
    cy.visit(Cypress.env('products_url')).wait(2000);
  });

  // 잘 렌더 되는지 확인
  it.skip('필터 렌더링', () => {
    populationLevels.map((populationLevel, index) => {
      cy.get(`ul>li`).eq(index).should('be.visible').contains(populationLevel);
    });
  });

  it('필터 선택', () => {
    // 현재 마커 개수 세기
    const 매우붐빔 = Cypress.$(
      'div > svg[width="35"][height="50"] > path[fill="#FF1E1E"]'
    ).length;
    const 붐빔 = Cypress.$(
      'div > svg[width="35"][height="50"] > path[fill="#FF9900"]'
    ).length;
    const 보통 = Cypress.$(
      'div > svg[width="35"][height="50"] > path[fill="#FFDB1D"]'
    ).length;
    const 여유 = Cypress.$(
      'div > svg[width="35"][height="50"] > path[fill="#43EB40"]'
    ).length;

    // 전체 필터링 해제
    populationLevels.map((_, index) => {
      cy.get(`ul > li`).eq(index).click();
    });

    // 마커가 하나도 없어야 함
    cy.get('div > svg').should('not.exist');

    // 매우 붐빔 클릭
    cy.get('ul > li').eq(0).click();
    // 매우 붐빔 마커 개수 확인
    cy.get('div > svg[width="35"][height="50"] > path[fill="#FF1E1E"]').should(
      'have.length',
      매우붐빔
    );
    // 매우 붐빔 클릭
    cy.get('ul > li').eq(0).click();

    // 붐빔 클릭
    cy.get('ul > li').eq(1).click();
    // 붐빔 마커 개수 확인
    cy.get('div > svg[width="35"][height="50"] > path[fill="#FF9900"]').should(
      'have.length',
      붐빔
    );
    // 붐빔 클릭
    cy.get('ul > li').eq(1).click();

    // 보통 클릭
    cy.get('ul > li').eq(2).click();
    // 보통 마커 개수 확인
    cy.get('div > svg[width="35"][height="50"] > path[fill="#FFDB1D"]').should(
      'have.length',
      보통
    );
    // 보통 클릭
    cy.get('ul > li').eq(2).click();

    // 여유 클릭
    cy.get('ul > li').eq(3).click();
    // 여유 마커 개수 확인
    cy.get('div > svg[width="35"][height="50"] > path[fill="#43EB40"]').should(
      'have.length',
      여유
    );
    // 여유 클릭
    cy.get('ul > li').eq(3).click();
  });
});
