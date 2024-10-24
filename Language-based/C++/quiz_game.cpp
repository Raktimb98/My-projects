// Quiz Game
#include <iostream>
#include <string>
int main()
{
    std::string questions[] = {"1.What is earth ?", "2.What is nebula", "3.In which galaxy do we live ?", "4.What is GRB ?"};
    std::string options[][4] = {{"A.planet", "B.food", "C.App", "D.Star"}, {"A.a child's name", "B.a giant cloud of dust in space", "C.a unique blue colour", "D.a star's name"}, {"A.Andromeda galaxy", "B.milky way galaxy", "C.Black eye galaxy", "D.Cigar galaxy"}, {"A.Great radio blusters", "B.Gama ray blusters", "C.Gray red blue", "D.Nothing"}};
    char answerKey[] = {'A', 'B', 'B', 'B'};
    int size = sizeof(questions) / sizeof(questions[0]);
    char guess;
    int score;
    for (int i = 0; i < size; i++)
    {
        std::cout << "********************************\n";
        std::cout << questions[i] << '\n';
        std::cout << "********************************\n";
        for (int j = 0; j < sizeof(options[i]) / sizeof(options[i][0]); j++)
        {
            std::cout << options[i][j] << '\n';
        };
        std::cin >> guess;
        guess = toupper(guess);
        if (guess == answerKey[i])
        {
            std::cout << "Correct answer , you just got 7 Crore\n";
            score ++;
        }
        else{
            std::cout << "Wrong answer , now your head will be beheaded\n";
            std::cout << "Answer: " << answerKey[i] << '\n';
        }
        
    }

    return 0;
}