describe("Login page", () => {
    before(() => {
        cy.visit("http://localhost:3000/login"); // Navigate to the login page
    });

    it("Login with Credentials", () => {
        const username = "user06@test.com";
        const password = "Ab12345678&";

        // Fill in the login form and submit
        cy.get('input[name="email"]').type(username); // Replace with the actual email input selector
        cy.get('input[name="password"]').type(password, { log: false }); // Replace with the actual password input selector
        cy.get('button[type="submit"]').click(); // Replace with the actual submit button selector

        // Verify successful login
        cy.url().should("not.include", "/login"); // Assert that we are redirected from the login page
    });
});