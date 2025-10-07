// This event listener ensures our code runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // == THE PLAYER OBJECT ==
    // All data about our character is stored here
    let player = {
        age: 0,
        money: 0,
        happiness: 85,
        health: 90,
        smarts: 50,
        looks: 75,
    };

    // == HTML ELEMENT REFERENCES ==
    // We need to connect our script to the elements on the page
    const ageValue = document.getElementById('age-value');
    const moneyValue = document.getElementById('money-value');
    const happinessValue = document.getElementById('happiness-value');
    const healthValue = document.getElementById('health-value');
    const eventLog = document.getElementById('event-log');
    const ageUpButton = document.getElementById('age-up-button');

    // == GAME FUNCTIONS ==

    // This function will update the display with the player's current stats
    function updateDisplay() {
        // We will write this code in a future step
    }

    // This function will handle what happens when you click "Age Up"
    function ageUp() {
        // We will write this code in the next step
        console.log("Age Up button was clicked!");
    }

    // == EVENT LISTENERS ==
    // This connects the "Age Up" button to our ageUp function
    ageUpButton.addEventListener('click', ageUp);

});
