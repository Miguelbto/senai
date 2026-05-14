const PedidoRepository = require('../repositories/PedidoRepository.js')

class PedidoService {

    async listarPedidos () {
        // Correção: Adicionado os parênteses () para executar a função
        const pedidos = await PedidoRepository.listarPedidos()

        return {
            sucesso: true,
            dados: pedidos,
            total: pedidos.length
        }
    }

    async buscarPedidoPorId (id) {
        
        if(!id || isNaN(id)){
            throw {status: 400, mensagem: 'ID inválido'}
        }

        const pedido = await PedidoRepository.buscarPedidoPorId(id)

        if(!pedido){
            throw {status: 404, mensagem: 'Pedido não encontrado'}
        }

        return {
            sucesso: true,
            dados: pedido
        }
    }

    async cadastrarPedido (dados) {
        // Adaptado para campos comuns de um Pedido
        const { cliente_id, descricao, valor_total, status } = dados

        if (!cliente_id || valor_total === undefined){
            throw {
                status: 400,
                mensagem: "ID do cliente e valor total devem ser preenchidos"
            }
        }

        if (typeof valor_total !== "number" || valor_total <= 0){
            throw {
                status: 400,
                mensagem: "Valor total deve ser um número positivo"
            }
        }

        const novoPedido = {
            cliente_id,
            descricao: descricao ? descricao.trim() : null,
            valor_total,
            status: status || 'Pendente'
        }

        const resultado = await PedidoRepository.cadastrarPedido(novoPedido)

        return {
            sucesso: true,
            mensagem: "Pedido cadastrado com sucesso", 
            resultado
        }
    }

    async atualizarPedido (id, dados){
        if (!id || isNaN(id)){
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const pedidoExistente = await PedidoRepository.buscarPedidoPorId(id)

        if (!pedidoExistente){
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        const pedidoAtualizado = { }

        const { cliente_id, valor_total, descricao, status } = dados

        if (cliente_id !== undefined) pedidoAtualizado.cliente_id = cliente_id
        if (descricao !== undefined) pedidoAtualizado.descricao = descricao.trim()
        
        if (valor_total !== undefined){
            // Correção: a lógica "|| preco" do original foi arrumada aqui
            if(typeof valor_total !== "number" || valor_total <= 0 ){
                throw {
                    status: 400,
                    mensagem: "Valor total deve ser um número positivo",
                }
            }
            pedidoAtualizado.valor_total = valor_total
        }

        if (status !== undefined) pedidoAtualizado.status = status

        if (Object.keys(pedidoAtualizado).length === 0 ){
            throw {
                status: 400,
                mensagem: "Nenhum dado válido enviado para atualização"
            }
        }
        
        await PedidoRepository.atualizarPedido(id, pedidoAtualizado)
        return {
            sucesso: true,
            mensagem: "Pedido atualizado"
        }
    }

    async deletarPedido (id) {

        if (!id || isNaN(id)){
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const pedidoExistente = await PedidoRepository.buscarPedidoPorId(id)

        if (!pedidoExistente){
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        await PedidoRepository.deletarPedido(id)
        return {
            status: 200,
            mensagem: "Pedido apagado"
        }
    }

}

module.exports = new PedidoService()