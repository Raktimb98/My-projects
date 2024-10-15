# validate user input
username = input("Enter your username:")
length =len(username)
has_digit = any(char.isdigit() for char in username)
has_space = ' ' in username
if length < 12 and has_digit and not has_space:
    print("username is valid!")
else:
    if length > 12:
        print("Username must not be longer than 12 characters!")
    if not has_digit:
        print("Username must contain at least one number!")
    if has_space:
        print("Username must not contain spaces!")