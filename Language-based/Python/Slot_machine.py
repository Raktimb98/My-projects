import random

def spin_row():
    symbols = ["🍒", "🍉", "🍋", "🔔", "⭐"]
    return [random.choice(symbols) for _ in range(3)]

def print_row(row):
    print(" | ".join(row))

def get_payout(row, bet):
    payout_multipliers = {
        "🍒": 2,
        "🍉": 3,
        "🍋": 4,
        "🔔": 5,
        "⭐": 10
    }
    
    if row[0] == row[1] == row[2]:  
        return bet * payout_multipliers[row[0]]
    return 0

def main():
    balance = 100
    print("********************************")
    print("Welcome to the Slot Machine!")
    print("Symbols: 🍒 🍉 🍋 🔔 ⭐")
    print("Match 3 symbols to win!")
    print("********************************")
    
    while balance > 0:
        print(f"Current balance: {balance}")
        bet = input("Enter your bet: ")
        
        if not bet.isdigit():
            print("Invalid input! Please enter a number.")
            continue
        
        bet = int(bet)
        
        if bet > balance:
            print("You don't have enough balance!")
            continue
        
        if bet <= 0:
            print("Invalid bet! Must be greater than 0.")
            continue
        
        balance -= bet
        row = spin_row()
        print("Spinning...")
        print_row(row)
        
        winnings = get_payout(row, bet)
        
        if winnings > 0:
            print(f"Congratulations! You won {winnings} coins!")
            balance += winnings
        else:
            print("No match! Better luck next time.")
        
        print("--------------------------------")
    
    print("Game over! You ran out of balance.")

if __name__ == "__main__":
    main()
