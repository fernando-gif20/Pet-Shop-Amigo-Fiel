console.log("JavaScript conectado!");
function cadastrar() {
    let nome =
        document.getElementById("nome").value;
    let email =
        document.getElementById("email").value;
    let data =
        document.getElementById("data").value;
    let curso =
        document.getElementById("curso").value;
    let turno =
        document.getElementById("turno").value;
    if (nome == "") {
        alert("Digite seu nome.");
        return;
    }
    if (email == "") {
        alert("Digite seu e-mail.");
        return;
    }
    if (data == "") {
        alert("Selecione sua data de nascimento.");
        return;
    }
    if (curso == "") {
        alert("Selecione um curso.");
        return;
    }
    if (turno == "") {
        alert("Selecione um turno.");
        return;
    }
    document.getElementById("resultado").style.display =
        "block";
    document.getElementById("resultadoNome").textContent =
        nome;
    document.getElementById("resultadoEmail").textContent =
        email;
    document.getElementById("resultadoData").textContent =
        data;
    document.getElementById("resultadoCurso").textContent =
        curso;
    document.getElementById("resultadoTurno").textContent =
        turno;
    document.getElementById("tituloResultado").textContent =
        "Cadastro realizado!";
    document.getElementById("tituloResultado").style.color =
        "blue";
    console.log("Nome: " + nome);
    console.log("E-mail: " + email);
    console.log("Data: " + data);
    console.log("Curso: " + curso);
    console.log("Turno: " + turno);
}
function limpar() {
    let resposta =
        confirm("Deseja realmente limpar os campos?");
    if (resposta == true) {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("data").value = "";
        document.getElementById("curso").value = "";
        document.getElementById("turno").value = "";
        document.getElementById("resultado").style.display =
            "none";
        document.getElementById("nomeDigitado").textContent =
            "";
        document.getElementById("cursoSelecionado").textContent =
            "Nenhum";
    }
}
function mostrarCurso() {
    let curso =
        document.getElementById("curso").value;
    if (curso == "") {
        document.getElementById("cursoSelecionado").textContent =
            "Nenhum";
        return;
    }


}
function mostrarNome() {
    let nome =
        document.getElementById("nome").value;
    document.getElementById("nomeDigitado").textContent =
        nome;
}
function entrarAviso() {
    document.getElementById("aviso").style.backgroundColor =
        "lightblue";
    document.getElementById("aviso").textContent =
        "Preencha todos os campos antes de cadastrar.";
}
function sairAviso() {
    document.getElementById("aviso").style.backgroundColor =
        "#eef4fa";
    document.getElementById("aviso").textContent =
        "Passe o mouse aqui para uma orientação.";
}