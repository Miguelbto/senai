create database educatech;

use educatech;

create table aluno (
email VARCHAR(100) PRIMARY KEY NOT NULL,
cpf VARCHAR(11) NOT NULL,
nome VARCHAR(100) NOT NULL, 
data_nascimento DATE NOT NULL 
);

create table instrutor (
codigo_instrutor INT PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR(100) NOT NULL,
mini_biografia TEXT 
);

create table curso (
codigo_curso VARCHAR(100) PRIMARY KEY NOT NULL,
titulo VARCHAR(100) NOT NULL,
carga_horaria_total INT NOT NULL,
nivel_dificuldade VARCHAR(100) NOT NULL,
instrutor VARCHAR(100)NOT NULL
);

create table aula (
numero_ordem INT PRIMARY KEY,
titulo VARCHAR(100) NOT NULL,
link_video VARCHAR(100),
curso VARCHAR(100) NOT NULL
);

create table matricula (
data_matricula DATE PRIMARY KEY NOT NULL,
status_matricula VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
codigo_curso VARCHAR (100) NOT NULL

);

create user 'secretaria'@'localhost' identified by 'escola@prof';
create user 'professor'@'localhost' identified by 'escola@prof2';
grant select on db_escola.tbl_alunos to 'professor'@'localhost';
alter table tbl_livros modify column titulo varchar(150);
revoke select, update on db_escola.tbl_alunos from 'professor'@'localhost';
revoke all privileges on db_escola.tbl_alunos from 'secretaria'@'localhost';
drop database db_biblioteca_a;














CREATE TABLE AUTORES (
    id_autor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);


CREATE TABLE LIVROS (
    isbn VARCHAR(13) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano_publicacao YEAR,
    editora VARCHAR(150)
);


CREATE TABLE LIVRO_AUTOR (
    fk_livro_isbn VARCHAR(13) NOT NULL,
    fk_autor_id INT NOT NULL,
    PRIMARY KEY (fk_livro_isbn, fk_autor_id),
    FOREIGN KEY (fk_livro_isbn) REFERENCES LIVROS(isbn),
    FOREIGN KEY (fk_autor_id) REFERENCES AUTORES(id_autor)
);


CREATE TABLE EXEMPLARES (
    codigo_patrimonio VARCHAR(50) PRIMARY KEY,
    status ENUM('Disponível', 'Emprestado', 'Em Manutenção') NOT NULL,
    fk_livro_isbn VARCHAR(13) NOT NULL,
    FOREIGN KEY (fk_livro_isbn) REFERENCES LIVROS(isbn)
);


CREATE TABLE MEMBROS (
    matricula INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20)
);


CREATE TABLE EMPRESTIMOS (
    id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao_real DATE,
    fk_membro_matricula INT NOT NULL,
    fk_exemplar_codigo VARCHAR(50) NOT NULL,
    FOREIGN KEY (fk_membro_matricula) REFERENCES MEMBROS(matricula),
    FOREIGN KEY (fk_exemplar_codigo) REFERENCES EXEMPLARES(codigo_patrimonio)
);


CREATE USER 'estagiario'@'localhost' IDENTIFIED BY 'mudar123';


GRANT ALTER ON nome_do_banco.LIVROS TO 'estagiario'@'localhost';
2.	Adicionar a coluna genero na tabela LIVROS:
SQL

ADD COLUMN genero VARCHAR(50);
*/