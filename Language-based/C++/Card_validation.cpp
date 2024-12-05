#include <iostream>
#include <string>

int getDigit(const int number);
int sumOddDigit(const std::string& cardNumber);
int sumEvenDigit(const std::string& cardNumber);

int main()
{
    std::string cardNumber;
    std::cout << "Enter your credit card number: ";
    std::cin >> cardNumber;

    int result = sumEvenDigit(cardNumber) + sumOddDigit(cardNumber);

    if (result % 10 == 0)
    {
        std::cout << cardNumber << " is valid\n";
    }
    else
    {
        std::cout << "Get the hell out of here!\n";
    }

    return 0;
}
// Function to get the sum of digits of a number
int getDigit(const int number)
{
    return number % 10 + (number / 10 % 10);
}

// Function to sum the digits in odd positions (from right)
int sumOddDigit(const std::string& cardNumber)
{
    int sum = 0;
    for (int i = cardNumber.size() - 1; i >= 0; i -= 2)
    {
        sum += cardNumber[i] - '0';
    }
    return sum;
}

// Function to sum the digits in even positions (from right)
int sumEvenDigit(const std::string& cardNumber)
{
    int sum = 0;
    for (int i = cardNumber.size() - 2; i >= 0; i -= 2)
    {
        sum += getDigit((cardNumber[i] - '0') * 2);
    }
    return sum;
}
