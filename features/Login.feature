Feature: Amazon Project


Scenario: Navigate To Bible Page
        Given I visit amazon app online
        Then click on the signin 
        When I type my email "pozit2003@yahoo.com" and hit enter
        When I type incorrect password "pozit2003" and hit enter
        Then the text "Your password is incorrect" is displayed
            