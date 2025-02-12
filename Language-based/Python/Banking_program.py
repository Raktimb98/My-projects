def show_balance(balance):
    print("*******************************************")
    print(f"Your balance is: ${balance:.2f}")
    print("*******************************************")

def deposit(balance):
    print("*******************************************")
    amount = float(input("Enter the amount you want to deposit: "))
    print("*******************************************")
    balance += amount
    show_balance(balance)
    print("*******************************************")
    print(f"You have deposited ${amount:.2f}")
    print("*******************************************")
    return balance

def withdraw(balance):
    print("*******************************************")
    amount = float(input("Enter the amount you want to withdraw: "))
    print("*******************************************")
    if amount > balance:
        print("*******************************************")
        print("Insufficient funds")
        print("*******************************************")
    else:
        balance -= amount
        show_balance(balance)
        print("*******************************************")
        print(f"You have withdrawn ${amount:.2f}")
        print("*******************************************")
    return balance

# Main program
def main():
    balance = 0
    is_running = True

    while is_running:
        print("*******************************************")
        print("         Welcome to the RTB bank           ")
        print("*******************************************")
        print("1. Show balance")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Exit")
        print("*******************************************")
        choice = input("Enter your choice: ")
        if choice == "1":
            show_balance(balance)
        elif choice == "2":
            balance = deposit(balance)
        elif choice == "3":
            balance = withdraw(balance)
        elif choice == "4":
            is_running = False
        else:
            print("*******************************************")
            print("             Invalid choice                ")
            print("*******************************************")
    print("Thank you for using the RTB bank")
    print("*******************************************")

if __name__ == "__main__":
    main()