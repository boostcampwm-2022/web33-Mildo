describe('필터 렌더링 테스트', () => {
  const populationLevels = ['매우 붐빔', '붐빔', '보통', '여유'];
  const populationColors = ['#FF1E1E', '#FF9900', '#FFDB1D', '#43EB40'];

  beforeEach(() => {
    cy.visit('https://www.mildo.live').wait(2000);
  });

  // 잘 렌더 되는지 확인
  it('필터 렌더링', () => {
    populationLevels.map((populationLevel, index) => {
      cy.get(`ul>li`).eq(index).should('be.visible').contains(populationLevel);
    });
  });

  it('필터 선택', () => {
    // cy.get('div>svg>path').should('be.visible');

    cy.get('svg[width="35"][height="50"]').should('have.length', 50);

    // 전체 해제

    cy.get(`ul>li`).each($li => {
      cy.wrap($li).click();
    });

    // 마커가 하나도 없어야 함
    cy.get('div>svg').should('not.exist');

    // 하나씩 눌렀을 때
    populationColors.map((color, index) => {
      cy.get(`ul>li`).eq(index).click();

      const marker = cy
        .get('svg[width="35"][height="50"]')
        .should('have.length', 0);

      if (!marker) {
        cy.get('svg[width="35"][height="50"]').should(
          'have.attr',
          'fill',
          color
        );
        // 다른 컬러는 존재하지 않음
        populationColors
          .filter(other => other !== color)
          .map(other => {
            cy.get('svg[width="35"][height="50"]').should(
              'not.have.attr',
              'fill',
              other
            );
          });
      }
      // const marker = cy.get('svg[width="35"][height="50"]');

      // if (cy.wrap(marker)) {
      //   // 해당 컬러 존재
      //   cy.wrap(marker).should('have.attr', 'fill', color);
      //   // 다른 컬러는 존재하지 않음
      //   populationColors
      //     .filter(other => other !== color)
      //     .map(other => {
      //       cy.wrap(marker).should('not.have.attr', 'fill', other);
      //     });
      // }
      cy.get(`ul>li`).eq(index).click();
    });
  });
});
