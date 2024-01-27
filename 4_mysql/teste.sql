CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR (100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "André Dimitrin",
    "email@teste.com",
    36
);

INSERT INTO usuarios(nome, email, idade) VALUES
    ("Luis Silva", "email@teste1.com", 25),
    ("João Oliveira", "email@teste2.com", 30),
    ("Maria Santos", "email@teste3.com", 28);

SELECT * FROM usuarios;

SELECT * FROM usuarios WHERE idade = 25;

SELECT * FROM usuarios WHERE nome LIKE "%André%";

SELECT * FROM usuarios WHERE idade >= 30;

DELETE FROM usuarios WHERE nome LIKE "%André%";

UPDATE usuarios SET nome = "Nome de Teste" WHERE nome = "Luis Silva";
