describe('mildo 테스트', () => {
  it('연관 검색어를 입력하면 연관된 텍스트가 출력해야 한다.', () => {
    const contentType = '강남';
    const firstResult = '강남 MICE 관광특구';
    const secondResult = '강남역';

    // 1. 검색창에 '강남'을 검색하기
    cy.visit(Cypress.env('products_url')).wait(7000);
    cy.get('input').type(contentType).type('{enter}');

    cy.get('ul>li').eq(0).should('have.text', firstResult);
    cy.get('ul>li').eq(1).should('have.text', secondResult);
  });

  it('검색에 연관된 검색어가 나오지 않으면 없다는 문구를 출력해야 한다.', () => {
    const contentTypeTwo = '무야호';
    const resultText = '검색 결과가 주요 50곳에 포함되지 않습니다.';

    // 1. 검색창에 '무야호'  검색하기
    cy.visit('https://www.mildo.live').wait(7000);
    cy.get('input').type(contentTypeTwo).type('{enter}');
    cy.get('ul>li').eq(0).should('have.text', resultText);
  });
});
