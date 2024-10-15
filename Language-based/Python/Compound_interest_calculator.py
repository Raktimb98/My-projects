# Compound interest calculator
principle = 0
rate = 0
time = 0
principle = float(input("Enter the principle amount:"))
while principle <= 0 :
    principle = float(input("Enter the principle amount:"))
    if principle <=0:
        print("Principle can't be negative or zero !")

rate = float(input("Enter the rate amount:"))
while rate <= 0 :
    rate = float(input("Enter the rate amount:"))
    if rate <=0:
        print("rate can't be negative or zero !")

time = int(input("Enter the time in years:"))
while time <= 0 :
    time = int(input("Enter the time in years:"))
    if time <=0:
        print("time can't be negative or zero !")

total = principle * pow((1+rate/100),time)
print(f"Total amount after {time} years is: {total:.2f}")