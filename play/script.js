// Mensagem exibida no console para confirmar
// que o arquivo JavaScript foi carregado.
console.log("JavaScript carregado com sucesso.");
/*
Função responsável por receber o nome do jogo
e o preço, solicitar os dados do usuário,
calcular o total e confirmar a compra.
*/
function comprar(jogo, preco) {
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
jogo +
" por R$ " +
total.toFixed(2) +
"?"
);
console.log("Cliente: " + nome);
console.log("Jogo: " + jogo);
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
