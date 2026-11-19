-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS tatoo_db
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE tatoo_db;

-- -----------------------------------------------------
-- 1. Tabela: usuario
-- -----------------------------------------------------
CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 2. Tabela: cliente
-- Nota: cpf definido como VARCHAR(255) para comportar o valor criptografado (LGPD)
-- -----------------------------------------------------
CREATE TABLE cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 3. Tabela: projeto_tatuagem
-- -----------------------------------------------------
CREATE TABLE projeto_tatuagem (
    projeto_tatuagem_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT NOT NULL,
    fk_cliente_id INT NOT NULL,
    CONSTRAINT fk_projeto_cliente
        FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente (cliente_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- 4. Tabela: agendamento
-- -----------------------------------------------------
CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    data_agendamento DATETIME NOT NULL,
    fk_cliente_id INT NOT NULL,
    fk_projeto_tatuagem_id INT NOT NULL,
    CONSTRAINT fk_agendamento_cliente
        FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente (cliente_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_agendamento_projeto
        FOREIGN KEY (fk_projeto_tatuagem_id)
        REFERENCES projeto_tatuagem (projeto_tatuagem_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- POPULAÇÃO INICIAL (Mínimo de 3 registros por tabela)
-- =====================================================

-- Registros em usuario (senhas simulando hash bcrypt)
INSERT INTO usuario (nome, email, senha) VALUES
('Miguel', 'adm.tatoo@gmail.com', '$2b$10$3HmfauzpWQsByXtJv2mOG.AsMw9IWAGsu85WqDhg5nz8ivis3tbr');

-- Registros em cliente (CPFs simulando saída criptografada em AES-256 / Base64)
INSERT INTO cliente (cpf, nome, telefone, email) VALUES
('U2FsdGVkX1+9xK8mP2vL1aBcDeFgHiJkLmNoPqRsTuV=', 'Mariana Silva Costa', '(11) 98765-4321', 'mariana.costa@email.com'),
('U2FsdGVkX1+3zW7nQ4rT9xYzAbCdEfGhIjKlMnOpQrS=', 'Bruno Oliveira Santos', '(11) 97654-3210', 'bruno.santos@email.com'),
('U2FsdGVkX1+6pL2vM8kJ5wXyZaBcDeFgHiJkLmNoPqR=', 'Fernanda Almeida Lima', '(11) 96543-2109', 'fernanda.lima@email.com');

-- Registros em projeto_tatuagem
INSERT INTO projeto_tatuagem (nome, descricao, fk_cliente_id) VALUES
('Dragão Oriental Fechamento', 'Tatuagem estilo oriental preto e cinza cobrindo o antebraço direito (25cm).', 1),
('Rosa Realista Fine Line', 'Rosa sombreada com traços finos na região da escápula esquerda (12cm).', 2),
('Bússola Geométrica', 'Arte geométrica com pontilhismo na panturrilha direita (18cm).', 3);

-- Registros em agendamento
INSERT INTO agendamento (data_agendamento, fk_cliente_id, fk_projeto_tatuagem_id) VALUES
('2026-11-25 14:00:00', 1, 1),
('2026-11-26 10:30:00', 2, 2),
('2026-11-28 16:00:00', 3, 3);

SELECT * FROM cliente;


USE tatoo_db;
-- Substitua os números abaixo pelos cliente_id reais exibidos no SELECT
UPDATE cliente SET cpf = 'b9332f3140efaf757e4d684975ef3365' WHERE cliente_id = 1;
UPDATE cliente SET cpf = 'be4f639df4cd927594a5e3084b540dc1' WHERE cliente_id = 2;
UPDATE cliente SET cpf = '65eea67226931d6bc95e431330183923' WHERE cliente_id = 3;