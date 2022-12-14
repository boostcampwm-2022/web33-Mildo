// 로그인 테스트 로그 함수
const loginTestLog = (username, password) => {
  // 1. 웹사이트에 접속한다.
  cy.visit('https://www.mildo.live').wait(6000);

  // 2. 로그인 버튼을 클릭한다.
  cy.get('input').next().click();

  // 3. 로그인 모달창의 '네이버 로그인' 버튼을 클릭한다.
  cy.get('a').each($a => {
    const btn = $a.find('button');

    if (btn) {
      btn.trigger('click');
    }
  });

  // 4. 아이디와 비밀번호를 입력한다.
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      console.log(cy.get('.switch'));
      cy.get('.switch').trigger('click');
      cy.get('#id_line').type(username);
      cy.get('#pw_line').type(password);

      // 5. 로그인 버튼을 누르고 로그인 한다.
      cy.get('.btn_login').click().wait(60000);

      // 6. 리다이렉트를 진행한다.
      cy.url().should('equal', 'https://www.mildo.live');
    }
  );
};

// Cypress에 명령어 입력하기
Cypress.Commands.add('loginToNaver', (username, password) => {
  const log = Cypress.log({
    displayName: 'NAVER_LOGIN',
    message: [`🔐 Authenticating | ${username}`]
  });

  log.snapshot('before');
  loginTestLog(username, password);
  log.snapshot('after');
  log.end();
});

describe('로그인 테스트', () => {
  it('사용자가 로그인을 할 수 있어야 한다', () => {
    cy.loginToNaver(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    );
  });
});
