console.log("JavaScript conectado!");
function calcularPedido() {
    let nome =
        document.getElementById("nome").value;
    let produto =
        document.getElementById("produto").value;
    let quantidade =
        Number(
            document.getElementById("quantidade").value
        );
    let cupom =
        document.getElementById("cupom").value;
    if (nome == "") {
        alert("Digite seu nome.");
        return;
    }
    if (produto == "") {
        alert("Selecione um produto.");
        return;
    }
    if (quantidade <= 0) {
        alert("Digite uma quantidade válida.");
        return;
    }
    let preco = 0;
    let nomeProduto = "";
    if (produto == "cafe") {
        preco = 8;
        nomeProduto = "Café";
    } else if (produto == "cappuccino") {
        preco = 12;
        nomeProduto = "Cappuccino";
    } else if (produto == "chocolate") {
        preco = 10;
        nomeProduto = "Chocolate Quente";
    } else if (produto == "cha") {
        preco = 7;
        nomeProduto = "Chá";
    }
    let subtotal =
        preco * quantidade;
    let desconto = 0;
    if (cupom == "CAFE10" && subtotal >= 20) {
        desconto =
            subtotal * 0.10;
    }
    let total =
        subtotal - desconto;
    document.getElementById("resultado").style.display =
        "block";
    document.getElementById("resultadoNome").textContent =
        nome;
    document.getElementById("resultadoProduto").textContent =
        nomeProduto;
    document.getElementById("resultadoQuantidade").textContent =
        quantidade;
    document.getElementById("resultadoPreco").textContent =
        preco.toFixed(2);
    document.getElementById("resultadoSubtotal").textContent =
        subtotal.toFixed(2);
    document.getElementById("resultadoDesconto").textContent =
        desconto.toFixed(2);
    document.getElementById("resultadoTotal").textContent =
        total.toFixed(2);
    console.log("Cliente: " + nome);
    console.log("Produto: " + nomeProduto);
    console.log("Quantidade: " + quantidade);
    console.log("Subtotal: " + subtotal);
    console.log("Desconto: " + desconto);
    console.log("Total: " + total);
}
function limparPedido() {
    document.getElementById("nome").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("cupom").value = "";
    document.getElementById("resultado").style.display =
        "none";
}
