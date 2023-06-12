describe('Dashboard Page', () => {
  beforeEach(()=> {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
    statusCode: 200,
    fixture:'urls.json'
  });
  cy.visit("http://localhost:3000/");
  })

  it.skip('Should display a title on page load and all exisiting URLs', () => {
    cy.get('h1').should("have.text", "URL Shortener")
    cy.get(".url")
      .first()
      .get("h3")
      .contains("sloths")
      .get(".short")
      .contains("http://localhost:3001/useshorturl/33")
      .get("p")
      .contains("https://unsplash.com/photos/PZSpZQAtuG4");
    cy.get(".url")
      .last()
      .get("h3")
      .contains("corn")
      .get(".short")
      .contains("http://localhost:3001/useshorturl/11")
      .get("p")
      .contains("https://unsplash.com/photos/cjVhL2uf13s");
  })
  it.skip("Should display a form to submit details for new URLs", () => {
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
  it(
    "Should be able to fill out the form and display after submission "
  , () => {
      cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
        statusCode: 201,
        body: {
          id: 4,
          title: "Cat lover",
          long_url: "https://unsplash.com/photos/ZCHj_2lJP00",
          short_url:"https://localhost:3001/useshorturl/4"
        }
      }).as('postCheck')
     cy.get("form")
       .should("be.visible")
       .get('input[name="title"]')
       .type("Cat lover")
       .get("input[name=urlToShorten]")
       .type("https://unsplash.com/photos/cjVhL2uf13s");
      cy.get('button').click()
      cy.wait('@postCheck')
      cy.get("#4")
        .contains('Cat lover')
  });

})