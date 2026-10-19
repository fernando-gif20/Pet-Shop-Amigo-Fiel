
/* =========================================================
   SIMULADOR DE PREÇO

   Esta parte pega o plano escolhido pelo usuário,
   verifica a quantidade de meses e calcula o valor final.
   ========================================================= */


/* Seleciona o campo de plano */

const plano = document.getElementById("plano");


/* Seleciona o campo de quantidade de meses */

const meses = document.getElementById("meses");


/* Seleciona o botão de calcular */

const calcular = document.getElementById("calcular");


/* Seleciona o elemento onde o resultado aparecerá */

const resultado = document.getElementById("resltado");


/* Detecta quando o usuário clica no botão */

calcular.addEventListener("click", function () {

    /* Converte o valor do plano para número */

    const valorPlano = Number(plano.value);


    /* Converte a quantidade de meses para número */

    const quantidadeMeses = Number(meses.value);


    /* Verifica se o número de meses é válido */

    if (
        quantidadeMeses < 1 ||
        quantidadeMeses > 36
    ) {

        resultado.textContent =
            "Escolha entre 1 e 36 meses.";

        return;
    }


    /* Faz o cálculo */

    const valorFinal =
        valorPlano * quantidadeMeses;


    /* Formata o número como moeda brasileira */

    resultado.textContent =
        valorFinal.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

});



/* =========================================================
   FORMULÁRIO

   Esta parte impede que a página seja recarregada
   quando o usuário enviar o formulário.
   ========================================================= */


/* Seleciona o formulário */

const formulario =
    document.getElementById("formCadastro");


/* Seleciona a mensagem de sucesso */

const mensagemSucesso =
    document.getElementById("mensagemSucesso");


/* Detecta o envio do formulário */

formulario.addEventListener(
    "submit",
    function (evento) {

        /*
            Impede o comportamento padrão do formulário.
            Dessa maneira a página não recarrega.
        */

        evento.preventDefault();


        /*
            Verifica se os campos obrigatórios
            foram preenchidos corretamente.
        */

        


        /* Mostra a mensagem de sucesso */

        mensagemSucesso.style.display = "block";


        /* Limpa os campos */

        formulario.reset();


        /*
            Leva o usuário automaticamente
            até a mensagem.
        */

        mensagemSucesso.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);



/* =========================================================
   MÁSCARA DO TELEFONE

   Enquanto o usuário digita, o JavaScript
   coloca automaticamente:
   (00) 00000-0000
   ========================================================= */


/* Seleciona o campo telefone */

const telefone =
    document.getElementById("telefone");


/* Detecta quando o usuário digita */

telefone.addEventListener(
    "input",
    function () {

        /* Pega o valor digitado */

        let valor = telefone.value;


        /* Remove letras e símbolos */

        valor = valor.replace(/\D/g, "");


        /* Limita a quantidade de números */

        valor = valor.substring(0, 11);


        /*
            Se o telefone tiver 11 números,
            aplica a máscara de celular.
        */

        if (valor.length > 10) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{4}).*/,
                    "($1) $2-$3"
                );

        }


        /*
            Se tiver entre 7 e 10 números,
            aplica uma máscara parcial.
        */

        else if (valor.length > 6) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4}).*/,
                    "($1) $2-$3"
                );

        }


        /*
            Se tiver mais de dois números,
            adiciona os parênteses do DDD.
        */

        else if (valor.length > 2) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{0,5})/,
                    "($1) $2"
                );

        }


        /* Coloca o telefone formatado novamente no campo */

        telefone.value = valor;

    }
);



/* =========================================================
   ANIMAÇÃO DOS CARDS

   Os cards começam invisíveis e aparecem
   suavemente quando entram na tela.
   ========================================================= */


/* Seleciona todos os cards */

const cards =
    document.querySelectorAll(".feature-card");


/*
    Cria um observador para detectar
    quando um elemento aparece na tela.
*/

const observador =
    new IntersectionObserver(
        function (elementos) {

            elementos.forEach(
                function (elemento) {

                    /*
                        Se o card estiver visível,
                        mostra o elemento.
                    */

                    if (
                        elemento.isIntersecting
                    ) {

                        elemento.target.style.opacity =
                            "1";

                        elemento.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


/* Aplica a animação em cada card */

cards.forEach(function (card) {

    /* Estado inicial */

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";


    /* Tempo da animação */

    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";


    /* Começa a observar o card */

    observador.observe(card);

});