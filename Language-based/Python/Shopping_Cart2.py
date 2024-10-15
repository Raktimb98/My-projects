#Shopping cart program version 2
items = []
prices = []
total = 0
while True:
    item = input("Enter your item to buy ('q' to quit): ")
    if item.lower() == "q":
        break
    else:
        price = float(input(f"Enter the price of {item}: ₹ "))
        items.append(item)
        prices.append(price)
        total += price

print("********** YOUR CART ITEMS **********")
for i in range(len(items)):
    print(f"{items[i]} - ₹{prices[i]}")
print(f"Total: ₹{total}")