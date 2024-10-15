# Shopping cart
item = input("Which item do your want to buy ? :")
quantity =int( input("How many do you want ? :"))
price = float(input("What is the price ? : "))
total = price * quantity
print(f"You have to pay : {total} rupees")