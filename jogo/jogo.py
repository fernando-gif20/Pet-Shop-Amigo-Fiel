import random


class Jogo:

    def __init__(self):
        self.opcoes = ["pedra", "papel", "tesoura"]

    def jogar(self, jogador):
        computador = random.choice(self.opcoes)

        print("Computador escolheu:", computador)

        if jogador == computador:
            return "Empate!"

        elif (
            jogador == "pedra" and computador == "tesoura"
            or jogador == "papel" and computador == "pedra"
            or jogador == "tesoura" and computador == "papel"
        ):
            return "Você ganhou!"

        else:
            return "Computador ganhou!"