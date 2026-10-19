
import json
import sqlite3
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

# Nome do banco de dados
BANCO = "estoque.db"


# Cria a tabela de produtos
def criar_banco():
    conexao = sqlite3.connect(BANCO)

    conexao.execute("""
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT NOT NULL,
            preco REAL NOT NULL,
            quantidade INTEGER NOT NULL
        )
    """)

    conexao.commit()
    conexao.close()


# Servidor do site
class Servidor(SimpleHTTPRequestHandler):

    # Envia respostas em JSON
    def responder(self, dados, status=200):
        conteudo = json.dumps(
            dados,
            ensure_ascii=False
        ).encode("utf-8")

        self.send_response(status)
        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )
        self.send_header(
            "Content-Length",
            str(len(conteudo))
        )
        self.end_headers()
        self.wfile.write(conteudo)

    # Lê os dados enviados pelo JavaScript
    def ler_dados(self):
        tamanho = int(
            self.headers.get("Content-Length", 0)
        )

        return json.loads(
            self.rfile.read(tamanho)
        )

    # Consulta os produtos
    def do_GET(self):
        caminho = urlparse(self.path).path

        if caminho == "/api/produtos":
            conexao = sqlite3.connect(BANCO)
            conexao.row_factory = sqlite3.Row

            produtos = conexao.execute(
                "SELECT * FROM produtos ORDER BY id DESC"
            ).fetchall()

            conexao.close()

            self.responder([
                dict(produto) for produto in produtos
            ])
        else:
            super().do_GET()

    # Cadastra um produto
    def do_POST(self):
        if urlparse(self.path).path != "/api/produtos":
            self.responder({"erro": "Rota inválida"}, 404)
            return

        try:
            dados = self.ler_dados()

            nome = str(dados["nome"]).strip()
            categoria = str(dados["categoria"]).strip()
            preco = float(dados["preco"])
            quantidade = int(dados["quantidade"])

            if (
                not nome
                or not categoria
                or preco <= 0
                or quantidade < 0
            ):
                raise ValueError()

        except (KeyError, TypeError, ValueError):
            self.responder({"erro": "Dados inválidos"}, 400)
            return

        conexao = sqlite3.connect(BANCO)

        conexao.execute(
            """INSERT INTO produtos
            (nome, categoria, preco, quantidade)
            VALUES (?, ?, ?, ?)""",
            (nome, categoria, preco, quantidade)
        )

        conexao.commit()
        conexao.close()

        self.responder(
            {"mensagem": "Produto cadastrado!"},
            201
        )

    # Atualiza um produto
    def do_PUT(self):
        caminho = urlparse(self.path).path
        partes = caminho.strip("/").split("/")

        if len(partes) != 3 or partes[:2] != ["api", "produtos"]:
            self.responder({"erro": "Rota inválida"}, 404)
            return

        try:
            id_produto = int(partes[2])
            dados = self.ler_dados()

            nome = str(dados["nome"]).strip()
            categoria = str(dados["categoria"]).strip()
            preco = float(dados["preco"])
            quantidade = int(dados["quantidade"])

            if (
                id_produto <= 0
                or not nome
                or not categoria
                or preco <= 0
                or quantidade < 0
            ):
                raise ValueError()

        except (ValueError, TypeError, KeyError):
            self.responder({"erro": "Dados inválidos"}, 400)
            return

        conexao = sqlite3.connect(BANCO)

        cursor = conexao.execute(
            """UPDATE produtos
            SET nome = ?, categoria = ?,
                preco = ?, quantidade = ?
            WHERE id = ?""",
            (nome, categoria, preco, quantidade, id_produto)
        )

        conexao.commit()
        alterados = cursor.rowcount
        conexao.close()

        if alterados == 0:
            self.responder(
                {"erro": "Produto não encontrado"}, 404
            )
        else:
            self.responder(
                {"mensagem": "Produto atualizado!"}
            )

    # Exclui um produto
    def do_DELETE(self):
        caminho = urlparse(self.path).path
        partes = caminho.strip("/").split("/")

        if len(partes) != 3 or partes[:2] != ["api", "produtos"]:
            self.responder({"erro": "Rota inválida"}, 404)
            return

        try:
            id_produto = int(partes[2])

            if id_produto <= 0:
                raise ValueError()

        except ValueError:
            self.responder({"erro": "ID inválido"}, 400)
            return

        conexao = sqlite3.connect(BANCO)

        cursor = conexao.execute(
            "DELETE FROM produtos WHERE id = ?",
            (id_produto,)
        )

        conexao.commit()
        excluidos = cursor.rowcount
        conexao.close()

        if excluidos == 0:
            self.responder(
                {"erro": "Produto não encontrado"}, 404
            )
        else:
            self.responder(
                {"mensagem": "Produto excluído!"}
            )


# Inicia o banco e o servidor
if __name__ == "__main__":
    criar_banco()

    servidor = HTTPServer(
        ("127.0.0.1", 8000),
        Servidor
    )

    print("StockTech funcionando!")
    print("Acesse: http://127.0.0.1:8000")

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        servidor.server_close()
