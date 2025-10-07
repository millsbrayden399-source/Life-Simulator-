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

        // Relationships (We'll simplify for now and add more later)
        this.family_relationship = 70;

        // Financial
        this.annual_income = 0;
        this.savings = getRandomInt(0, 1000);
        this.debt = 0;

        // Life Events
        this.life_events = [];
    }
}
