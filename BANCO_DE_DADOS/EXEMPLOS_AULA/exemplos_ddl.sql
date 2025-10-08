/*
# meu comentário 
-- meu outro comentário
*/
create database db_biblioteca_turmaB; #criando meu database

drop database db_biblioteca_turmab; #excluindo o database

USE db_biblioteca_turmab;

create table tbl_livros (
id_livros int,
titulo varchar(100),
autor varchar(100), #Quantidade que pode ser inserida
ano_publicacao int, #número inteiro
preco decimal(10,2) #10 algarismos antes da virgula e 2 depois
#sempre o ultimo não deve colocar vírgula, apenas fechar com o parenteses
);


drop table tbl_livros;

create index idx_titulo


# ALTER TABLE serve para alterar a tabela 

# ALTER TABLE NOME_TABELA ADD COLUNM NOME_COLUNA VARCHAR FIRST, o first indica a posição que será inserida 


on tbl_livros (titulo);



create user 'estagiario'@'localhost' identified by 'Escola@Est1';





