create database db_escola;

use db_escola;

create table tbl_alunos (
id_aluno int,
nome varchar(100),
data_nascimento date,
media_final decimal(4,2)
);

alter table tbl_alunos
add column email_aluno varchar(150);

drop table tbl_alunos;

drop database db_escola;

create database db_loja_virtual;

use db_loja_virtual;

create table tbl_produtos (
id_produto int,
nome varchar (100),
preco decimal(10,2)
);

alter table tbl_produtos
add column estoque int;

drop table tbl_produtos; 

drop database db_loja_virtual;



