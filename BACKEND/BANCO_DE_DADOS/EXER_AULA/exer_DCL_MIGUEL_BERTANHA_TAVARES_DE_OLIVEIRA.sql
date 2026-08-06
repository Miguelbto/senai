

CREATE USER 'secretaria'@'localhost' IDENTIFIED BY 'Escola@Sec1';

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