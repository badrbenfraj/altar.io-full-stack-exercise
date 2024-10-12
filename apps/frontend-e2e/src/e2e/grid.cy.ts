import { GridPage } from '../support/grid.po';

describe('GridComponent E2E Tests', () => {
  let page: GridPage;

  beforeEach(() => {
    page = new GridPage();
  });

  it('should generate grid and display code', () => {
    page.navigateTo();
    page.enterCharacter('a');
    page.clickGenerateButton();

    page.getGridCells().should('have.length', 100);
  });

  it('should disable input after generating grid', () => {
    page.navigateTo();
    page.enterCharacter('a');
    page.clickGenerateButton();

    cy.get('#characterInput').should('be.disabled');
  });
});
