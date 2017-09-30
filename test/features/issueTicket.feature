Feature: Issue Ticket
  As a user of Where Are You Going
  I want to issue my ticket
  So that I can download my ticket 

  Scenario: Issue Ticket
    Given I am on the credit card information page and fill all information
    When I click on "Pay"
    Then I should see "Download my ticket"
