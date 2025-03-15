import random
import string

char = " " + string.ascii_letters + string.digits + string.punctuation
char = list(char)
key = char.copy()
random.shuffle(key)
print(f"char: {char}")
print(f"key: {key}")

# Encryption
plain_text = input("Enter the plain text: ")
cipher_text = ""

for i in plain_text:
    if i in char:
        index = char.index(i)
        cipher_text += key[index]
    else:
        cipher_text += i
print(f"Original text: {plain_text}")
print(f"Encrypted text: {cipher_text}")

# Decryption
cipher_text = input("Enter the cipher text: ")
decrypted_text = ""

for i in cipher_text:
    if i in key:
        index = key.index(i)
        decrypted_text += char[index]
    else:
        decrypted_text += i  # Handle unknown characters

print(f"Encrypted text: {cipher_text}")
print(f"Decrypted text: {decrypted_text}")