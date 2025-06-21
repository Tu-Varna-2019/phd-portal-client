describe("Navigation", () => {
  it("should navigate to candidates page", () => {
    cy.visit("https://localhost:3000/candidate/en");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="contests"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/contests");

    // The new page should contain an h1 with "About"
    cy.get("h2").contains("Обявяване на конкурси за докторанти");
  });
});
