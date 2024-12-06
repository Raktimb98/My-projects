import random

options = ("rock", "paper", "scissor")
running = True

while running:
    # Get player input and validate it
    player = input("Enter your choice (rock, paper, scissor or 'quit' to exit): ").lower()
    
    if player == "quit":
        print("Thanks for playing!")
        break  # Exit the game
    
    while player not in options:
        print(f"Invalid choice. Choose one of the options: {options}")
        player = input("Enter your choice (rock, paper, scissor): ").lower()
    
    # Computer makes a new choice every round
    computer = random.choice(options)

    # Compare choices and determine the outcome
    if player == computer:
        print("It's a tie!")
    elif (player == "rock" and computer == "scissor") or \
        (player == "paper" and computer == "rock") or \
        (player == "scissor" and computer == "paper"):
        print("You win!")
    else:
        print("You lose!")

    # Print results
    print(f"Player: {player}")
    print(f"Computer: {computer}\n")
