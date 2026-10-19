let produtos = [];
let idEdicao = null;

const formulario = document.getElementById("formProduto");
const mensagem = document.getElementById("mensagem");

// Consulta os produtos no servidor Python
async function carregarProdutos() {
    try {
        const resposta = await fetch("/api/produtos");

        if (!resposta.ok) {
            throw new Error("Falha na consulta");
        }

        produtos = await resposta.json();
        mostrarProdutos();
    } catch (erro) {
        mostrarMensagem("Não foi possível consultar o banco. Confira se o servidor está ligado.", true);
    }
}

// Cadastra ou atualiza um produto
async function salvarProduto(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value.trim(),
        categoria: document.getElementById("categoria").value,
        preco: Number(document.getElementById("preco").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    if (
        produto.nome === "" ||
        produto.categoria === "" ||
        !Number.isFinite(produto.preco) ||
        produto.preco <= 0 ||
        !Number.isInteger(produto.quantidade) ||
        produto.quantidade < 0
    ) {
        mostrarMensagem("Preencha os campos corretamente.", true);
        return;
    }

    let endereco = "/api/produtos";
    let metodo = "POST";

    if (idEdicao !== null) {
        endereco += "/" + idEdicao;
        metodo = "PUT";
    }

    try {
        const resposta = await fetch(endereco, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Falha ao salvar");
        }

        mostrarMensagem(resultado.mensagem || "Produto salvo com sucesso!");
        limparFormulario();
        await carregarProdutos();
    } catch (erro) {
        mostrarMensagem(erro.message || "Não foi possível salvar o produto.", true);
    }
}

// Mostra os produtos na tabela e calcula os indicadores
function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    let unidades = 0;
    let valorTotal = 0;

    for (const produto of produtos) {
        const linha = document.createElement("tr");

        const valores = [
            produto.nome,
            produto.categoria,
            Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            produto.quantidade
        ];

        for (const valor of valores) {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        }

        const colunaAcoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "✏️ Editar";
        botaoEditar.addEventListener("click", function () {
            editarProduto(produto.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "🗑️ Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", function () {
            excluirProduto(produto.id);
        });

        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);
        linha.appendChild(colunaAcoes);
        lista.appendChild(linha);

        unidades += Number(produto.quantidade);
        valorTotal += Number(produto.preco) * Number(produto.quantidade);
    }

    document.getElementById("totalProdutos").textContent = produtos.length;
    document.getElementById("totalUnidades").textContent = unidades;
    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("estadoVazio").style.display =
        produtos.length === 0 ? "block" : "none";
}

// Prepara um produto para edição
function editarProduto(id) {
    const produto = produtos.find(function (item) {
        return item.id === id;
    });

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    idEdicao = id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("botaoSalvar").textContent = "💾 Salvar Alterações";
    document.getElementById("cadastro").scrollIntoView({ behavior: "smooth" });
}

// Limpa o formulário
function limparFormulario() {
    formulario.reset();
    idEdicao = null;
    document.getElementById("botaoSalvar").textContent = "💾 Salvar Produto";
}

// Exclui um produto com confirmação
async function excluirProduto(id) {
    const confirmar = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch("/api/produtos/" + id, {
            method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Falha ao excluir");
        }

        mostrarMensagem(resultado.mensagem || "Produto excluído!");
        await carregarProdutos();
    } catch (erro) {
        mostrarMensagem(erro.message || "Não foi possível excluir o produto.", true);
    }
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.className = erro ? "mensagem-erro" : "mensagem-ok";
}

formulario.addEventListener("submit", salvarProduto);
document.getElementById("botaoLimpar").addEventListener("click", limparFormulario);

carregarProdutos();
