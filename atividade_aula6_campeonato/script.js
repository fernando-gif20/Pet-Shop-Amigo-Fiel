function cadastrar() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let data = document.getElementById("data").value;
    let jogo = document.getElementById("jogo").value;
    let nivel = document.getElementById("nivel").value;

    if (nome === "") {
        alert("Digite seu nome!");
        return;
    }

    if (email === "") {
        alert("Digite seu e-mail!");
        return;
    }

    if (data === "") {
        alert("Informe sua data de nascimento!");
        return;
    }

    if (jogo === "") {
        alert("Escolha um jogo!");
        return;
    }

    if (nivel === "") {
        alert("Escolha seu nível!");
        return;
    }

    let dados = document.getElementById("dados");

    dados.textContent =
        "Nome: " + nome +
        " | E-mail: " + email +
        " | Data: " + data +
        " | Jogo: " + jogo +
        " | Nível: " + nivel;

    dados.style.backgroundColor = "#202849";

    alert("Inscrição realizada com sucesso!");
}


function limpar() {

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("data").value = "";
    document.getElementById("jogo").value = "";
    document.getElementById("nivel").value = "";

    let dados = document.getElementById("dados");

    dados.textContent = "Nenhum jogador cadastrado.";

    dados.style.backgroundColor = "#101426";
}