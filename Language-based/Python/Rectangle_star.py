# Rectangle 
symbol = input("Enter your symbol:")
rows = int(input("How many rows do you want:"))
while rows <= 0:
    rows = int(input("Enter a valid positive number:"))
column = int(input("How many columns do you want:"))
while column <= 0:
    column = int(input("Enter a valid positive number:"))
for x in range(rows):
    for y in range(column):
        print(symbol,end=" ")
    print()