Feature: Checkout
  As a user of Where Are You Going
  I want to checkout my favorit travel
  So that I can issue my ticket

  Scenario: Checkout
    Given I am on the advice route page 
    When I click on "Checkout"
    Then I should see "Credit information page"
