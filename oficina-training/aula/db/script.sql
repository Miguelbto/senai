CREATE DATABASE IF NOT EXISTS oficina;
USE oficina


CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome    VARCHAR(100) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100)
)

CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    placa VARCHAR(10) NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INT,
    FOREIGN KEY (cliente_id) REFERENCES 
)

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    servico VARCHAR(100),
    FOREIGN KEY(veiculo_id) REFERENCES veiculos(id)
)

INSERT INTO usuarios(nome, email, senha) VALUES
('Administrador', 'admin@oficina.com','$2b$10$QwNMkZPowstGqiAQND.vYu8j8ZxqTkYASkvQk9WSJHO3KpYDpbJ5u')


('Carlos Mecanico', 'Carlos@oficina.com', '')

INSERT INTO Clientes (nome,cpf,telefone,email) VALUES

('Joao  da Silva','b9332f3140efaf757e4d684975ef3365', '(11) 90000-1111', 'Joao.silva@gmail.com')
('Maria Souza','be4f639df4cd927594a5e3084b540dc1', '(11) 90001-1111', 'Maria.Souza@gmail.com')
('Pedro oliveira','65eea67226931d6bc95e431330183923', '(11) 90002-1111', 'pedro.oliveira@gmail.com')


INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano)VALUES
(1, 'ABC1D23', 'Toyota', 'Corolla', 2021),
(2, 'XYZ9E87', 'Honda', 'Civic', 2020),
(3, 'KLM4F56', 'Volkswagen', 'Polo', 2022);


INSERT INTO agendamentos (veiculo_id, data_agendamento, servico) VALUES
(1, '2026-11-20 09:00:00', 'Troca de óleo e filtro'),
(2, '2026-11-21 14:30:00', 'Alinhamento e balanceamento'),
(3, '2026-11-22 10:00:00', 'Revisão geral');