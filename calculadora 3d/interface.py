import tkinter as tk


class Aplicacao:

    def __init__(self, root):
        self.root = root

        self.label = tk.Label(
            root,
            text="Digite um número:"
        )
        self.label.pack()

        self.entrada = tk.Entry(root)
        self.entrada.pack()

    def processar(self):
        numero = float(self.entrada.get())
        return numero * 10