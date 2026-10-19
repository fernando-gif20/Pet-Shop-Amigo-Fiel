import operacoes

while True:

    print("\n===== BIBLIOTECA =====")
    print("1 - Cadastrar livro")
    print("2 - Mostrar livros")
    print("3 - Cadastrar usuario")
    print("4 - Mostrar usuarios")
    print("5 - Sair")

    opcao = input("Digite uma opcao: ")

    if opcao == "1":
        operacoes.cadastrar_livro()

    elif opcao == "2":
        operacoes.listar_livros()

    elif opcao == "3":
        operacoes.cadastrar_usuario()

    elif opcao == "4":
        operacoes.listar_usuarios()

    elif opcao == "5":
        print("Programa encerrado.")
        break

    else:
        print("Opcao invalida!")