function comprar(ingresso, preco) {
    let nome = prompt("Digite seu nome:");
    let quantidade = Number(
    prompt("Digite a quantidade desejada:")
    );
    if (quantidade <= 0 || isNaN(quantidade)) {
    alert("Digite uma quantidade válida.");
    } else {
    let total = preco * quantidade;
    let confirmacao = confirm(
    nome +
    ", deseja confirmar a compra de " +
    quantidade +
    " unidade(s) de " +
    ingresso +
    " por R$ " +
    total.toFixed(2) +
    "?"
    );
    console.log("Cliente: " + nome);
    console.log("ingresso: " + ingresso);
    console.log("Quantidade: " + quantidade);
    console.log("Total: R$ " + total.toFixed(2));
    console.log("Confirmação: " + confirmacao);
    if (confirmacao == true) {
    alert(
    "Compra realizada com sucesso! Obrigado, " +
    nome +
    "."
    );
    } else {
    alert("Compra cancelada.");
    }
    }
    }
    function comprarComDesconto(ingresso, preco) {
        let nome = prompt("Digite seu nome:");
        let desconto = preco * 0.20;
        let precoFinal = preco - desconto;
        alert(
        nome +
        ", o ingresso " +
        ingresso +
        " está com 10% de desconto. Preço final: R$ " +
        precoFinal.toFixed(2)
        );
        }