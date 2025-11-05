CREATE DATABASE db_loja_de_materiais;
USE db_loja_de_materiais;

CREATE TABLE clientes (
	cpf VARCHAR(11) PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    telefone INT NOT NULL,
    cidade VARCHAR(250) NOT NULL
    
);

INSERT INTO clientes(cpf, nome_completo, telefone, cidade)
VALUES ('49079367920', 'ricardo', '914809552', 'salto'),
		('44589367920', 'josé', '914832572', 'itu'),
        ('49093167920', 'pedro', '914589552', 'salto'),
        ('49022267920', 'neymar', '914802222', 'itu');
        
        
        INSERT INTO clientes(cpf, nome_completo, telefone, cidade)
VALUES ('49011167920', 'bruno', '911109552', 'santos');

CREATE TABLE produtos (
id_produto VARCHAR(30) PRIMARY KEY,
nome_produto VARCHAR(30) NOT NULL,
preco_unitario DECIMAL NOT NULL,
quantidade_estoque INT NOT NULL
);

INSERT INTO produtos(id_produto, nome_produto, preco_unitario, quantidade_estoque)
VALUES ('1', 'papela4', 5.00, 10),
		('2', 'caneta', 5.00, 9),
        ('3', 'lápis', 5.00, 11),
        ('4', 'papel crepom', 12.00, 15),
        ('5', 'tesoura', 10.00, 12);

CREATE TABLE pedidos (
id_pedido VARCHAR(15) PRIMARY KEY,
data_pedido DATE NOT NULL,
qtn_itens INT NOT NULL,
cancelamento VARCHAR(100)  NULL,
fk_cpf VARCHAR(11),
fk_id_produto VARCHAR(30),

CONSTRAINT fk_cpf_tbl_clientes FOREIGN KEY (fk_cpf)
        REFERENCES clientes(cpf),
        
CONSTRAINT fk_id_produto_tbl_clientes FOREIGN KEY (fk_id_produto)
	REFERENCES produtos(id_produto)

);

INSERT INTO pedidos(id_pedido, data_pedido, qtn_itens, cancelamento, fk_cpf, fk_id_produto)
VALUES ('A01', 18/03/2020, 2, '', '49079367920', '1'),
		('A02', 20/03/2020, 3, '', '44589367920', '2'),
        ('A03', 21/03/2020, 1, '', '49093167920', '3');


SELECT * FROM clientes;
SELECT * FROM produtos;
SELECT * FROM pedidos;

UPDATE produtos
SET preco_unitario = '15'
WHERE id_produto = '1';

SELECT * FROM produtos;

DELETE FROM clientes
WHERE cpf = '49011167920';

DELETE FROM clientes
WHERE cpf = '44589367920';

SELECT * FROM produtos 
WHERE preco_unitario BETWEEN 10 AND 25;

SELECT * FROM cliente
WHERE nome_completo LIKE 'a%' AND '%silva';

SELECT * FROM produtos
WHERE quantidade_estoque <10 AND quantidade_unitaria >50;

SELECT * FROM clientes
WHERE cidade IN ('São Paulo', 'Rio de janeiro');

SELECT * FROM clientes 
WHERE cidade NOT IN ('São Paulo', 'Rio de janeiro');

SELECT * FROM pedidos 
WHERE cancelamento IS NULL;

SELECT CONCAT(UPPER(nome_completo), '(', telefone,')')
AS informação_Contato
FROM clientes ;


INSERT INTO pedidos
VALUES ('A07',CURDATE(), 3, '', '49079367920', '4');


SELECT CONCAT(UPPER(nome_completo), ' (', telefone, ')') 
AS Informacoes_Clientes
FROM tbl_clientes;


SELECT COUNT(*) FROM produtos WHERE preco_unitario > 20;

SELECT AVG(preco_unitario) FROM produtos;

SELECT MIN(preco_unitario) FROM produtos;

SELECT MIN(preco_unitario) FROM produtos;

SELECT SUM(preco_unitario * quantidade_estoque)
AS preco_total
FROM produtos;



