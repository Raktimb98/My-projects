menu = {
    "hot dogs": 150.89,
    "hot chips": 100.63,
    "nachos": 360.9,
    "popcorn": 564.9,
    "candy": 200.25,
    "pizza": 689.3,
    "burger": 500.74,
    "cocacola": 90.36
}

cart = []
total = 0
print("***********Here is our exclusive menu in the whole universe***********")
for key, value in menu.items():
    print(f"{key.capitalize():10}: ₹{value:.2f}")
print("*********************************************************************")

while True:
    food = input("Select an item (or type 'q' to quit): ").lower()
    if food == "q":
        break
    elif food in menu:
        cart.append(food)
        print(f"Added {food.capitalize()} to your cart.")
    else:
        print("Item not found. Please try again.")

print("\nItems in your cart:")
for food in cart:
    total += menu[food]
    print(f"- {food.capitalize()} - ₹{menu[food]:.2f}")

print(f"\nTotal amount: ₹{total:.2f}")
