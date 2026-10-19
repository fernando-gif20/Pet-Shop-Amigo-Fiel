
// =========================================
// GAMEHUB
// =========================================

let usuarioLogado = false;


// =========================================
// LOGIN
// =========================================

function fazerLogin() {

    let usuario =
        document.getElementById("usuario").value;

    let senha =
        document.getElementById("senha").value;


    if (usuario == "") {

        alert("Digite seu usuário!");

        return;
    }


    if (senha == "") {

        alert("Digite sua senha!");

        return;
    }


    usuarioLogado = true;


    document.getElementById(
        "loginResultado"
    ).innerHTML =

        "✅ <strong>Login realizado!</strong>" +
        "<br><br>" +

        "Bem-vindo, <strong>" +
        usuario +
        "</strong>!";

}


// =========================================
// CRIAR PERSONAGEM
// =========================================

function criarPersonagem() {


    if (usuarioLogado == false) {

        alert(
            "Faça login antes de criar seu personagem!"
        );

        return;
    }


    let nome =
        document.getElementById(
            "nomePersonagem"
        ).value;


    let classe =
        document.getElementById(
            "classe"
        ).value;


    let nivel =
        Number(
            document.getElementById(
                "nivel"
            ).value
        );


    let estilo =
        document.getElementById(
            "estilo"
        ).value;


    if (nome == "") {

        alert("Digite o nome!");

        return;
    }


    if (classe == "") {

        alert("Escolha uma classe!");

        return;
    }


    if (estilo == "") {

        alert("Escolha seu estilo!");

        return;
    }


    if (nivel < 1 || nivel > 100) {

        alert(
            "O nível deve estar entre 1 e 100!"
        );

        return;
    }


    let avatar = "🎮";


    if (classe == "Guerreiro") {

        avatar = "⚔️";

    }

    else if (classe == "Mago") {

        avatar = "🔮";

    }

    else if (classe == "Arqueiro") {

        avatar = "🏹";

    }

    else if (classe == "Assassino") {

        avatar = "🗡️";

    }


    document.getElementById(
        "personagemResultado"
    ).innerHTML =

        "<h3>" +
        avatar +
        " " +
        nome +
        "</h3>" +

        "<p><strong>Classe:</strong> " +
        classe +
        "</p>" +

        "<p><strong>Nível:</strong> " +
        nivel +
        "</p>" +

        "<p><strong>Estilo:</strong> " +
        estilo +
        "</p>" +

        "<p>🔥 Personagem criado!</p>";

}


// =========================================
// CALCULAR COMPRA
// =========================================

function calcularCompra() {


    let jogo =
        document.getElementById(
            "jogo"
        ).value;


    let plataforma =
        document.getElementById(
            "plataforma"
        ).value;


    let quantidade =
        Number(
            document.getElementById(
                "quantidade"
            ).value
        );


    if (jogo == "") {

        alert("Escolha um jogo!");

        return;
    }


    if (plataforma == "") {

        alert("Escolha uma plataforma!");

        return;
    }


    if (quantidade <= 0) {

        alert("Quantidade inválida!");

        return;
    }


    let preco = 0;
    let nomeJogo = "";


    // 4 JOGOS

    if (jogo == "gta") {

        preco = 449.90;
        nomeJogo = "GTA VI";

    }

    else if (jogo == "mw4") {

        preco = 349.90;
        nomeJogo = "Modern Warfare 4";

    }

    else if (jogo == "forza") {

        preco = 299.90;
        nomeJogo = "Forza Horizon 6";

    }

    else if (jogo == "elden") {

        preco = 249.90;
        nomeJogo = "Elden Ring: Nightreign";

    }


    // CÁLCULO

    let subtotal =
        preco * quantidade;


    let desconto = 0;


    if (quantidade >= 4) {

        desconto = 20;

    }

    else if (quantidade >= 2) {

        desconto = 10;

    }


    let valorDesconto =
        subtotal * desconto / 100;


    let total =
        subtotal - valorDesconto;


    // RESULTADO

    document.getElementById(
        "textoResultado"
    ).innerHTML =

        "🎮 <strong>Jogo:</strong> " +
        nomeJogo +

        "<br>" +

        "🖥️ <strong>Plataforma:</strong> " +
        plataforma +

        "<br>" +

        "📦 <strong>Quantidade:</strong> " +
        quantidade +

        "<br>" +

        "💰 <strong>Preço:</strong> R$ " +
        preco.toFixed(2) +

        "<br>" +

        "💵 <strong>Subtotal:</strong> R$ " +
        subtotal.toFixed(2) +

        "<br>" +

        "🏷️ <strong>Desconto:</strong> " +
        desconto +
        "%" +

        "<br>" +

        "💳 <strong>TOTAL:</strong> R$ " +
        total.toFixed(2);

}


// =========================================
// LIMPAR
// =========================================

function limparCompra() {

    document.getElementById(
        "jogo"
    ).value = "";


    document.getElementById(
        "plataforma"
    ).value = "";


    document.getElementById(
        "quantidade"
    ).value = 1;


    document.getElementById(
        "textoResultado"
    ).innerHTML =

        "Escolha um jogo.";

}

