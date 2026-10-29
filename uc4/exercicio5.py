
# Sistema de Acesso

senha_correta = "1234"
tentativas = 0
acesso = False

while tentativas < 3:
    senha = input("Digite a senha: ")

    if senha == senha_correta:
        print("Acesso permitido")
        acesso = True
        break
    else:
        print("Senha incorreta")
        tentativas = tentativas + 1

if acesso == False:
    print("Acesso bloqueado")
