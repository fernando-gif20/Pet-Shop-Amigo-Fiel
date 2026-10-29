
# Calculadora de Descontos

valor = float(input("Digite o valor total da compra: R$ "))

if valor < 100:
    desconto = 0
elif valor < 200:
    desconto = valor * 0.05
else:
    desconto = valor * 0.10

valor_final = valor - desconto

print(f"Valor da compra: R$ {valor:.2f}")
print(f"Desconto: R$ {desconto:.2f}")
print(f"Valor final: R$ {valor_final:.2f}")
