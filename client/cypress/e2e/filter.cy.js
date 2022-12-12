describe('필터 렌더링 테스트', () => {
  it('필터 렌더링', () => {
    cy.visit('https://www.mildo.live').wait(2000);

    const populationLevels = ['매우 붐빔', '붐빔', '보통', '여유'];

    // 잘 렌더 되는지 확인
    populationLevels.map((populationLevel, index) => {
      cy.get(`ul>li:nth-child(${index + 1})`)
        .should('be.visible')
        .contains(populationLevel);
    });
  });
});
