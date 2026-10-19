livros = []
usuarios = []


def cadastrar_livro():
    titulo = input("Digite o titulo: ")
    autor = input("Digite o autor: ")
    ano = input("Digite o ano: ")

    livros.append([titulo, autor, ano])

    print("Livro cadastrado!")


def listar_livros():
    print("\n--- LIVROS ---")

    if len(livros) == 0:
        print("Nenhum livro cadastrado.")
    else:
        for livro in livros:
            print("Titulo:", livro[0])
            print("Autor:", livro[1])
            print("Ano:", livro[2])
            print("----------------")


def cadastrar_usuario():
    nome = input("Digite o nome: ")
    idade = input("Digite a idade: ")

    usuarios.append([nome, idade])

    print("Usuario cadastrado!")


def listar_usuarios():
    print("\n--- USUARIOS ---")

    if len(usuarios) == 0:
        print("Nenhum usuario cadastrado.")
    else:
        for usuario in usuarios:
            print("Nome:", usuario[0])
            print("Idade:", usuario[1])
            print("----------------")