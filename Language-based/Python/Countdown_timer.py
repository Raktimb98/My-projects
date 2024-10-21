# Countdown timer
import time
time.sleep(3)
print("Time's up")

My_time = int(input("Enter you time in second:"))
while My_time < 0:
    print("Enter a valid time!")
    My_time = int(input("Enter you time in second:"))
for x in range(My_time,0,-1):
    second = x % 60
    minutes =int (x / 60) %60
    hours = int(x / 3600)
    print(f"{hours:02}:{minutes:02}:{second:02}")
    time.sleep(1)
print("Time's up")