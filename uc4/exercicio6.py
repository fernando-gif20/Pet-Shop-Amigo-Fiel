
# Caixa de uma Loja

total = 0

quantidade_produtos = int(input("Quantos produtos serão comprados? "))

for i in range(1, quantidade_produtos + 1):
    print(f"\nProduto {i}")

    preco = float(input("Digite o preço do produto: R$ "))
    quantidade = int(input("Digite a quantidade: "))

    valor_item = preco * quantidade

    total = total + valor_item

if total >= 300:
    desconto = total * 0.10
else:
    desconto = 0

valor_final = total - desconto

print("\n--- RESUMO DA COMPRA ---")
print(f"Valor original: R$ {total:.2f}")
print(f"Desconto: R$ {desconto:.2f}")
print(f"Valor final: R$ {valor_final:.2f}")
