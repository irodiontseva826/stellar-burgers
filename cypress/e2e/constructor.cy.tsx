const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';
const SAUCE_NAME = 'Соус Spicy-X';
const INGREDIENT = '[data-cy=burger-ingredient]';
const ORDER_NUMBER = 82854;

describe('Тестируем страницу конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000');
  });
  describe('Добавление ингредиентов', () => {
    it('Булки добавляются', () => {
      cy.get('[data-cy=buns]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor-elem__top_bun]').contains(BUN_NAME);
      cy.get('[data-cy=constructor-elem__bottom_bun]').contains(BUN_NAME);
    });

    it('Начинка добавляется', () => {
      cy.get('[data-cy=mains]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor-elem__ingredient]').contains(MAIN_NAME);
    });

    it('Соус добавляется', () => {
      cy.get('[data-cy=sauces]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();
      cy.get('[data-cy=constructor-elem__ingredient]').contains(SAUCE_NAME);
    });
  });

  describe('Работа модального окна ингредиента', () => {
    it('Модальное окно открывается', () => {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.get(INGREDIENT).contains(BUN_NAME).click();
      cy.get('[data-cy=modal]').as('modal').should('exist');
      cy.get('@modal').contains(BUN_NAME);
    });

    it('Модальное окно закрывается по клику на крестик', () => {
      cy.get(INGREDIENT).contains(BUN_NAME).click();
      cy.get('[data-cy=modal]').as('modal').should('exist');
      cy.get('[data-cy=modal__close]').click();
      cy.get('@modal').should('not.exist');
    });

    it('Модальное окно закрывается по клику на оверлей', () => {
      cy.get(INGREDIENT).contains(BUN_NAME).click();
      cy.get('[data-cy=modal]').as('modal').should('exist');
      cy.get('[data-cy=modal-overlay]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'mockRefreshToken');
      cy.setCookie('accessToken', 'mockAccessToken');
      cy.getAllLocalStorage().should('be.not.empty');
      cy.getCookie('accessToken').should('be.not.empty');
    });

    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
      cy.getAllLocalStorage().should('be.empty');
      cy.getAllCookies().should('be.empty');
    });

    it('Оформление заказа проходит корректно', () => {
      cy.get('[data-cy=buns]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();

      cy.get('[data-cy=mains]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();

      cy.get('[data-cy=sauces]')
        .children(INGREDIENT)
        .first()
        .contains('Добавить')
        .click();

      cy.get('[data-cy=order-button]').click();
      cy.get('[data-cy=modal]').as('modal').should('exist');
      cy.get('@modal').contains(ORDER_NUMBER);

      cy.get('[data-cy=modal__close]').click();
      cy.get('@modal').should('not.exist');

      cy.get('[data-cy=burger-constructor]')
        .as('constructor')
        .contains('Выберите булки');
      cy.get('@constructor').contains('Выберите начинку');
    });
  });
});
