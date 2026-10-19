function calcular() {
    const produto = document.getElementById("produto").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const descontoPercent = Number(document.getElementById("desconto").value);
    const resultadoDiv = document.getElementById("resultado");

    let precoUnitario = 0;
    let nomeProduto = "";

    if (produto === "console") {
        precoUnitario = 2499.00;
        nomeProduto = "Console";
    } else if (produto === "jogo") {
        precoUnitario = 249.90;
        nomeProduto = "Jogo Digital";
    } else if (produto === "headset") {
        precoUnitario = 399.00;
        nomeProduto = "Headset Gamer";
    } else if (produto === "teclado") {
        precoUnitario = 549.00;
        nomeProduto = "Teclado Mecânico";
    } else if (produto === "mouse") {
        precoUnitario = 189.90;
        nomeProduto = "Mouse Gamer";
    } else {
        resultadoDiv.innerHTML = '<p class="erro">Selecione um produto válido!</p>';
        resultadoDiv.classList.add("ativo");
        return;
    }

    if (quantidade < 1 || isNaN(quantidade)) {
        resultadoDiv.innerHTML = '<p class="erro">Digite uma quantidade válida (mínimo 1)!</p>';
        resultadoDiv.classList.add("ativo");
        return;
    }

    const subtotal = precoUnitario * quantidade;
    const valorDesconto = subtotal * (descontoPercent / 100);
    const total = subtotal - valorDesconto;

    resultadoDiv.innerHTML = `
        <p><strong>${quantidade}x ${nomeProduto}</strong></p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
        <p>Desconto (${descontoPercent}%): - R$ ${valorDesconto.toFixed(2)}</p>
        <p class="preco">Total: R$ ${total.toFixed(2)}</p>
    `;
    resultadoDiv.classList.add("ativo");
}

function limpar() {
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "1";
    document.getElementById("desconto").value = "0";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").classList.remove("ativo");
}