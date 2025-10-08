// A helper function to get a random integer within a range, similar to Python's random.randint()
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Character {
    // The constructor is the JavaScript equivalent of Python's __init__
    constructor(name) {
        // 'self' in Python is 'this' in JavaScript
        this.name = name;
        this.age = 0;
        this.life_stage = "Infant";

        // Core Attributes (0-100)
        this.intelligence = getRandomInt(30, 70);
        this.charisma = getRandomInt(30, 70);
        this.health = getRandomInt(60, 90);
        this.creativity = getRandomInt(30, 70);
        this.luck = getRandomInt(30, 70);
        this.wealth = getRandomInt(10, 50);

        // Life Status
        this.education_level = "None";
        this.career = "None";
        this.relationship_status = "Single";
        this.location = "Hometown";

        // Relationships
        this.family_relationship = 70;

        // Financial
        this.annual_income = 0;
        this.savings = getRandomInt(0, 1000);
        this.debt = 0;

        // Life Events
        this.life_events = [];
    }
}

class LifeSimulator {
    constructor() {
        // Find all the HTML elements we need to update and store them
        this.nameDisplay = document.getElementById('char-name');
        this.ageDisplay = document.getElementById('char-age');
        this.healthDisplay = document.getElementById('char-health');
        this.savingsDisplay = document.getElementById('char-savings');
        this.careerDisplay = document.getElementById('char-career');
        this.logMessage = document.getElementById('log-message');

        this.character = null; // We'll create the character soon
    }

    // This function will start the game
    startGame() {
        const characterName = prompt("Enter your character's name:", "Player");
        this.character = new Character(characterName || "Player");
        this.updateDisplay();
        this.logMessage.textContent = `A new life begins for ${this.character.name}.`;
    }

    // This function updates the HTML with the character's current stats
    updateDisplay() {
        this.nameDisplay.textContent = this.character.name;
        this.ageDisplay.textContent = this.character.age;
        this.healthDisplay.textContent = this.character.health;
        this.savingsDisplay.textContent = this.character.savings.toLocaleString();
        this.careerDisplay.textContent = this.character.career;
    }
}

// --- This is where the game actually starts ---
const game = new LifeSimulator();
game.startGame();
