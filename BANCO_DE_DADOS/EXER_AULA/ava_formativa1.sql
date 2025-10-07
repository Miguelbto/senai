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


/*
-- CREATE USER 'secretaria'@'localhost' IDENTIFIED BY 'Escola@Sec1';

CREATE USER 'professor'@'localhost' IDENTIFIED BY 'Escola@Prof2'; 

GRANT ALL PRIVILEGES db_escola.tbl_alunos to 'analista'@'localhost';

GRANT SELECT db_escola.tbl_alunos to 'professor'@'localhost';

REVOKE SELECT ON db_escola.tbl_alunos FROM 'professor'@'localhost';

GRANT UPDATE db_escola.tbl_aluno TO 'professor'@'localhost';

REVOKE ALL PRIVILEGES db_escola.tbl_aluno FROM 'secretaria'@'localhost';


use db_biblioteca_turmab;



INSERT INTO tbl_livros (id_livros, titulo, autor, ano_publicacao, preco)
VALUES
(1, 'Dom Casmurro', 'Machado de Assis', 1899, 39.90),
(2, 'O Alquimista', 'Paulo Coelho', 1988, 29.50),
(3, 'A Hora da Estrela', 'Clarice Lispector', 1977, 34.00);

drop table tbl_livros;

select * from tbl_livros;
*/