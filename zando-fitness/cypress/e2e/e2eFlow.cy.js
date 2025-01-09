import {format} from "date-fns";

describe("Flow e2e tests", () => {

    before(() => {
        Cypress.env("user",{
            firstName: "John",
            lastName: "Doe",
            email: `testuser${Date.now()}@example.com`, // Unique email
            password: "Password123&",
            phone: "20202020",
            address: "123 Fitness Street",
            dateOfBirth: "1998-01-01",
            membershipId: 1, // Adjust according to your app's IDs
            emergencyContact: "Jane Doe",
        });
    });

    const login = (user) => {
                cy.visit("http://localhost:3000/login");
                cy.get('input[name="email"]').type(user.email);
                cy.get('input[name="password"]').type(user.password, { log: false });
                cy.get('button[type="submit"]').click();

                // Assert successful login
                cy.url().should("not.include", "/login");
            }

    it("Should display at least one membership", () => {
        // Step 1: Visit the memberships page
        cy.visit("http://localhost:3000/membership");

        // Step 2: Verify that memberships are displayed
        cy.get(".bg-card") // Adjust if the class is different
            .should("exist") // Ensure at least one membership card exists
            .and("have.length.greaterThan", 0); // Ensure there's more than zero memberships

        // Step 3: Validate details of the first membership
        cy.get(".bg-card").first().within(() => {
            // cy.get(".bg-card-header").should("exist");
            cy.get("h3").should("contain.text", "Basic"); // Adjust with a membership name
            cy.get("p").should("contain.text", "/month");
        });
    });

    it("Register with valid details", () => {
        const user = Cypress.env("user"); // Access the user from environment variables

        cy.visit("http://localhost:3000/register");

        // Fill out the registration form using user data from env
        cy.get('input[id="firstName"]').type(user.firstName);
        cy.get('input[id="lastName"]').type(user.lastName);
        cy.get('input[id="email"]').type(user.email);
        cy.get('input[id="password"]').type(user.password);
        cy.get('input[id="phone"]').type(user.phone);
        cy.get('input[id="address"]').type(user.address);
        cy.get('input[id="dateOfBirth"]').type(user.dateOfBirth).trigger("change");

        // Select membership type
        cy.get('div#membership')
            .find('select')
            .select(user.membershipId.toString(), { force: true });

        cy.get('input[id="emergencyContact"]').type(user.emergencyContact);

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Assert successful registration
        cy.url({ timeout: 5000 }).should("include", "/login");
        cy.contains("Welcome to Zando Fitness").should("be.visible");
    });

    // it("Login with the registered user", () => {
    //     const user = Cypress.env("user"); // Access the user from environment variables
    //     login(user);
    // });

    it("Verify user information matches the expected data", () => {
        const user = Cypress.env("user"); // Access the user from environment variables
        login(user);
        // Visit the information page
        cy.visit("http://localhost:3000/user/info");

        // Assert each field matches the expected value
        cy.get('#firstName').should('have.value', user.firstName);
        cy.get('#lastName').should('have.value', user.lastName);
        cy.get('#email').should('have.value', user.email);
        cy.get('#phone').should('have.value', user.phone);
        cy.get('#address').should('have.value', user.address);
        cy.get('#emergencyContact').should('have.value', user.emergencyContact);

        // Select tab by role and text
        cy.get('button[role="tab"]').contains("My Bookings").click();
        cy.contains("You have no upcoming bookings").should("be.visible");
    });

    it("Book a class and verify it", () => {
        const user = Cypress.env("user"); // Access the user from environment variables
        login(user);
        // Step 1: Visit the classes page
        cy.visit("http://localhost:3000/classes");

        // Step 2: Search for and select a class to book
        cy.get("input#search").type("Yoga"); // Adjust search term as needed
        cy.get(".bg-card").first().within(() => {
            cy.get("button").contains("Book Class").click();
        });

        // Step 3: Confirm the booking in the dialog
        cy.get('div[role="dialog"]').within(() => {
            cy.contains("Confirm Booking").click();
        });

        // Step 4: Verify booking success message
        cy.contains("Booking Successful").should("be.visible");

        // Step 5: Navigate to "My Bookings"
        cy.visit("http://localhost:3000/user/info");
        cy.get('button[role="tab"]').contains("My Bookings").click();

        // Step 6: Verify the booked class is listed
        cy.get(".bg-card").should("contain", "Yoga").and("contain", format(Date.now(), 'MMMM d, yyyy'));
    });
});
