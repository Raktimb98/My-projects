#Python number guessing game
import random
lowest_num = 1
highest_num=100
answer = random.randint(lowest_num,highest_num)
guesses = 0
is_running = True
print("Hello sleepyhead welcome to the number guessing game :)")
print(f"select a number between {lowest_num}and {highest_num}")
while is_running:
    guess = input("Enter your guess:")
    if guess.isdigit():
        guess = int(guess)
        guesses+=1
        if guess < lowest_num or guess > highest_num:
            print("Are you kidding me !")
            print(f"Please select a number between {lowest_num}and {highest_num}")
        elif guess < answer:
            print("Too low hehehahaha!")
        elif guess > answer:
            print("Too high hehehahaha!")
        else:
            print(f"Correct answer you won {answer} crore rupee!")
            print(f"Your number of guesses are {guesses}")
            is_running = False
    else:
        print("Invalid guess!")
        print(f"Please select a number between {lowest_num}and {highest_num}")
