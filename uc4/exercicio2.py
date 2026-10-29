
# Controle de Estoque

produto = input("Digite o nome do produto: ")
quantidade = int(input("Digite a quantidade em estoque: "))

if quantidade < 0:
    print("Quantidade inválida")
elif quantidade == 0:
    print("Estoque zerado")
elif quantidade <= 5:
    print("Estoque baixo")
else:
    print("Estoque adequado")
