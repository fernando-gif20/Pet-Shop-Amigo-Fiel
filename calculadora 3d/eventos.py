def processar(app, resultado_label):
    resultado = app.processar()

    resultado_label.config(
        text=f"Resultado: {resultado}"
    )