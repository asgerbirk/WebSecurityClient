describe("Register page", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/register"); // Adjust if the route differs
    });

    it("Register with valid details", () => {
        const user = {
            firstName: "John",
            lastName: "Doe",
            email: `testuser${Date.now()}@example.com`, // Unique email for each test
            password: "Password123&",
            phone: "20202020",
            address: "123 Fitness Street",
            dateOfBirth: "01-01-1990",
            membershipId: 1, // Adjust according to your membership IDs
            emergencyContact: "Jane Doe",
        };

        // Fill out the registration form
        cy.get('input[id="firstName"]').type(user.firstName);
        cy.get('input[id="lastName"]').type(user.lastName);
        cy.get('input[id="email"]').type(user.email);
        cy.get('input[id="password"]').type(user.password);
        cy.get('input[id="phone"]').type(user.phone);
        cy.get('input[id="address"]').type(user.address);
        cy.get('input[id="dateOfBirth"]').click(); // Open the date picker if applicable
        cy.get('input[id="dateOfBirth"]')
            .clear()
            .type('1998-01-01')
            .trigger('change')
            .trigger('blur');



        // Select membership type
        cy.get('div#membership')
            .find('select')
            .select(user.membershipId,{force: true})


        cy.get('input[id="emergencyContact"]').type(user.emergencyContact);

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Assert successful registration
        cy.url({ timeout: 5000 }).should("include", "/login"); // Replace with your redirect path
        cy.contains("Welcome to Zando Fitness").should("be.visible"); // Adjust text accordingly
    });

    it("Fail registration with invalid details", () => {
        // Leave required fields blank and try to submit
        cy.get('button[type="submit"]').click();

        // Assert error messages are displayed
        cy.contains("First name must be at least 2 characters").should("be.visible");
        cy.contains("Last name must be at least 2 characters").should("be.visible");
        cy.contains("Invalid email address").should("be.visible");
        cy.contains("Password must be at least 8 characters").should("be.visible");
    });
});
