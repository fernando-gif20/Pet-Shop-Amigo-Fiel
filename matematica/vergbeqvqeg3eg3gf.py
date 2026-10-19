class Pessoa:

    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade


pessoa1 = Pessoa("Carlos", 20)


print("Nome:", pessoa1.nome)
print("Idade:", pessoa1.idade)