// ============================================
// RECUPERA OS FILMES SALVOS
// ============================================
 
let filmes =
    JSON.parse(localStorage.getItem("filmes")) || [];
 
 
// ============================================
// VERIFICA SE EXISTE FILME SENDO EDITADO
// ============================================
 
let indiceEdicao =
    localStorage.getItem("indiceEdicao");
 
 
// ============================================
// SALVA OS FILMES NO NAVEGADOR
// ============================================
 
function salvarNoNavegador() {
 
    localStorage.setItem(
        "filmes",
        JSON.stringify(filmes)
    );
 
}
 
 
// ============================================
// MOSTRA A PRÉVIA DA IMAGEM
// ============================================
 
function mostrarPreview() {
 
    let arquivo =
        document.getElementById("imagem").files[0];
 
    let preview =
        document.getElementById("previewImagem");
 
 
    if (arquivo != undefined) {
 
        let leitor =
            new FileReader();
 
 
        leitor.onload = function () {
 
            preview.src =
                leitor.result;
 
            preview.style.display =
                "block";
 
        };
 
 
        leitor.readAsDataURL(arquivo);
 
    }
 
}
 
 
// ============================================
// CADASTRAR OU EDITAR FILME
// ============================================
 
function salvarFilme() {
 
    // PEGA OS DADOS
    let titulo =
        document.getElementById("titulo").value;
 
    let genero =
        document.getElementById("genero").value;
 
    let notaDigitada =
        document.getElementById("nota").value;
 
    let nota =
        Number(notaDigitada);
 
    let link =
        document.getElementById("link").value;
 
    let arquivo =
        document.getElementById("imagem").files[0];
 
 
    // VALIDA OS CAMPOS
    if (
        titulo == "" ||
        genero == "" ||
        notaDigitada == "" ||
        nota < 0 ||
        nota > 10 ||
        link == ""
    ) {
 
        alert(
            "Preencha todos os campos corretamente."
        );
 
        return;
 
    }
 
 
    // ========================================
    // EDIÇÃO
    // ========================================
 
    if (indiceEdicao != null) {
 
        let filmeAtual =
            filmes[indiceEdicao];
 
 
        // ESCOLHEU NOVO PÔSTER
        if (arquivo != undefined) {
 
            let leitor =
                new FileReader();
 
 
            leitor.onload = function () {
 
                atualizarFilme(
                    titulo,
                    genero,
                    nota,
                    leitor.result,
                    link
                );
 
            };
 
 
            leitor.readAsDataURL(arquivo);
 
        }
 
        // MANTÉM O PÔSTER ATUAL
        else {
 
            atualizarFilme(
                titulo,
                genero,
                nota,
                filmeAtual.imagem,
                link
            );
 
        }
 
    }
 
 
    // ========================================
    // NOVO FILME
    // ========================================
 
    else {
 
        // O PÔSTER É OBRIGATÓRIO
        if (arquivo == undefined) {
 
            alert(
                "Escolha um pôster para o filme."
            );
 
            return;
 
        }
 
 
        let leitor =
            new FileReader();
 
 
        leitor.onload = function () {
 
            cadastrarFilme(
                titulo,
                genero,
                nota,
                leitor.result,
                link
            );
 
        };
 
 
        leitor.readAsDataURL(arquivo);
 
    }
 
}
 
 
// ============================================
// CADASTRA UM NOVO FILME
// ============================================
 
function cadastrarFilme(
    titulo,
    genero,
    nota,
    imagem,
    link
) {
 
    // CRIA O OBJETO
    let filme = {
 
        titulo: titulo,
 
        genero: genero,
 
        nota: nota,
 
        imagem: imagem,
 
        link: link
 
    };
 
 
    // ADICIONA AO ARRAY
    filmes.push(filme);
 
 
    // SALVA NO LOCALSTORAGE
    salvarNoNavegador();
 
 
    alert(
        "Filme cadastrado com sucesso!"
    );
 
 
    // VAI PARA O CATÁLOGO
    window.location.href =
        "catalogo.html";
 
}
 
 
// ============================================
// MOSTRA OS FILMES
// ============================================
 
function mostrarFilmes(lista = filmes) {
 
    let area =
        document.getElementById(
            "listaFilmes"
        );
 
    let total =
        document.getElementById(
            "totalFilmes"
        );
 
    let mensagem =
        document.getElementById(
            "mensagemPesquisa"
        );
 
 
    // NÃO ESTÁ NO CATÁLOGO
    if (area == null) {
 
        return;
 
    }
 
 
    // LIMPA O CATÁLOGO
    area.innerHTML = "";
 
    mensagem.innerHTML = "";
 
 
    // NÃO EXISTEM FILMES
    if (lista.length == 0) {
 
        area.innerHTML =
            "<p>Nenhum filme encontrado.</p>";
 
    }
 
 
    // EXISTEM FILMES
    else {
 
        for (
            let i = 0;
            i < lista.length;
            i++
        ) {
 
            let filmeAtual =
                lista[i];
 
 
            // DESCOBRE O ÍNDICE REAL
            let indiceReal =
                filmes.indexOf(filmeAtual);
 
 
            // CRIA O CARD
            area.innerHTML +=
 
                "<div class='filme'>" +
 
                    "<img class='poster' " +
 
                    "src='" +
                    filmeAtual.imagem +
                    "' " +
 
                    "alt='Pôster de " +
                    filmeAtual.titulo +
                    "'>" +
 
                    "<div class='informacoes-filme'>" +
 
                        "<h3>" +
                        filmeAtual.titulo +
                        "</h3>" +
 
                        "<p>" +
                        filmeAtual.genero +
                        "</p>" +
 
                        "<p class='nota'>" +
                        "Nota: " +
                        filmeAtual.nota +
                        "</p>" +
 
                        "<div class='acoes-filme'>" +
 
                            "<a href='" +
                            filmeAtual.link +
                            "' target='_blank'>" +
 
                            "Saiba mais" +
 
                            "</a>" +
 
 
                            "<button onclick='editarFilme(" +
                            indiceReal +
                            ")'>" +
 
                            "Editar" +
 
                            "</button>" +
 
 
                            "<button onclick='excluirFilme(" +
                            indiceReal +
                            ")'>" +
 
                            "Excluir" +
 
                            "</button>" +
 
                        "</div>" +
 
                    "</div>" +
 
                "</div>";
 
        }
 
    }
 
 
    // MOSTRA A QUANTIDADE TOTAL
    total.textContent =
        filmes.length;
 
}
 
 
// ============================================
// PESQUISA PELO TÍTULO
// ============================================
 
function pesquisarFilme() {
 
    let pesquisa =
        document
            .getElementById("campoPesquisa")
            .value
            .toLowerCase();
 
 
    // SE ESTIVER VAZIO
    if (pesquisa == "") {
 
        mostrarFilmes();
 
        return;
 
    }
 
 
    let encontrados = [];
 
 
    // PERCORRE OS FILMES
    for (
        let i = 0;
        i < filmes.length;
        i++
    ) {
 
        let titulo =
            filmes[i]
                .titulo
                .toLowerCase();
 
 
        // VERIFICA SE ENCONTROU
        if (
            titulo.includes(pesquisa)
        ) {
 
            encontrados.push(
                filmes[i]
            );
 
        }
 
    }
 
 
    // MOSTRA OS RESULTADOS
    mostrarFilmes(encontrados);
 
 
    let mensagem =
        document.getElementById(
            "mensagemPesquisa"
        );
 
 
    // MOSTRA A QUANTIDADE
    if (encontrados.length == 0) {
 
        mensagem.innerHTML =
            "Nenhum filme encontrado.";
 
    }
 
    else {
 
        mensagem.innerHTML =
            encontrados.length +
            " filme(s) encontrado(s).";
 
    }
 
}
 
 
// ============================================
// PREPARA FILME PARA EDIÇÃO
// ============================================
 
function editarFilme(indice) {
 
    localStorage.setItem(
        "indiceEdicao",
        indice
    );
 
 
    window.location.href =
        "cadastro.html";
 
}
 
 
// ============================================
// CARREGA DADOS PARA EDIÇÃO
// ============================================
 
function carregarEdicao() {
 
    // NÃO ESTÁ EDITANDO
    if (indiceEdicao == null) {
 
        return;
 
    }
 
 
    let filme =
        filmes[indiceEdicao];
 
 
    // FILME NÃO EXISTE
    if (filme == undefined) {
 
        localStorage.removeItem(
            "indiceEdicao"
        );
 
        return;
 
    }
 
 
    // PREENCHE OS CAMPOS
    document.getElementById(
        "titulo"
    ).value =
        filme.titulo;
 
 
    document.getElementById(
        "genero"
    ).value =
        filme.genero;
 
 
    document.getElementById(
        "nota"
    ).value =
        filme.nota;
 
 
    document.getElementById(
        "link"
    ).value =
        filme.link;
 
 
    // MOSTRA O PÔSTER
    let preview =
        document.getElementById(
            "previewImagem"
        );
 
 
    preview.src =
        filme.imagem;
 
    preview.style.display =
        "block";
 
 
    // ALTERA O TÍTULO
    document.getElementById(
        "tituloFormulario"
    ).textContent =
        "Editar filme";
 
 
    // ALTERA O BOTÃO
    document.getElementById(
        "botaoSalvar"
    ).textContent =
        "Salvar alterações";
 
}
 
 
// ============================================
// ATUALIZA O FILME
// ============================================
 
function atualizarFilme(
    titulo,
    genero,
    nota,
    imagem,
    link
) {
 
    filmes[indiceEdicao].titulo =
        titulo;
 
    filmes[indiceEdicao].genero =
        genero;
 
    filmes[indiceEdicao].nota =
        nota;
 
    filmes[indiceEdicao].imagem =
        imagem;
 
    filmes[indiceEdicao].link =
        link;
 
 
    // SALVA
    salvarNoNavegador();
 
 
    // SAI DO MODO DE EDIÇÃO
    localStorage.removeItem(
        "indiceEdicao"
    );
 
    indiceEdicao = null;
 
 
    alert(
        "Filme atualizado com sucesso!"
    );
 
 
    // VOLTA PARA O CATÁLOGO
    window.location.href =
        "catalogo.html";
 
}
 
 
// ============================================
// EXCLUI FILME
// ============================================
 
function excluirFilme(indice) {
 
    let confirmar =
        confirm(
            "Deseja excluir " +
            filmes[indice].titulo +
            " do catálogo?"
        );
 
 
    if (confirmar == true) {
 
        // REMOVE O FILME
        filmes.splice(
            indice,
            1
        );
 
 
        // SALVA A ALTERAÇÃO
        salvarNoNavegador();
 
 
        // ATUALIZA A TELA
        mostrarFilmes();
 
    }
 
}
 
 
// ============================================
// VERIFICA SE ESTAMOS NO CADASTRO
// ============================================
 
if (
    document.getElementById("titulo") != null
) {
 
    carregarEdicao();
 
}
 