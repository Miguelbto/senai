CREATE DATABASE db_biblioteca_comunitaria_b;

USE db_biblioteca_comunitaria_b;


CREATE TABLE autores (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55) NOT NULL,
    nacionalidade VARCHAR(100)
);



CREATE TABLE livros (
    isbn VARCHAR(13) PRIMARY KEY,
    titulo VARCHAR(55) NOT NULL,
    ano_publicacao YEAR,
    editora VARCHAR(150)
);


CREATE TABLE livro_autor (
    fk_livro_isbn VARCHAR(13) NOT NULL,
    fk_autores_codigo INT NOT NULL,
    
    foreign key (isbn) references tbl_livros(isbn),
    constraint FK_id_autor foreign key (id_autor)
    references tbl_autor(id_autor)
);


CREATE TABLE exemplares (
    codigo_exemplar VARCHAR(50) PRIMARY KEY,
    status ENUM('Disponível', 'Emprestado', 'Em Manutenção') NOT NULL,
    fk_livro_isbn VARCHAR(13) NOT NULL
);


CREATE TABLE membros (
    numero_matricula INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(55) NOT NULL,
    endereco VARCHAR(55),
    telefone VARCHAR(20)
);


CREATE TABLE emprestimos (
    id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    data_real_devolucao_real DATE,
    fk_membro_matricula INT NOT NULL,
    fk_exemplar_codigo VARCHAR(50) NOT NULL,
    
    foreign key (fk_membro_matricula) references membros(numero_matricula),
    constraint fk_membro_matricula
    foreign key (id_autor) references tbl_autor(id_autor)
);

-- segundo jeito de fazer


CREATE DATABASE db_saber_e_cia_b;

USE db_saber_e_cia_b;

CREATE TABLE tbl_livro(
    isbn VARCHAR(30) PRIMARY KEY,
    titulo_livro VARCHAR(200) NOT NULL,
    ano_publicacao YEAR NOT NULL,
    editora VARCHAR(200) NOT NULL
);

INSERT INTO tbl_livro(isbn, titulo_livro, ano_publicacao, editora)
    VALUES ('979-86-7126-061-0', 'Dom Casmurro', 1899, 'Editora Clássica'),
           ('978-85-325-3078-3', 'Harry Potter e a Pedra Filosofal', 1997, 'Rocco');

CREATE TABLE tbl_autor(
    id_autor INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_autor VARCHAR(200) NOT NULL,
    nacionalidade VARCHAR(200) NOT NULL
);

INSERT INTO tbl_autor(nome_autor, nacionalidade)
    VALUES ('Daniel Manoel','Brasileiro');

CREATE TABLE tbl_autor_livro(
    isbn VARCHAR(16) NOT NULL,
    id_autor INTEGER NOT NULL,
   
    CONSTRAINT fk_isbn_tbl_autor_livro
    FOREIGN KEY (isbn)
    REFERENCES tbl_livro(isbn),
   
    CONSTRAINT fk_id_autor_tbl_autor_livro FOREIGN KEY (id_autor)
        REFERENCES tbl_autor(id_autor)
);

INSERT INTO tbl_autor_livro(isbn, id_autor)
    VALUES ('18W2T9B372','1829372');
            

CREATE TABLE tbl_exemplar(
    id_exemplar INTEGER PRIMARY KEY,
    status_exemplar VARCHAR(16) NOT NULL,
    isbn VARCHAR(16) NOT NULL,
   
    CONSTRAINT fk_isbn_tbl_exemplar FOREIGN KEY (isbn)
        REFERENCES tbl_livro(isbn)
   
);


CREATE TABLE tbl_emprestimo(
    id_emprestimo INTEGER PRIMARY KEY,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    data_devolucao_efetiva DATE,
    id_exemplar INTEGER NOT NULL,
    id_membro INTEGER NOT NULL,
   
    CONSTRAINT fk_id_exemplar_tbl_emprestimo FOREIGN KEY (id_exemplar)
        REFERENCES tbl_exemplar(id_exemplar),
       
    CONSTRAINT fk_id_membro_tbl_emprestimo FOREIGN KEY (id_membro)
        REFERENCES tbl_membro(id_membro)
);

INSERT INTO tbl_emprestimo(id_emprestimo, data_emprestimo, data_devolucao, data_devolucao_efetiva, id_exemplar, id_membro)
    VALUES ('00000001','18/03/2020', '30/03/2020', '28/03/2020', '1982038', '101');



CREATE TABLE tbl_membro(
    id_membro INTEGER PRIMARY KEY,
    nome_membro VARCHAR(200) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    telefone VARCHAR(16) NOT NULL
);

insert into tbl_membro(id_membro, nome_membro, endereco, telefone)
    VALUES ('101', 'Ana Silva', 'Rua A, 123', '11-98765-4321'),
            ('102', 'Bruno Costa', 'Av. B, 456', '11-91234-5678'),
            ('103', 'Carla Dias', 'Praça C, 789', '11-95555-4444');
            

CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'Mudar123';

GRANT ALTER ON db_saber_e_cia_b.tbl_livro TO 'estagiario'@'localhost';

ALTER TABLE tbl_livro ADD COLUMN genero VARCHAR(50);


UPDATE tbl_autor
SET nome_autor = 'J.K Rowling (Joanne Rowling)',
nacionalidade = 'Britânica (Reino Unido)'
WHERE  id_autor = 2;

DELETE FROM tbl_autor
WHERE id_autor = 2;

SELECT * FROM tbl_livro;

SELECT * FROM tbl_membro;

DELETE FROM tbl_livro 
WHERE isbn = '1236865789';

UPDATE tbl_livro 
SET isbn = '82938392'
WHERE isbn = '978-85-7126-061-';

SELECT * FROM tbl_livro 
WHERE isbn = '82938392';

SELECT * FROM tbl_autor 
WHERE id_autor = '1';


SELECT * FROM tbl_autor
WHERE id_autor = '1'
AND nome_autor = 'Daniel Manoel';

SELECT * FROM tbl_autor 
WHERE nacionalidade = 'Brasileiro'
OR nome_autor = 'Daniel Manoel';

SELECT * FROM tbl_autor 
WHERE NOT nacionalidade = 'Brasileiro'
OR NOT nome_autor = 'Marlon'
AND NOT id_autor = '1';

SELECT * FROM tbl_livro 
WHERE ano_publicacao BETWEEN 1990 AND 2000;

SELECT * FROM tbl_livro 
WHERE editora IN ('SENAI', 'Rocco');

SELECT * FROM tbl_membro 
WHERE nome_membro LIKE 'Ana%';

SELECT * FROM tbl_livro 
WHERE titulo_livro LIKE '%Potter%';


SELECT * FROM tbl_emprestimo 
WHERE data_devolucao_efetiva IS NULL;

SELECT * FROM tbl_livro;

INSERT INTO tbl_exemplar VALUES ('1', 'pronto','978-85-325-3078-');

INSERT INTO tbl_emprestimo VALUES ('1', '2025-10-20', '1', '102');

SELECT * FROM tbl_emprestimo ;
SELECT * FROM tbl_membro;
SELECT * FROM tbl_exemplar ;
SELECT * FROM tbl_autor;

INSERT INTO tbl_emprestimo (id_emprestimo, data_emprestimo, data_devolucao, id_exemplar, id_membro)
VALUES (3,CURDATE(), CURDATE() + INTERVAL 7 DAY, 1 , 101);

SELECT CONCAT (UPPER(nome_autor), '(', nacionalidade, ')')
AS etiqueta
FROM tbl_autor;

SELECT ROUND (19.99*1.05,2);

SELECT FLOOR(19.99*1.05);

SELECT CEIL(19.99*1.05);

SELECT COUNT(*) AS total_membros
FROM tbl_membro;

SELECT COUNT(data_devolucao_efetiva) AS total_devolvido
FROM tbl_emprestimo;

SELECT MIN(ano_publicacao) AS livro_mais_antigo FROM tbl_livro;

SELECT MAX(ano_publicacao) FROM tbl_livro;

INSERT INTO tbl_autor (nome_autor, nacionalidade)
VALUES ('Clarice Lispector', 'Brasileira'),
        ('George Orwell', 'Britânico'),
        ('Isaac Asimov', 'Russo-Americano');
        
INSERT INTO tbl_livro (isbn, titulo_livro, ano_publicacao, editora)
VALUES ('978-85-325-2306', 'A Revolução dos Bichos', 1945, 'Companhia das Letras'),
('978-0-00-711711', '1984', 1949, 'Penguin Books'),
('978-85-325-1997', 'Eu, Robô', 1950, 'Aleph');
        
SELECT * FROM tbl_membro
WHERE nome_membro LIKE '%Silva';

SELECT * FROM tbl_livro
WHERE ano_publicacao BETWEEN 1930 AND 1945;

SELECT * FROM tbl_livro 
WHERE editora IN ('Rocco');

SELECT * FROM tbl_livro 
WHERE editora NOT IN ('Rocco');

SELECT CONCAT(UPPER(nome_membro), '(', telefone, ')')
AS CONTATO
FROM tbl_membro;

SELECT COUNT(*) AS autores_brasileiros
FROM tbl_autor WHERE nacionalidade LIKE'brasileiro';

SELECT MIN(ano_publicacao) AS livro_mais_antigo
FROM tbl_livro WHERE ano_publicacao;

INSERT INTO tbl_emprestimo(id_emprestimo, data_emprestimo, data_devolucao, data_devolucao_efetiva, id_exemplar, id_membro)
    VALUES ('501',CURDATE(), CURDATE() + INTERVAL 14 DAY, NULL, '1', '101');
    
SELECT editora, COUNT(isbn) AS qntdade_livros
FROM tbl_livro GROUP BY editora;

INSERT INTO tbl_livro (isbn, titulo_livro, ano_publicacao, editora)
VALUES ('999-987654-987', 'Esse é o meu livro', 2020, 'Rocco'),
('999-987654-988', 'Esse é o meu livro 2', 2022, 'Rocco'),
('999-987654-989', 'Esse é o meu livro 3', 2024, 'Rocco');

SELECT titulo_livro,
        MAX(ano_publicacao) AS ano_publicacao,
        editora
FROM tbl_livro
GROUP BY editora;

SELECT editora, COUNT(isbn) AS qntdade_livros FROM tbl_livro
GROUP BY editora HAVING COUNT(isbn) >=2;

SELECT nome_autor AS nome, 'Autor' AS tipo FROM tbl_autor
UNION
SELECT nome_membro AS nome, 'Membro' AS tipo FROM tbl_membro;

SELECT L.titulo_livro, A.nome_autor
FROM tbl_livro L 
CROSS JOIN tbl_autor A;

SELECT L.titulo_livro, AL.id_autor
FROM tbl_livro L 
INNER JOIN tbl_autor_livro AL
    ON L.isbn = AL.isbn;



INSERT INTO tbl_autor_livro(isbn, id_autor)
VALUES ('123456789', 1),
        ('82938392', 2),
        ('95687654321', 3),
        ('978-0-00-711711',4),
        ('978-0-00-711711-', 1),
        ('978-85-325-1997', 2),
        ('978-85-325-2306', 3),
        ('978-85-325-3078-', 4),
        ('999-987654-987', 1),
        ('999-987654-988', 2),
        ('999-987654-989', 3);
        

SELECT titulo_livro
FROM tbl_livro
WHERE isbn IN (
    SELECT isbn FROM tbl_autor_livro WHERE id_autor IN (
    SELECT id_autor FROM tbl_autor
    WHERE nacionalidade = 'Brasileira'
    )
);


SELECT nome_autor
FROM tbl_autor A
WHERE EXISTS (
    SELECT 1 FROM tbl_autor_livro AL
    WHERE AL.id_autor = A.id_autor
);
    
SELECT titulo_livro, ano_publcacao
FROM tbl_livro
WHERE ano_publicacao < ANY (
    SELECT ano_publicacao FROM tbl_livro
    WHERE editora = 'Aleph'
);




INSERT INTO tbl_autor(nome_autor, nacionalidade)
    VALUES('Frank Hebert', 'Americano');


INSERT INTO tbl_exemplar(id_exemplar, status_exemplar, isbn)
VALUES('101', 'Disponível', '978-85-325-1997'),
        ('102', 'Emprestado', '978-85-325-2306-'),
        ('103', 'Disponível', '978-85-325-3078-');
        
        
INSERT INTO tbl_emprestimo(id_emprestimo, data_emprestimo, data_devolucao, data_devolucao_efetiva, id_exemplar, id_membro)
    VALUES ('502','2024-10-01', '2024-10-15', NULL, '102', '101');
    
SELECT isbn, COUNT(*) AS numero_de_cópias FROM tbl_exemplar GROUP BY isbn;

SELECT M.nome_membro, L.titulo_livro, E.data_devolucao
FROM tbl_membro M
INNER JOIN tbl_emprestimo E ON
    M.id_membro = E.id_membro
    
INNER JOIN tbl_exemplar EX ON
    E.id_exemplar = EX.id_exemplar
    
INNER JOIN tbl_livro L ON
     EX.isbn = L.isbn;
     
     SELECT A.nome_autor, COUNT(AL.isbn) AS quantidade
     FROM tbl_autor A
     LEFT JOIN tbl_autor_livro AL ON
        A.id_autor = AL.id_autor
        GROUP BY A.nome_autor;
        
SELECT nome_membro FROM tbl_membro
WHERE id_membro IN (
    SELECT id_membro FROM tbl_emprestimo
    WHERE data_devolucao_efetiva IS NULL
    );

START TRANSACTION;
UPDATE tbl_membro SET telefone = '11-99999-0000' WHERE id_membro = 101;
COMMIT;

START TRANSACTION;

INSERT INTO tbl_membro(id_membro, nome_membro, endereco, telefone)
VALUES (999, 'Membri Teste','Rua C, 122', '11-98788-4321');

ROLLBACK;

START TRANSACTION;
INSERT tbl_membro(id_membro, nome_membro, endereco, telefone)
VALUES (900, 'Membri Teste2','Rua D, 222', '11-98788-4333');

SAVEPOINT ponto_A;

INSERT tbl_membro(id_membro, nome_membro, endereco, telefone)
VALUES (901, 'Membro Teste3','Rua E, 212', '11-91188-4333');

ROLLBACK TO SAVEPOINT ponto_A;

SELECT * FROM tbl_membro

COMMIT;

CREATE VIEW V_Relatorio_Emprestimos AS 
SELECT 
    M.nome_membro,
    L.titulo_livro,
    E.data_emprestimo,
    E.data_devolucao
FROM tbl_membro M
JOIN tbl_emprestimo E ON M.id_membro = E.id_membro
JOIN tbl_exemplar EX ON E.id_exemplar = EX.id_exemplar
JOIN tbl_livro L ON EX.isbn = L.isbn;

SELECT * FROM V_Relatorio_emprestimos
WHERE nome_membro = 'Ana Silva'

DELIMITER $$

CREATE PROCEDURE sp_novo_emprestimo (
    IN p_id_exemplar INT,
    IN p_id_membro INT 
)

BEGIN 
    INSERT INTO tbl_emprestimo (
    data_emprestimo,
    data_devolucao,
    data_devolucao_efetiva,
    id_exemplar,
    id_membro
)

VALUES (
    CURDATE(),
    CURDATE() + INTERVAL 14 DAY,
    NULL,
    p_id_exemplar,
    p_id_membro
);

END$$

DELIMITER ;

CALL sp_novo_emprestimo(101, 101);

DELIMITER $$

CREATE FUNCTION fn_status_membro (p_id_membro INT)
RETURNS VARCHAR(20)
DETERMINISTIC 
BEGIN
    DECLARE v_atrasos INT;
    
    SELECT COUNT(*) INTO v_atrasos
    FROM tbl_emprestimo 
    WHERE id_membro = p_id_membro
        AND data_devolucao < CURDATE()
        AND data_devolucao_efetiva IS NULL;
        
    IF V_atrasos > 0 THEN 
    RETURN 'Com atraso';
    ELSE 
    RETURN 'Regular';
    END IF;
END$$

DELIMITER ;

SELECT nome_membro, fn_status_membro(id_membro) FROM tbl_membro;
