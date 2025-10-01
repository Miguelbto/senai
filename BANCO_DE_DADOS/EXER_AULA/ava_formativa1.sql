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
