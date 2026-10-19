// =========================================
// GAMEHUB
// SISTEMA JAVASCRIPT
// =========================================


// =========================================
// CONTROLE DO LOGIN
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

        alert(
            "Digite seu usuário!"
        );

        return;

    }



    if (senha == "") {

        alert(
            "Digite sua senha!"
        );

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
        "</strong>!" +

        "<br><br>" +

        "🧙 Agora você pode criar seu personagem.";

}



// =========================================
// CRIAÇÃO DE PERSONAGEM
// =========================================

function criarPersonagem() {


    // Verifica se o jogador fez login

    if (usuarioLogado == false) {

        alert(
            "Faça login antes de criar seu personagem!"
        );

        return;

    }



    // Pegando os valores

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



    // =====================================
    // VALIDAÇÕES
    // =====================================


    if (nome == "") {

        alert(
            "Digite o nome do personagem!"
        );

        return;

    }



    if (classe == "") {

        alert(
            "Escolha uma classe!"
        );

        return;

    }



    if (estilo == "") {

        alert(
            "Escolha seu estilo!"
        );

        return;

    }



    if (
        nivel < 1 ||
        nivel > 100
    ) {

        alert(
            "O nível precisa estar entre 1 e 100!"
        );

        return;

    }



    // =====================================
    // AVATAR
    // =====================================

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



    // =====================================
    // CRIAR PERSONAGEM
    // =====================================

    document.getElementById(
        "personagemResultado"
    ).innerHTML =


        "<div class='personagem-box'>" +


            "<div class='avatar'>" +

                avatar +

            "</div>" +


            "<div>" +

                "<h3>" +

                    "🎮 " +
                    nome +

                "</h3>" +


                "<p>" +

                    "<strong>Classe:</strong> " +
                    classe +

                "</p>" +


                "<p>" +

                    "<strong>Nível:</strong> " +
                    nivel +

                "</p>" +


                "<p>" +

                    "<strong>Estilo:</strong> " +
                    estilo +

                "</p>" +


                "<p>" +

                    "🔥 Personagem criado com sucesso!" +

                "</p>" +


            "</div>" +


        "</div>";

}



// =========================================
// CALCULAR COMPRA
// =========================================

function calcularCompra() {


    // =====================================
    // PEGANDO VALORES
    // =====================================

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



    // =====================================
    // VALIDAÇÕES
    // =====================================

    if (jogo == "") {

        alert(
            "Escolha um jogo!"
        );

        return;

    }



    if (plataforma == "") {

        alert(
            "Escolha uma plataforma!"
        );

        return;

    }



    if (quantidade <= 0) {

        alert(
            "Digite uma quantidade válida!"
        );

        return;

    }



    // =====================================
    // PREÇO
    // =====================================

    let preco = 0;

    let nomeJogo = "";



    // =====================================
    // JOGOS
    // =====================================


    if (jogo == "gta") {

        preco = 449.90;

        nomeJogo =
            "Grand Theft Auto VI";

    }


    else if (jogo == "mw4") {

        preco = 349.90;

        nomeJogo =
            "Call of Duty: Modern Warfare 4";

    }


    else if (jogo == "forza") {

        preco = 299.90;

        nomeJogo =
            "Forza Horizon 6";

    }


    else if (jogo == "elden") {

        preco = 249.90;

        nomeJogo =
            "Elden Ring: Nightreign";

    }


    else if (jogo == "battlefield") {

        preco = 299.90;

        nomeJogo =
            "Battlefield 6";

    }


    else if (jogo == "kingdom") {

        preco = 249.90;

        nomeJogo =
            "Kingdom Come: Deliverance 2";

    }


    else if (jogo == "borderlands") {

        preco = 299.90;

        nomeJogo =
            "Borderlands 4";

    }


    else if (jogo == "arc") {

        preco = 199.90;

        nomeJogo =
            "ARC Raiders";

    }


    else if (jogo == "civilization") {

        preco = 249.90;

        nomeJogo =
            "Sid Meier's Civilization VII";

    }


    else if (jogo == "fc26") {

        preco = 349.90;

        nomeJogo =
            "EA Sports FC 26";

    }


    else if (jogo == "monster") {

        preco = 299.90;

        nomeJogo =
            "Monster Hunter Wilds";

    }


    else if (jogo == "dune") {

        preco = 199.90;

        nomeJogo =
            "Dune: Awakening";

    }


    else if (jogo == "silksong") {

        preco = 129.90;

        nomeJogo =
            "Hollow Knight: Silksong";

    }


    else if (jogo == "oblivion") {

        preco = 249.90;

        nomeJogo =
            "The Elder Scrolls IV: Oblivion Remastered";

    }



    // =====================================
    // CÁLCULO
    // =====================================

    let subtotal =
        preco * quantidade;



    // =====================================
    // DESCONTO
    // =====================================

    let desconto = 0;



    if (quantidade >= 4) {

        desconto = 20;

    }


    else if (quantidade >= 2) {

        desconto = 10;

    }


    else {

        desconto = 0;

    }



    // =====================================
    // VALOR DO DESCONTO
    // =====================================

    let valorDesconto =

        subtotal *
        desconto /
        100;



    // =====================================
    // TOTAL
    // =====================================

    let total =

        subtotal -
        valorDesconto;



    // =====================================
    // RESULTADO
    // =====================================

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


        "💰 <strong>Preço unitário:</strong> R$ " +

        preco.toFixed(2) +


        "<br>" +


        "💵 <strong>Subtotal:</strong> R$ " +

        subtotal.toFixed(2) +


        "<br>" +


        "🏷️ <strong>Desconto:</strong> " +

        desconto +

        "%" +


        "<br>" +


        "🔥 <strong>Economia:</strong> R$ " +

        valorDesconto.toFixed(2) +


        "<br><br>" +


        "💳 <strong>TOTAL:</strong> R$ " +

        total.toFixed(2);

}



// =========================================
// LIMPAR COMPRA
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

        "Escolha um jogo, " +
        "plataforma e quantidade.";

}