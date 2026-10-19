let produtos = [];
let idEdicao = null;

async function carregarProdutos() {
    try {
        const resposta = await fetch("/api/produtos");
        if (!resposta.ok) throw new Error("Falha na consulta");
        produtos = await resposta.json();
        mostrarProdutos();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar o banco. Verifique se o servidor Python está funcionando.");
    }
}

async function salvarProduto(event) {
    event.preventDefault();
    const produto = {
        nome: document.getElementById("nome").value.trim(),
        categoria: document.getElementById("categoria").value,
        preco: Number(document.getElementById("preco").value),
        quantidade: Number(document.getElementById("quantidade").value)
    };

    if (produto.nome === "" || produto.categoria === "" ||
        !Number.isFinite(produto.preco) || produto.preco <= 0 ||
        !Number.isInteger(produto.quantidade) || produto.quantidade < 0) {
        alert("Preencha os campos corretamente.");
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || "Falha ao salvar");

        alert(idEdicao === null ? "Produto cadastrado com sucesso!" : "Produto atualizado com sucesso!");
        limparFormulario();
        await carregarProdutos();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar o produto.");
    }
}

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";
    let unidades = 0;
    let valorTotal = 0;

    for (const produto of produtos) {
        const linha = document.createElement("tr");
        const dados = [
            produto.nome,
            produto.categoria,
            Number(produto.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
            produto.quantidade
        ];

        for (const dado of dados) {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        }

        const colunaAcoes = document.createElement("td");
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "✏️ Editar";
        botaoEditar.onclick = () => editarProduto(produto.id);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "🗑️ Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluirProduto(produto.id);

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
        valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function editarProduto(id) {
    const produto = produtos.find(item => item.id === id);
    if (!produto) return;

    idEdicao = id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("botaoSalvar").textContent = "💾 Salvar Alterações";
    document.getElementById("cadastro").scrollIntoView({ behavior: "smooth" });
}

function limparFormulario() {
    document.getElementById("formProduto").reset();
    idEdicao = null;
    document.getElementById("botaoSalvar").textContent = "💾 Salvar Produto";
}

async function excluirProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
        const resposta = await fetch("/api/produtos/" + id, { method: "DELETE" });
        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || "Falha ao excluir");
        alert("Produto excluído!");
        if (idEdicao === id) limparFormulario();
        await carregarProdutos();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o produto.");
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
