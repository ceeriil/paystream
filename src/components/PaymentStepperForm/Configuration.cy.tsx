import React from "react";
import Configuration from "./Configuration";

describe("<Configuration />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Configuration />);
  });
});
