
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
    PRIMARY KEY (fk_livro_isbn, fk_autor_id)
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
    fk_exemplar_codigo VARCHAR(50) NOT NULL
);


CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'mudar123';


GRANT ALTER ON nome_do_banco.livros TO 'estagiario'@'localhost';

alter table livros ADD COLUMN genero VARCHAR(50);
