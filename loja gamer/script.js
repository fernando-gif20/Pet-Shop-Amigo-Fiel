
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let idEditar = -1;

// Cadastra ou edita um produto
document.getElementById("formulario").addEventListener("submit", function(evento) {
    evento.preventDefault();

    let nome = document.getElementById("nome").value;
    let categoria = document.getElementById("categoria").value;
    let preco = Number(document.getElementById("preco").value);
    let quantidade = Number(document.getElementById("quantidade").value);

    if (preco <= 0 || quantidade < 0) {
        alert("Digite um preço válido e uma quantidade válida.");
        return;
    }

    if (idEditar == -1) {
        // Adiciona um produto novo
        let produto = {
            nome: nome,
            categoria: categoria,
            preco: preco,
            quantidade: quantidade
        };

        produtos.push(produto);
    } else {
        // Altera um produto existente
        produtos[idEditar].nome = nome;
        produtos[idEditar].categoria = categoria;
        produtos[idEditar].preco = preco;
        produtos[idEditar].quantidade = quantidade;
    }

    salvarProdutos();
    mostrarProdutos();
    limparFormulario();
});

// Salva os produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Mostra os produtos na tabela
function mostrarProdutos() {
    let lista = document.getElementById("listaProdutos");
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    let totalUnidades = 0;
    let valorEstoque = 0;
    let encontrados = 0;

    for (let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];

        totalUnidades = totalUnidades + produto.quantidade;
        valorEstoque = valorEstoque + produto.preco * produto.quantidade;

        if (produto.nome.toLowerCase().includes(pesquisa)) {
            let linha = document.createElement("tr");

            let colunaNome = document.createElement("td");
            colunaNome.textContent = produto.nome;

            let colunaCategoria = document.createElement("td");
            colunaCategoria.textContent = produto.categoria;

            let colunaPreco = document.createElement("td");
            colunaPreco.textContent = dinheiro(produto.preco);

            let colunaQuantidade = document.createElement("td");
            colunaQuantidade.textContent = produto.quantidade;

            let colunaTotal = document.createElement("td");
            colunaTotal.textContent = dinheiro(produto.preco * produto.quantidade);

            let colunaAcoes = document.createElement("td");

            let botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar";
            botaoEditar.className = "editar";

            botaoEditar.onclick = function() {
                editarProduto(i);
            };

            let botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "excluir";

            botaoExcluir.onclick = function() {
                excluirProduto(i);
            };

            colunaAcoes.appendChild(botaoEditar);
            colunaAcoes.appendChild(botaoExcluir);

            linha.appendChild(colunaNome);
            linha.appendChild(colunaCategoria);
            linha.appendChild(colunaPreco);
            linha.appendChild(colunaQuantidade);
            linha.appendChild(colunaTotal);
            linha.appendChild(colunaAcoes);

            lista.appendChild(linha);
            encontrados++;
        }
    }

    document.getElementById("totalProdutos").textContent = produtos.length;
    document.getElementById("totalUnidades").textContent = totalUnidades;
    document.getElementById("valorEstoque").textContent = dinheiro(valorEstoque);

    if (encontrados == 0) {
        document.getElementById("mensagem").textContent =
            "Nenhum produto encontrado.";
    } else {
        document.getElementById("mensagem").textContent = "";
    }
}

// Transforma o valor em dinheiro
function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Coloca os dados do produto no formulário
function editarProduto(i) {
    document.getElementById("nome").value = produtos[i].nome;
    document.getElementById("categoria").value = produtos[i].categoria;
    document.getElementById("preco").value = produtos[i].preco;
    document.getElementById("quantidade").value = produtos[i].quantidade;

    idEditar = i;

    document.getElementById("titulo").textContent = "Editar produto";
    document.getElementById("botaoSalvar").textContent = "Salvar alterações";
    document.getElementById("botaoCancelar").hidden = false;

    window.scrollTo(0, 0);
}

// Exclui um produto
function excluirProduto(i) {
    let confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {
        produtos.splice(i, 1);

        if (idEditar == i) {
            limparFormulario();
        } else if (idEditar > i) {
            idEditar--;
        }

        salvarProdutos();
        mostrarProdutos();
    }
}

// Limpa os campos do formulário
function limparFormulario() {
    document.getElementById("formulario").reset();

    idEditar = -1;

    document.getElementById("titulo").textContent = "Cadastrar produto";
    document.getElementById("botaoSalvar").textContent = "Cadastrar produto";
    document.getElementById("botaoCancelar").hidden = true;
}

// Botão para cancelar a edição
document.getElementById("botaoCancelar").onclick = function() {
    limparFormulario();
};

// Pesquisa enquanto digita
document.getElementById("pesquisa").addEventListener("input", function() {
    mostrarProdutos();
});

// Mostra os produtos ao abrir a página
mostrarProdutos();