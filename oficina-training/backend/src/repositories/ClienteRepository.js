// -- CREATE (Inserir)
// INSERT INTO cliente (nome_cliente, cpf_cliente, telefone, email) 
// VALUES ('Ana Maria Sousa', '12345678901', '11999998888', 'ana.sousa@email.com');

// -- READ (Consultar todos os clientes)
// SELECT id_cliente, nome_cliente, cpf_cliente, telefone, email 
// FROM cliente;

// -- READ (Consultar cliente por ID)
// SELECT id_cliente, nome_cliente, cpf_cliente, telefone, email 
// FROM cliente 
// WHERE id_cliente = 1;

// -- UPDATE (Atualizar dados do cliente)
// UPDATE cliente 
// SET telefone = '11988887777', email = 'ana.novoemail@email.com' 
// WHERE id_cliente = 1;

// -- DELETE (Eliminar cliente)
// DELETE FROM cliente 
// WHERE id_cliente = 1;

const pool = require('../config/database')

class ClienteRepository {

}