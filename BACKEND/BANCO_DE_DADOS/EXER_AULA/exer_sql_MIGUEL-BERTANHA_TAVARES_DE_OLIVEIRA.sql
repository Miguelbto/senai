create database db_escola;

use db_escola;

create table tbl_alunos (
id_aluno int primary key,
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
id_produto int primary key,
nome varchar (100),
preco decimal(10,2)
);

alter table tbl_produtos
add column estoque int;

drop table tbl_produtos; 

drop database db_loja_virtual;

create database db_rh_empresa;

use db_rh_empresa;

create table tbl_funcionario (
id_funcionario int primary key,
nome_completo varchar (150),
data_admissao decimal (10,2)
);


alter table tbl_funcionario 
add column salario decimal (10,2);

drop table tbl_funcionario;

drop database db_rh_empresa;

create database db_academia;

use db_academia;

create table tbl_membros (
id_membro int primary key,
nome varchar(100),
tipo_plano varchar (50)
);

alter table tbl_membros
add column data_inscricao date;

drop table tbl_membros;

drop database db_academia



