import tkinter as tk
import random

# Configurações
LARGURA = 600
ALTURA = 400
TAMANHO = 20

# Criar janela
janela = tk.Tk()
janela.title("Jogo da Cobrinha")
janela.resizable(False, False)

# Criar tela
tela = tk.Canvas(
    janela,
    width=LARGURA,
    height=ALTURA,
    bg="black"
)
tela.pack()

# Cobra
cobra = [
    [300, 200],
    [280, 200],
    [260, 200]
]

# Direção
direcao = "direita"

# Pontuação
pontos = 0

# Comida
comida = [
    random.randrange(0, LARGURA, TAMANHO),
    random.randrange(0, ALTURA, TAMANHO)
]


def mudar_direcao(evento):
    global direcao

    if evento.keysym == "Up" and direcao != "baixo":
        direcao = "cima"

    elif evento.keysym == "Down" and direcao != "cima":
        direcao = "baixo"

    elif evento.keysym == "Left" and direcao != "direita":
        direcao = "esquerda"

    elif evento.keysym == "Right" and direcao != "esquerda":
        direcao = "direita"


def desenhar():
    tela.delete("all")

    # Desenhar comida
    tela.create_rectangle(
        comida[0],
        comida[1],
        comida[0] + TAMANHO,
        comida[1] + TAMANHO,
        fill="red"
    )

    # Desenhar cobra
    for parte in cobra:
        tela.create_rectangle(
            parte[0],
            parte[1],
            parte[0] + TAMANHO,
            parte[1] + TAMANHO,
            fill="green"
        )

    # Pontuação
    tela.create_text(
        70,
        20,
        text=f"Pontuação: {pontos}",
        fill="white",
        font=("Arial", 15)
    )


def mover():
    global pontos
    global comida

    # Pega a cabeça
    cabeca = cobra[0].copy()

    # Movimenta
    if direcao == "cima":
        cabeca[1] -= TAMANHO

    elif direcao == "baixo":
        cabeca[1] += TAMANHO

    elif direcao == "esquerda":
        cabeca[0] -= TAMANHO

    elif direcao == "direita":
        cabeca[0] += TAMANHO

    # Coloca nova cabeça
    cobra.insert(0, cabeca)

    # Verifica se comeu
    if cabeca == comida:

        pontos += 1

        # Nova comida
        comida = [
            random.randrange(0, LARGURA, TAMANHO),
            random.randrange(0, ALTURA, TAMANHO)
        ]

    else:
        # Remove o último pedaço
        cobra.pop()

    # Verifica colisão
    if verificar_colisao():
        game_over()
        return

    desenhar()

    # Continua o jogo
    janela.after(100, mover)


def verificar_colisao():

    cabeca = cobra[0]

    # Bateu na parede
    if (
        cabeca[0] < 0
        or cabeca[0] >= LARGURA
        or cabeca[1] < 0
        or cabeca[1] >= ALTURA
    ):
        return True

    # Bateu no próprio corpo
    if cabeca in cobra[1:]:
        return True

    return False


def game_over():

    tela.create_text(
        LARGURA // 2,
        ALTURA // 2,
        text=f"GAME OVER!\nPontuação: {pontos}",
        fill="red",
        font=("Arial", 30, "bold")
    )


# Teclas
janela.bind("<KeyPress>", mudar_direcao)

# Começa o jogo
desenhar()
mover()

# Mantém a janela aberta
janela.mainloop()