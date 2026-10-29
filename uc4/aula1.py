
# # EXEMPLO 1 - PRIMEIRO PROGRAMA
# print("Olá, turma!")
# print("Estamos programando em Python!")
# print("Vamos revisar nossos conhecimentos!")


# # EXEMPLO 2 - VARIÁVEIS
# nome = "Carlos"
# idade = 18
# cidade = "Caçador"
# print(nome)
# print(idade)
# print(cidade)



# # EXEMPLO 3 - TIPOS DE DADOS

# produto = "Teclado"
# preco = 120.50
# quantidade = 4
# disponivel = True
# print(type(produto))
# print(type(preco))
# print(type(quantidade))
# print(type(disponivel))


# # EXEMPLO 4 - OPERAÇÕES MATEMÁTICAS
# numero1 = 20
# numero2 = 5
# print(numero1 + numero2)
# print(numero1 - numero2)
# print(numero1 * numero2)
# print(numero1 / numero2)
# print(numero1 ** numero2)


# # EXEMPLO 5 - CÁLCULO DE COMPRA
# produto = "Mouse"
# preco = 50.00
# quantidade = 3
# total = preco * quantidade
# print("Produto:", produto)
# print("Quantidade:", quantidade)
# print("Total:", total)




# # EXEMPLO 6 - FORMATAÇÃO DE VALORES
# produto = "Mouse"
# preco = 50.00
# quantidade = 3
# total = preco * quantidade
# print(f"Produto: {produto}")
# print(f"Quantidade: {quantidade}")
# print(f"Valor total: R$ {total:.2f}")



# # EXEMPLO 7 - ENTRADA DE DADOS
# nome = input("Digite seu nome: ")
# print(f"Olá, {nome}!")
# print("Bem-vindo ao Python!")


# # EXEMPLO 8 - CONVERSÃO DE DADOS
# preco = float(input("Digite o preço: "))
# quantidade = int(input("Digite a quantidade: "))
# total = preco * quantidade
# print(f"Valor total: R$ {total:.2f}")


# # EXEMPLO 9 - CONDICIONAL IF E ELSE
# idade = int(input("Digite sua idade: "))
# if idade >= 18:  
#     print("Maior de idade")
# else:

#    print("Menor de idade")


#    # EXEMPLO 10 - COMPARAÇÃO DE VALORES
# numero = int(input("Digite um número: "))
# if numero == 10:
#   print("O número é igual a 10")
# else:
#   print("O número é diferente de 10")


#   # EXEMPLO 11 - MÚLTIPLAS CONDIÇÕES
# nota = float(input("Digite a nota: "))
# if nota >= 7:
#   print("Aprovado")
# elif nota >= 5:
#   print("Recuperação")
# else:
#   print("Reprovado")


#   # EXEMPLO 12 - OPERADOR AND
# idade = int(input("Digite sua idade: "))
# tem_ingresso = input("Possui ingresso? (s/n): ")
# if idade >= 18 and tem_ingresso == "s":
#   print("Entrada permitida")
# else:
#   print("Entrada não permitida")

  # EXEMPLO 13 - REPETIÇÃO FOR
# for numero in range(1, 6):
#   print(numero)


# EXEMPLO 14 - TABUADA
# numero = int(input("Digite um número: "))
# for i in range(1, 11):
#   resultado = numero * i
# print(f"{numero} x {i} = {resultado}")



# EXEMPLO 15 - REPETIÇÃO WHILE
# contador = 1
# while contador <= 5:
#   print(contador)
# contador += 1

# EXEMPLO 16 - MENU SIMPLES
# opcao = ""
# while opcao != "0":
#   print("----- MENU -----")
# print("1 - Exibir mensagem")
# print("0 - Sair")
# opcao = input("Escolha uma opção: ")

# if opcao == "1":
#  print("Bem-vindo ao sistema!")
# elif opcao == "0":
#  print("Encerrando...")
# else:
#  print("Opção inválida!")