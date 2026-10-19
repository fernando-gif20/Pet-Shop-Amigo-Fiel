 
/* GUARDA A LISTA DE PRODUTOS */
let produtos = [];
 
/* IDENTIFICA SE ESTAMOS EDITANDO */
let idEdicao = null;
 
/* CONSULTA OS PRODUTOS NO SERVIDOR */
async function carregarProdutos() {
    try {
        let resposta = await fetch("/api/produtos");
 
        if (!resposta.ok) {
            throw new Error("Falha na consulta");
        }
 
        produtos = await resposta.json();
 
        mostrarProdutos();
 
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar o banco.");
    }
}
 
/* CADASTRA OU ATUALIZA UM PRODUTO */
async function salvarProduto(event) {
    event.preventDefault();
 
    /* PEGA OS DADOS DO FORMULÁRIO */
    let produto = {
        nome: document.getElementById("nome").value.trim(),
 
        categoria: document.getElementById("categoria").value,
 
        preco: Number(
            document.getElementById("preco").value
        ),
 
        quantidade: Number(
            document.getElementById("quantidade").value
        )
    };
 
    /* VALIDA OS DADOS */
    if (
        produto.nome === "" ||
        produto.categoria === "" ||
        !Number.isFinite(produto.preco) ||
        produto.preco <= 0 ||
        !Number.isInteger(produto.quantidade) ||
        produto.quantidade < 0
    ) {
        alert("Preencha os campos corretamente.");
        return;
    }
 
    /* DEFINE SE É CADASTRO OU EDIÇÃO */
    let endereco = "/api/produtos";
    let metodo = "POST";
 
    if (idEdicao !== null) {
        endereco += "/" + idEdicao;
        metodo = "PUT";
    }
 
    try {
        /* ENVIA OS DADOS PARA O PYTHON */
        let resposta = await fetch(endereco, {
            method: metodo,
 
            headers: {
                "Content-Type": "application/json"
            },
 
            body: JSON.stringify(produto)
        });
 
        if (!resposta.ok) {
            throw new Error("Falha ao salvar");
        }
 
        alert("Produto salvo com sucesso!");
 
        limparFormulario();
 
        await carregarProdutos();
 
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar o produto.");
    }
}
 
/* MOSTRA OS PRODUTOS NA TABELA */
function mostrarProdutos() {
    let lista = document.getElementById("listaProdutos");
 
    lista.innerHTML = "";
 
    let unidades = 0;
    let valorTotal = 0;
 
    /* PERCORRE OS PRODUTOS */
    for (let produto of produtos) {
        let linha = document.createElement("tr");
 
        /* CRIA AS COLUNAS */
        let dados = [
            produto.nome,
            produto.categoria,
            Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            produto.quantidade
        ];
 
        for (let dado of dados) {
            let coluna = document.createElement("td");
 
            coluna.textContent = dado;
 
            linha.appendChild(coluna);
        }
 
        /* BOTÃO EDITAR */
        let colunaAcoes = document.createElement("td");
 
        let botaoEditar = document.createElement("button");
 
        botaoEditar.textContent = "✏️ Editar";
 
        botaoEditar.onclick = function () {
            editarProduto(produto.id);
        };
 
        /* BOTÃO EXCLUIR */
        let botaoExcluir = document.createElement("button");
 
        botaoExcluir.textContent = "🗑️ Excluir";
 
        botaoExcluir.className = "excluir";
 
        botaoExcluir.onclick = function () {
            excluirProduto(produto.id);
        };
 
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);
 
        linha.appendChild(colunaAcoes);
 
        lista.appendChild(linha);
 
        /* CALCULA OS INDICADORES */
        unidades += Number(produto.quantidade);
 
        valorTotal += Number(produto.preco) *
                      Number(produto.quantidade);
    }
 
    /* ATUALIZA O RESUMO DO ESTOQUE */
    document.getElementById("totalProdutos").textContent =
        produtos.length;
 
    document.getElementById("totalUnidades").textContent =
        unidades;
 
    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}
 
/* PREPARA UM PRODUTO PARA EDIÇÃO */
function editarProduto(id) {
    let produto = produtos.find(
        item => item.id === id
    );
 
    if (produto === undefined) {
        return;
    }
 
    idEdicao = id;
 
    /* PREENCHE O FORMULÁRIO */
    document.getElementById("nome").value =
        produto.nome;
 
    document.getElementById("categoria").value =
        produto.categoria;
 
    document.getElementById("preco").value =
        produto.preco;
 
    document.getElementById("quantidade").value =
        produto.quantidade;
 
    /* ALTERA O TEXTO DO BOTÃO */
    document.getElementById("botaoSalvar").textContent =
        "💾 Salvar Alterações";
 
    /* VOLTA ATÉ O FORMULÁRIO */
    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });
}
 
/* LIMPA O FORMULÁRIO */
function limparFormulario() {
    document.getElementById("formProduto").reset();
 
    idEdicao = null;
 
    document.getElementById("botaoSalvar").textContent =
        "💾 Salvar Produto";
}
 
/* EXCLUI UM PRODUTO DO BANCO */
async function excluirProduto(id) {
    let confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );
 
    if (!confirmar) {
        return;
    }
 
    try {
        let resposta = await fetch(
            "/api/produtos/" + id,
            {
                method: "DELETE"
            }
        );
 
        if (!resposta.ok) {
            throw new Error("Falha ao excluir");
        }
 
        alert("Produto excluído!");
 
        if (idEdicao === id) {
            limparFormulario();
        }
 
        await carregarProdutos();
 
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o produto.");
    }
}
 
/* CARREGA OS PRODUTOS QUANDO A PÁGINA ABRIR */
document.addEventListener(
    "DOMContentLoaded",
    carregarProdutos
);
 
 