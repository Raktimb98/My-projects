# calculator
operator = input("Enter the operator(+,-,*,/):")
num1 = float(input("Enter your first number:"))
num2 = float(input("Enter your second number:"))
if operator == '+':
    answer = num1 + num2
    print(f"Your ans is:{num1} + {num2}={answer}")
elif operator == '-':
    answer = num1 - num2
    print(f"Your ans is:{num1} - {num2}={answer}")
elif operator == '*':
    answer = num1 * num2
    print(f"Your ans is:{num1} * {num2}={answer}")
elif operator == '/':
    answer = num1 / num2
    print(f"Your ans is:{num1} / {num2}={answer}")
else:
    print("Something went wrong!")