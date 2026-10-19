import tkinter as tk

from interface import Aplicacao
from eventos import processar


root = tk.Tk()

root.title("Calculadora")
root.geometry("300x200")

app = Aplicacao(root)

resultado_label = tk.Label(
    root,
    text="Resultado:"
)
resultado_label.pack()

botao = tk.Button(
    root,
    text="Calcular",
    command=lambda: processar(app, resultado_label)
)
botao.pack()

root.mainloop()