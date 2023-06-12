describe('Dashboard Page', () => {
  beforeEach(()=> {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
    statusCode: 200,
    fixture:'urls.json'
  })
  cy.visit("http://localhost:3000/");
  })

  it('should display a title on page load and all exisiting URLs', () => {
    cy.get('h1').should("have.text", "URL Shortener")
    cy.get(".url")
      .first()
      .get("h3")
      .contains("sloths")
      .get(".short")
      .contains("http://localhost:3001/useshorturl/1")
      .get("p")
      .contains("https://unsplash.com/photos/PZSpZQAtuG4");
    cy.get(".url")
      .last()
      .get("h3")
      .contains("corn")
      .get(".short")
      .contains("http://localhost:3001/useshorturl/3")
      .get("p")
      .contains("https://unsplash.com/photos/cjVhL2uf13s");
  })
  it("should display a form to submit details for new URLs", () => {
    cy.get("form")
      .should("be.visible")
      .get('input[name="title"]')
      .should("have.value", "")
      .get('[placeholder="Title..."]')
      .should("be.visible")
      .get("input[name=urlToShorten]")
      .should("have.value", "")
      .get('[placeholder="URL to Shorten..."]')
      .should("be.visible");
    cy.get('button').should('have.text', "Shorten Please!")
  })
  it("should update the values of inputs as the user types", () => {
      cy.get('input[name="title"]').type("test URL");
      cy.get("input[name=urlToShorten]").type("http://testURLshort")
     
      cy.get('input[name="title"]').should('have.value',"test URL");
      cy.get("input[name=urlToShorten]").should('have.value',"http://testURLshort");
  })
it("should display to the user the newly created shortened URL, title, and original URL on successful POST", () => {
  cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
    statusCode: 201,
    body: {
      id: 4,
      title: "Cat lover",
      long_url: "https://unsplash.com/photos/ZCHj_2lJP00",
      short_url: "https://localhost:3001/useshorturl/4",
    },
  }).as("postCheck");

  cy.get("form")
    .get('input[name="title"]')
    .type("Cat lover")
    .get("input[name=urlToShorten]")
    .type("https://unsplash.com/photos/cjVhL2uf13s");

  cy.get("button").click();
  cy.wait("@postCheck");

  cy.get("#4").contains("Cat lover")
    .get('.short')
    .should("contain", "https://localhost:3001/useshorturl/4")
    .get('p').should("contain","https://unsplash.com/photos/cjVhL2uf13s")
});
it("should not allow users to enter a empty title and submit the form", () => {
  cy.get('input[name="title"]')
    .type("Test Pass")
  cy.get('button').click()
  cy.get(".error").contains("Please enter both a title and a URL");
})
it("should not allow users to enter a empty URL input and submit the form", () => {
  cy.get("input[name=urlToShorten]").type("http://testURL");
  cy.get("button").click();
  cy.get(".error").contains("Please enter both a title and a URL");
});
})