import random
import json
import os
from datetime import datetime

class Character:
    def __init__(self, name):
        self.name = name
        self.age = 0
        self.life_stage = "Infant"
        
        # Core Attributes (0-100)
        self.intelligence = random.randint(30, 70)
        self.charisma = random.randint(30, 70)
        self.health = random.randint(60, 90)
        self.creativity = random.randint(30, 70)
        self.luck = random.randint(30, 70)
        self.wealth = random.randint(10, 50)
        
        # Life Status
        self.education_level = "None"
        self.career = "None"
        self.relationship_status = "Single"
        self.location = "Hometown"
        
        # Relationships
        self.family_relationship = 70
        self.friends = []
        self.romantic_partner = None
        self.children = []
        
        # Skills and Experience
        self.skills = {}
        self.achievements = []
        self.life_events = []
        
        # Financial
        self.annual_income = 0
        self.savings = random.randint(0, 1000)
        self.debt = 0
        
        # Education Progress
        self.in_school = False
        self.school_type = None
        self.school_year = 0
        self.gpa = 0.0

class LifeSimulator:
    def __init__(self):
        self.character = None
        self.game_over = False
        self.year_counter = 0
        
        # Game Data
        self.careers = {
            "Professional": ["Doctor", "Lawyer", "Engineer", "Teacher", "Scientist"],
            "Creative": ["Artist", "Writer", "Musician", "Designer", "Actor"],
            "Business": ["Entrepreneur", "Manager", "Sales Rep", "Accountant", "Consultant"],
            "Technical": ["Programmer", "Technician", "Researcher", "IT Specialist"],
            "Service": ["Chef", "Retail Worker", "Nurse", "Mechanic", "Electrician"],
            "Public Service": ["Police Officer", "Firefighter", "Military", "Politician", "Social Worker"]
        }
        
        self.locations = ["Hometown", "Big City", "Suburbs", "Rural Area", "Coastal Town", "Mountain Town"]
        
        self.education_paths = {
            "High School": {"duration": 4, "cost": 0, "intelligence_req": 30},
            "Community College": {"duration": 2, "cost": 15000, "intelligence_req": 50},
            "University": {"duration": 4, "cost": 60000, "intelligence_req": 60},
            "Trade School": {"duration": 1, "cost": 20000, "intelligence_req": 40},
            "Military Academy": {"duration": 4, "cost": 0, "intelligence_req": 55}
        }

    def start_game(self):
        print("=" * 50)
        print("    WELCOME TO LIFE PATH SIMULATOR")
        print("=" * 50)
        print("\nCreate your character and live a virtual life!")
        print("Make choices that will shape your destiny...\n")
        
        name = input("Enter your character's name: ").strip()
        if not name:
            name = "Player"
            
        self.character = Character(name)
        self.display_character_info()
        
        input("\nPress Enter to begin your life journey...")
        self.main_game_loop()

    def main_game_loop(self):
        while not self.game_over and self.character.age < 100:
            self.age_up()
            self.yearly_events()
            
            if self.character.health <= 0:
                self.game_over = True
                self.end_game("health")
            elif self.character.age >= 100:
                self.game_over = True
                self.end_game("old_age")
                
        if not self.game_over:
            self.end_game("completed")

    def age_up(self):
        self.character.age += 1
        self.year_counter += 1
        
        # Update life stage
        if self.character.age <= 2:
            self.character.life_stage = "Infant"
        elif self.character.age <= 12:
            self.character.life_stage = "Child"
        elif self.character.age <= 17:
            self.character.life_stage = "Teen"
        elif self.character.age <= 25:
            self.character.life_stage = "Young Adult"
        elif self.character.age <= 64:
            self.character.life_stage = "Adult"
        else:
            self.character.life_stage = "Senior"
        
        # Natural aging effects
        if self.character.age > 30:
            if random.randint(1, 10) == 1:
                self.character.health -= random.randint(1, 3)
        
        if self.character.age > 60:
            if random.randint(1, 5) == 1:
                self.character.health -= random.randint(1, 5)
        
        print(f"\n{'='*50}")
        print(f"    AGE {self.character.age} - {self.character.life_stage.upper()}")
        print(f"{'='*50}")

    def yearly_events(self):
        # Handle ongoing education
        if self.character.in_school:
            self.handle_school_year()
        
        # Generate random events based on age
        if self.character.age >= 6:
            self.generate_random_event()
        
        # Career progression
        if self.character.career != "None":
            self.handle_career_progression()
        
        # Financial updates
        self.handle_finances()
        
        # Display status and choices
        self.display_yearly_status()
        self.present_yearly_choices()

    def handle_school_year(self):
        self.character.school_year += 1
        
        if self.character.school_type == "High School":
            if self.character.school_year >= 4:
                self.character.in_school = False
                self.character.education_level = "High School Diploma"
                print(f"\n🎓 Congratulations! You graduated from High School!")
                self.character.achievements.append("High School Graduate")
        
        elif self.character.school_type in self.education_paths:
            duration = self.education_paths[self.character.school_type]["duration"]
            if self.character.school_year >= duration:
                self.character.in_school = False
                self.character.education_level = self.character.school_type
                print(f"\n🎓 Congratulations! You graduated from {self.character.school_type}!")
                self.character.achievements.append(f"{self.character.school_type} Graduate")

    def generate_random_event(self):
        events = []
        
        # Age-appropriate events
        if self.character.life_stage == "Child":
            events = [
                "You found a stray puppy. Your parents are unsure about keeping it.",
                "You're being bullied at school by an older kid.",
                "Your teacher wants to put you in advanced classes.",
                "You broke something valuable at home by accident."
            ]
        elif self.character.life_stage == "Teen":
            events = [
                "Your friends are pressuring you to skip school.",
                "You have a crush on someone in your class.",
                "Your grades are slipping this semester.",
                "You're invited to a party where there might be drinking.",
                "You have an opportunity to join the school newspaper."
            ]
        elif self.character.life_stage in ["Young Adult", "Adult"]:
            events = [
                "You're offered a job in another city.",
                "A family member needs financial help.",
                "You have an opportunity to invest in a friend's business.",
                "You're considering going back to school.",
                "You met someone interesting at a coffee shop."
            ]
        elif self.character.life_stage == "Senior":
            events = [
                "You're considering retirement.",
                "A grandchild is born.",
                "You're thinking about writing your memoirs.",
                "Health issues are becoming more frequent."
            ]
        
        if events and random.randint(1, 3) == 1:  # 33% chance of random event
            event = random.choice(events)
            print(f"\n📰 LIFE EVENT: {event}")
            self.handle_event_choices(event)

    def handle_event_choices(self, event):
        choices = []
        
        # Define choices based on event type
        if "puppy" in event.lower():
            choices = [
                ("Beg your parents to keep it", {"charisma": 5, "family_relationship": -5}),
                ("Help find the puppy a good home", {"charisma": 3, "karma": 5}),
                ("Ignore the puppy", {"health": -2})
            ]
        elif "bullied" in event.lower():
            choices = [
                ("Tell a teacher or parent", {"intelligence": 2, "charisma": -2}),
                ("Stand up to the bully", {"charisma": 5, "health": -5}),
                ("Try to avoid the bully", {"health": 2, "charisma": -3})
            ]
        elif "grades are slipping" in event.lower():
            choices = [
                ("Study harder", {"intelligence": 5, "health": -2}),
                ("Get a tutor", {"intelligence": 7, "wealth": -10}),
                ("Focus on other activities", {"creativity": 5, "intelligence": -3}),
                ("Talk to parents about it", {"family_relationship": 5})
            ]
        else:
            # Generic choices
            choices = [
                ("Handle it carefully", {"intelligence": 2}),
                ("Take a risk", {"luck": 3, "health": -1}),
                ("Ask for advice", {"charisma": 2})
            ]
        
        print("\nHow do you want to handle this?")
        for i, (choice_text, _) in enumerate(choices, 1):
            print(f"{i}. {choice_text}")
        
        try:
            choice_num = int(input("\nEnter your choice (number): ")) - 1
            if 0 <= choice_num < len(choices):
                choice_text, effects = choices[choice_num]
                self.apply_choice_effects(effects)
                print(f"\nYou chose: {choice_text}")
                self.character.life_events.append(f"Age {self.character.age}: {event} - {choice_text}")
            else:
                print("Invalid choice. Moving on...")
        except ValueError:
            print("Invalid input. Moving on...")

    def apply_choice_effects(self, effects):
        for attribute, change in effects.items():
            if hasattr(self.character, attribute):
                current_value = getattr(self.character, attribute)
                new_value = max(0, min(100, current_value + change))
                setattr(self.character, attribute, new_value)
                
                if change > 0:
                    print(f"  📈 {attribute.title()} increased by {change}")
                elif change < 0:
                    print(f"  📉 {attribute.title()} decreased by {abs(change)}")

    def handle_career_progression(self):
        if random.randint(1, 5) == 1:  # 20% chance of career event
            events = [
                "promotion opportunity",
                "new project assignment", 
                "workplace conflict",
                "training opportunity",
                "job offer from competitor"
            ]
            
            event = random.choice(events)
            print(f"\n💼 CAREER EVENT: You have a {event}")
            
            if event == "promotion opportunity":
                if self.character.intelligence > 60 and self.character.charisma > 50:
                    self.character.annual_income += random.randint(5000, 15000)
                    print("  🎉 You got promoted! Your salary increased.")
                else:
                    print("  😞 You didn't get the promotion this time.")

    def handle_finances(self):
        # Add annual income to savings
        if self.character.annual_income > 0:
            annual_after_tax = int(self.character.annual_income * 0.75)  # Simple tax
            self.character.savings += annual_after_tax
        
        # Living expenses
        if self.character.age >= 18:
            living_cost = random.randint(15000, 30000)
            self.character.savings -= living_cost
            
            if self.character.savings < 0:
                self.character.debt += abs(self.character.savings)
                self.character.savings = 0

    def display_yearly_status(self):
        print(f"\n📊 STATUS UPDATE:")
        print(f"Age: {self.character.age} | Stage: {self.character.life_stage}")
        print(f"Health: {self.character.health}/100 | Intelligence: {self.character.intelligence}/100")
        print(f"Charisma: {self.character.charisma}/100 | Creativity: {self.character.creativity}/100")
        print(f"Education: {self.character.education_level}")
        print(f"Career: {self.character.career}")
        print(f"Savings: ${self.character.savings:,} | Annual Income: ${self.character.annual_income:,}")
        if self.character.debt > 0:
            print(f"Debt: ${self.character.debt:,}")

    def present_yearly_choices(self):
        choices = []
        
        # Education choices
        if not self.character.in_school:
            if self.character.age == 6:
                choices.append(("Start Elementary School", self.start_elementary))
            elif self.character.age == 14 and self.character.education_level == "Elementary":
                choices.append(("Start High School", self.start_high_school))
            elif self.character.age >= 18 and "High School" in self.character.education_level:
                choices.append(("Apply to University", self.apply_university))
                choices.append(("Apply to Community College", self.apply_community_college))
                choices.append(("Attend Trade School", self.apply_trade_school))
        
        # Career choices
        if self.character.age >= 16 and self.character.career == "None":
            choices.append(("Look for a job", self.find_job))
        
        # Life choices
        if self.character.age >= 18:
            choices.append(("Move to a new city", self.move_city))
            choices.append(("Focus on health and fitness", self.improve_health))
            choices.append(("Take a creative hobby", self.develop_creativity))
        
        # Always available
        choices.append(("Do nothing special this year", self.do_nothing))
        
        if choices:
            print(f"\n🎯 LIFE CHOICES (Age {self.character.age}):")
            for i, (choice_text, _) in enumerate(choices, 1):
                print(f"{i}. {choice_text}")
            
            try:
                choice_num = int(input("\nWhat would you like to do this year? ")) - 1
                if 0 <= choice_num < len(choices):
                    choice_text, choice_function = choices[choice_num]
                    print(f"\nYou chose: {choice_text}")
                    choice_function()
                else:
                    print("Invalid choice. Doing nothing this year.")
                    self.do_nothing()
            except ValueError:
                print("Invalid input. Doing nothing this year.")
                self.do_nothing()

    # Choice Functions
    def start_elementary(self):
        self.character.in_school = True
        self.character.school_type = "Elementary"
        self.character.school_year = 1
        print("📚 You started elementary school!")

    def start_high_school(self):
        self.character.in_school = True
        self.character.school_type = "High School"
        self.character.school_year = 1
        print("🏫 You started high school!")

    def apply_university(self):
        if self.character.intelligence >= 60 and self.character.savings >= 15000:
            self.character.in_school = True
            self.character.school_type = "University"
            self.character.school_year = 1
            self.character.debt += 15000  # First year tuition
            print("🎓 You were accepted to university!")
        else:
            if self.character.intelligence < 60:
                print("❌ Your grades weren't high enough for university.")
            else:
                print("❌ You can't afford university tuition right now.")

    def apply_community_college(self):
        if self.character.savings >= 5000:
            self.character.in_school = True
            self.character.school_type = "Community College"
            self.character.school_year = 1
            self.character.savings -= 5000
            print("📖 You enrolled in community college!")
        else:
            print("❌ You can't afford community college tuition right now.")

    def apply_trade_school(self):
        if self.character.savings >= 10000:
            self.character.in_school = True
            self.character.school_type = "Trade School"
            self.character.school_year = 1
            self.character.savings -= 10000
            print("🔧 You enrolled in trade school!")
        else:
            print("❌ You can't afford trade school tuition right now.")

    def find_job(self):
        available_jobs = []
        
        # Entry level jobs for teens
        if self.character.age < 18:
            available_jobs = [("Cashier", 15000), ("Food Service", 14000), ("Retail Associate", 16000)]
        else:
            # Jobs based on education
            if "University" in self.character.education_level:
                available_jobs = [("Junior Analyst", 45000), ("Teacher", 40000), ("Engineer", 55000)]
            elif "Trade School" in self.character.education_level:
                available_jobs = [("Electrician", 50000), ("Mechanic", 45000), ("Technician", 48000)]
            elif "High School" in self.character.education_level:
                available_jobs = [("Office Clerk", 25000), ("Sales Associate", 28000), ("Security Guard", 30000)]
            else:
                available_jobs = [("Laborer", 20000), ("Cleaner", 18000), ("Delivery Driver", 22000)]
        
        if available_jobs:
            print("\n💼 Available Jobs:")
            for i, (job, salary) in enumerate(available_jobs, 1):
                print(f"{i}. {job} - ${salary:,}/year")
            
            try:
                job_choice = int(input("Choose a job (number): ")) - 1
                if 0 <= job_choice < len(available_jobs):
                    job_name, salary = available_jobs[job_choice]
                    self.character.career = job_name
                    self.character.annual_income = salary
                    print(f"🎉 Congratulations! You got a job as a {job_name}!")
                else:
                    print("Invalid choice. No job selected.")
            except ValueError:
                print("Invalid input. No job selected.")

    def move_city(self):
        print(f"\nCurrent location: {self.character.location}")
        print("Available locations:")
        for i, location in enumerate(self.locations, 1):
            if location != self.character.location:
                print(f"{i}. {location}")
        
        try:
            choice = int(input("Choose new location (number): ")) - 1
            available_locations = [loc for loc in self.locations if loc != self.character.location]
            if 0 <= choice < len(available_locations):
                new_location = available_locations[choice]
                moving_cost = random.randint(2000, 8000)
                
                if self.character.savings >= moving_cost:
                    self.character.location = new_location
                    self.character.savings -= moving_cost
                    print(f"🏠 You moved to {new_location}! Moving cost: ${moving_cost:,}")
                    
                    # Location benefits/drawbacks
                    if new_location == "Big City":
                        self.character.annual_income += 5000
                        print("  💰 Your salary increased due to higher cost of living!")
                else:
                    print(f"❌ You can't afford the moving cost of ${moving_cost:,}")
        except ValueError:
            print("Invalid input. Staying in current location.")

    def improve_health(self):
        health_gain = random.randint(5, 15)
        self.character.health = min(100, self.character.health + health_gain)
        cost = random.randint(500, 2000)
        
        if self.character.savings >= cost:
            self.character.savings -= cost
            print(f"💪 You focused on health and fitness! Health +{health_gain} (Cost: ${cost:,})")
        else:
            # Free health improvement with less benefit
            health_gain = random.randint(2, 8)
            self.character.health = min(100, self.character.health + health_gain)
            print(f"💪 You exercised and ate better! Health +{health_gain} (Free)")

    def develop_creativity(self):
        creativity_gain = random.randint(3, 12)
        self.character.creativity = min(100, self.character.creativity + creativity_gain)
        cost = random.randint(200, 1500)
        
        if self.character.savings >= cost:
            self.character.savings -= cost
            print(f"🎨 You took up a creative hobby! Creativity +{creativity_gain} (Cost: ${cost:,})")
        else:
            # Free creativity improvement with less benefit
            creativity_gain = random.randint(1, 6)
            self.character.creativity = min(100, self.character.creativity + creativity_gain)
            print(f"🎨 You explored free creative activities! Creativity +{creativity_gain}")

    def do_nothing(self):
        # Small random stat changes
        if random.randint(1, 3) == 1:
            stat_changes = []
            if random.randint(1, 2) == 1:
                change = random.randint(1, 3)
                self.character.health += change
                stat_changes.append(f"Health +{change}")
            
            if random.randint(1, 2) == 1:
                change = random.randint(1, 2)
                self.character.charisma += change
                stat_changes.append(f"Charisma +{change}")
            
            if stat_changes:
                print(f"😌 You had a peaceful year. {', '.join(stat_changes)}")
            else:
                print("😌 You had a quiet, uneventful year.")
        else:
            print("😌 You had a quiet, uneventful year.")

    def display_character_info(self):
        print(f"\n👤 CHARACTER CREATED: {self.character.name}")
        print(f"Intelligence: {self.character.intelligence}/100")
        print(f"Charisma: {self.character.charisma}/100") 
        print(f"Health: {self.character.health}/100")
        print(f"Creativity: {self.character.creativity}/100")
        print(f"Luck: {self.character.luck}/100")
        print(f"Starting Wealth: ${self.character.wealth}")

    def end_game(self, reason):
        print(f"\n{'='*50}")
        print("           GAME OVER")
        print(f"{'='*50}")
        
        if reason == "health":
            print(f"💀 {self.character.name} passed away due to poor health at age {self.character.age}.")
        elif reason == "old_age":
            print(f"🕊️ {self.character.name} lived a full life and passed away peacefully at age {self.character.age}.")
        else:
            print(f"🎉 {self.character.name} completed their life journey!")
        
        print(f"\n📊 LIFE SUMMARY:")
        print(f"Final Age: {self.character.age}")
        print(f"Education: {self.character.education_level}")
        print(f"Career: {self.character.career}")
        print(f"Final Wealth: ${self.character.savings:,}")
        print(f"Location: {self.character.location}")
        
        if self.character.achievements:
            print(f"\n🏆 ACHIEVEMENTS:")
            for achievement in self.character.achievements:
                print(f"  • {achievement}")
        
        if self.character.life_events:
            print(f"\n📖 MAJOR LIFE EVENTS:")
            for event in self.character.life_events[-5:]:  # Show last 5 events
                print(f"  • {event}")
        
        print(f"\nThank you for playing Life Path Simulator!")
        
        # Ask if player wants to play again
        play_again = input("\nWould you like to start a new life? (y/n): ").lower().strip()
        if play_again == 'y':
            self.__init__()  # Reset the game
            self.start_game()

def main():
    game = LifeSimulator()
    game.start_game()

if __name__ == "__main__":
    main()
