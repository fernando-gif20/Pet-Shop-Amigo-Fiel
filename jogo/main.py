from jogo import Jogo


print("=== PEDRA, PAPEL E TESOURA ===")

print("1 - Pedra")
print("2 - Papel")
print("3 - Tesoura")

opcao = int(input("Escolha uma opção: "))

if opcao == 1:
    jogador = "pedra"
elif opcao == 2:
    jogador = "papel"
elif opcao == 3:
    jogador = "tesoura"
else:
    print("Opção inválida!")
    exit()


jogo = Jogo()

resultado = jogo.jogar(jogador)

print(resultado)