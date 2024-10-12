export class GridPage {
  navigateTo(): void {
    cy.visit('/');
  }

  getTitleText(): Cypress.Chainable<string> {
    return cy.get('app-root .title').invoke('text');
  }

  getGridCells(): Cypress.Chainable<string[]> {
    return cy.get('.container .cell').then((cells) => {
      return Cypress._.map(cells, 'innerText');
    });
  }

  enterCharacter(character: string): void {
    cy.get('#characterInput').type(character);
  }

  clickGenerateButton(): void {
    cy.get('#generateButton').click();
  }

  getCodeText(): Cypress.Chainable<string> {
    return cy.get('.code-display span').invoke('text');
  }
}
