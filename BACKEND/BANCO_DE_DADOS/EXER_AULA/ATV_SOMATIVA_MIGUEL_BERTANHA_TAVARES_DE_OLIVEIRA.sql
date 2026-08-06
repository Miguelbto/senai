
CREATE DATABASE db_academico;
USE db_academico;

-- Tabela 1: Cursos (o que é oferecido)
CREATE TABLE tbl_cursos (
    id_curso INT PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL,
    carga_horaria INT,
    valor DECIMAL(10, 2)
);

-- Tabela 2: Instrutores (Quem ministra o curso)
CREATE TABLE tbl_instrutores (
    id_instrutor INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50),
    data_admissao DATE
);

-- Tabela 3: Turmas (Instâncias de um curso)
CREATE TABLE tbl_turmas (
    id_turma INT PRIMARY KEY,
    id_curso INT,
    id_instrutor INT,
    data_inicio DATE,
    situacao VARCHAR(20) DEFAULT 'ABERTA',
    vagas_maximas INT,
    FOREIGN KEY (id_curso) REFERENCES tbl_cursos(id_curso),
    FOREIGN KEY (id_instrutor) REFERENCES tbl_instrutores(id_instrutor)
);

-- Tabela 4: Alunos (Quem estuda)
CREATE TABLE tbl_alunos (
    id_aluno INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cidade VARCHAR(50),
    data_nascimento DATE
);

-- Tabela 5: Matriculas (Associação Aluno-Turma)
CREATE TABLE tbl_matriculas (
    id_matricula INT PRIMARY KEY,
    id_turma INT,
    id_aluno INT,
    data_matricula DATE,
    nota_final DECIMAL(4, 2), -- 0 a 10
    FOREIGN KEY (id_turma) REFERENCES tbl_turmas(id_turma),
    FOREIGN KEY (id_aluno) REFERENCES tbl_alunos(id_aluno)
);

-- Tabela de Auditoria
CREATE TABLE tbl_log_matriculas (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    id_matricula_afetada INT,
    acao VARCHAR(50),
    data_hora DATETIME
);

-- DML: Inserção de Dados
INSERT INTO tbl_cursos (id_curso, nome_curso, carga_horaria, valor) VALUES
(10, 'Programacao Back-End', 225, 1800.00),
(11, 'Banco de Dados SQL', 75, 900.00),
(12, 'Desenvolvimento Front-End', 150, 1500.00),
(13, 'Redes e IoT', 75, 750.00),
(14, 'Lógica de Programacao', 75, 600.00);

INSERT INTO tbl_instrutores (id_instrutor, nome, especialidade, data_admissao) VALUES
(1, 'Prof. Ana Silva', 'SQL/Procedures', '2020-05-10'),
(2, 'Prof. João Costa', 'Front-End', '2022-01-15'),
(3, 'Prof. Carlos Santos', 'Back-End', '2023-08-20'),
(4, 'Prof. Erika Torres', 'Redes', '2024-03-01'),
(5, 'Prof. Lucas Mendes', 'Lógica', '2021-11-25');

INSERT INTO tbl_turmas (id_turma, id_curso, id_instrutor, data_inicio, situacao, vagas_maximas) VALUES
(100, 11, 1, '2024-07-01', 'ATIVA', 20),
(101, 12, 2, '2024-08-15', 'ATIVA', 10),
(102, 10, 3, '2024-09-01', 'PLANEJADA', 30),
(103, 11, 1, '2024-07-01', 'ATIVA', 2),
(104, 13, 4, '2024-07-15', 'ATIVA', 15);

INSERT INTO tbl_alunos (id_aluno, nome, cidade, data_nascimento) VALUES
(201, 'Maria Oliveira', 'Sao Paulo', '2000-01-20'),
(202, 'Pedro Rocha', 'Rio de Janeiro', '1995-11-05'),
(203, 'Sofia Alves', 'Sao Paulo', '2003-04-18'),
(204, 'Thiago Gomes', 'Belo Horizonte', '1998-09-30'),
(205, 'Vitor Hugo', 'Sao Paulo', '2001-07-12'),
(206, 'Helena Dias', 'Curitiba', '2004-12-01'),
(207, 'Fernando Pires', 'Rio de Janeiro', '1999-02-28');

INSERT INTO tbl_matriculas (id_matricula, id_turma, id_aluno, data_matricula, nota_final) VALUES
(5001, 100, 201, '2024-06-25', 8.5),
(5002, 100, 202, '2024-06-26', 6.0),
(5003, 101, 203, '2024-07-01', 9.2),
(5004, 101, 204, '2024-07-01', 7.5),
(5005, 104, 201, '2024-07-02', 8.0),
(5006, 103, 205, '2024-07-05', 9.0),
(5007, 103, 206, '2024-07-05', 6.8),
(5008, 104, 203, '2024-07-03', 7.0);


UPDATE tbl_cursos
SET valor = 1050.00
WHERE id_curso = 11;

DELETE FROM tbl_turmas 
WHERE id_curso = 10;

DELETE FROM tbl_cursos
WHERE id_curso = 10;

SELECT * FROM tbl_cursos;

SELECT A.nome, C.nome_curso, I.nome
FROM tbl_alunos A  
INNER JOIN tbl_matriculas M ON A.id_aluno  = M.id_aluno
INNER JOIN tbl_turmas T ON M.id_turma =T.id_turma
INNER JOIN tbl_cursos C ON T.id_curso = C.id_curso
INNER JOIN tbl_instrutores I ON T.id_instrutor = I.id_instrutor;

SELECT AVG(nota_final) AS media_nota_final FROM tbl_matriculas;

SELECT MAX(nota_final) AS nota_mais_alta FROM tbl_matriculas;

SELECT CONCAT(UPPER(nome), ' (', DATE(data_admissao), ')') AS DADOS_ADMISSIONAIS
FROM tbl_instrutores;

SELECT id_turma, COUNT(id_aluno) AS total_alunos FROM tbl_matriculas
GROUP BY id_turma;

SELECT id_turma, COUNT(id_aluno) AS total_alunos FROM tbl_matriculas
GROUP BY id_turma HAVING COUNT(id_aluno) > 2;

START TRANSACTION ;
INSERT INTO tbl_alunos (id_aluno, nome, cidade, data_nascimento) VALUES
	(999, 'Maria', 'Sao Paulo', '2000-01-25');
ROLLBACK;

SELECT * FROM tbl_alunos;


DELIMITER $$ 
CREATE PROCEDURE sp_buscar_cursos_por_ch (IN p_carga_horaria INT)
	BEGIN 
		SELECT * FROM tbl_cursos
        WHERE carga_horaria >= p_carga_horaria;
	END$$
DELIMITER ;

CALL sp_buscar_cursos_por_ch(150);

CREATE VIEW V_Turmas_Aprovadas AS 
SELECT A.nome, C.nome_curso, M.nota_final
FROM tbl_alunos A 
INNER JOIN  tbl_matriculas M ON A.id_aluno = M.id_aluno
INNER JOIN tbl_turmas T ON M.id_turma =T.id_turma
INNER JOIN tbl_cursos C ON T.id_curso = C.id_curso
WHERE nota_final = 7.0;

SELECT * FROM V_Turmas_Aprovadas;
