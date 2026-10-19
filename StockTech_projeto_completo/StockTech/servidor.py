import json
import sqlite3
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

BANCO = "estoque.db"


def criar_banco():
    with sqlite3.connect(BANCO) as conexao:
        conexao.execute("""
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                categoria TEXT NOT NULL,
                preco REAL NOT NULL,
                quantidade INTEGER NOT NULL
            )
        """)


class Servidor(SimpleHTTPRequestHandler):
    def responder(self, dados, status=200):
        conteudo = json.dumps(dados, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(conteudo)))
        self.end_headers()
        self.wfile.write(conteudo)

    def ler_dados(self):
        tamanho = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(tamanho).decode("utf-8"))

    def do_GET(self):
        caminho = urlparse(self.path).path

        if caminho == "/api/produtos":
            with sqlite3.connect(BANCO) as conexao:
                conexao.row_factory = sqlite3.Row
                produtos = conexao.execute(
                    "SELECT * FROM produtos ORDER BY id DESC"
                ).fetchall()
            self.responder([dict(produto) for produto in produtos])
        else:
            super().do_GET()

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

            if not nome or not categoria or preco <= 0 or quantidade < 0:
                raise ValueError
        except (KeyError, TypeError, ValueError, json.JSONDecodeError):
            self.responder({"erro": "Dados inválidos"}, 400)
            return

        with sqlite3.connect(BANCO) as conexao:
            conexao.execute(
                """INSERT INTO produtos (nome, categoria, preco, quantidade)
                   VALUES (?, ?, ?, ?)""",
                (nome, categoria, preco, quantidade)
            )

        self.responder({"mensagem": "Produto cadastrado!"}, 201)

    def do_PUT(self):
        partes = urlparse(self.path).path.strip("/").split("/")
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

            if id_produto <= 0 or not nome or not categoria or preco <= 0 or quantidade < 0:
                raise ValueError
        except (KeyError, TypeError, ValueError, json.JSONDecodeError):
            self.responder({"erro": "Dados inválidos"}, 400)
            return

        with sqlite3.connect(BANCO) as conexao:
            cursor = conexao.execute(
                """UPDATE produtos
                   SET nome = ?, categoria = ?, preco = ?, quantidade = ?
                   WHERE id = ?""",
                (nome, categoria, preco, quantidade, id_produto)
            )
            alterados = cursor.rowcount

        if alterados == 0:
            self.responder({"erro": "Produto não encontrado"}, 404)
        else:
            self.responder({"mensagem": "Produto atualizado!"})

    def do_DELETE(self):
        partes = urlparse(self.path).path.strip("/").split("/")
        if len(partes) != 3 or partes[:2] != ["api", "produtos"]:
            self.responder({"erro": "Rota inválida"}, 404)
            return

        try:
            id_produto = int(partes[2])
            if id_produto <= 0:
                raise ValueError
        except ValueError:
            self.responder({"erro": "ID inválido"}, 400)
            return

        with sqlite3.connect(BANCO) as conexao:
            cursor = conexao.execute(
                "DELETE FROM produtos WHERE id = ?",
                (id_produto,)
            )
            excluidos = cursor.rowcount

        if excluidos == 0:
            self.responder({"erro": "Produto não encontrado"}, 404)
        else:
            self.responder({"mensagem": "Produto excluído!"})


if __name__ == "__main__":
    criar_banco()
    servidor = HTTPServer(("127.0.0.1", 8000), Servidor)
    print("StockTech funcionando!")
    print("Acesse: http://127.0.0.1:8000")
    print("Para parar o servidor, pressione Ctrl + C.")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        servidor.server_close()
