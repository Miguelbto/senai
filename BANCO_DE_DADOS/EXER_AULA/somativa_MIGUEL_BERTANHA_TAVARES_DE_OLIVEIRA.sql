/*
CREATE DATABASE db_biblioteca_comunitaria_b;

USE db_biblioteca_comunitaria_b;


CREATE TABLE autores (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(55) NOT NULL,
    nacionalidade VARCHAR(100)
);

insert into tbl_autor(nome, nacionalidade


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
*/

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
   
    CONSTRAINT fk_isbn_tbl_autor_livro FOREIGN KEY (isbn)
        REFERENCES tbl_livro(isbn),
   
    CONSTRAINT fk_id_autor_tbl_autor_livro FOREIGN KEY (id_autor)
        REFERENCES tbl_autor(id_autor)
);

INSERT INTO tbl_autor_livro(isbn, id_autor)
    VALUES ('18W2T9B372','1829372')
			

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
    VALUES ('00000001','18/03/2020', '30/03/2020', '28/03/2020', '1982038', '82927237' );



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
WHERE isbn = '987654321';



