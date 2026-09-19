const PedidoService = require('../services/PedidoService');

function normalizeArray(value) {
    if (value === undefined || value === null) return [];
    return Array.isArray(value) ? value : [value];
}

function formatarPedido(p) {
    if (!p) return p;
    return {
        id: p.id,
        cliente: p.cliente || '',
        status: p.status,
        total: Number(p.total),
        criado_em: p.criado_em ? String(p.criado_em) : '',
        itens: {
            item: (p.itens || []).map(i => ({
                id: i.id,
                produto_id: i.produto_id,
                produto_nome: i.produto_nome || '',
                quantidade: i.quantidade,
                preco_unitario: Number(i.preco_unitario)
            }))
        }
    };
}

module.exports = {
    PedidoService: {
        PedidoPort: {

            async CriarPedido(args) {
                const itens = normalizeArray(args.itens && args.itens.item).map(i => ({
                    produtoId: Number(i.produtoId),
                    quantidade: Number(i.quantidade)
                }));

                const pedido = await PedidoService.criarPedido({
                    cliente: args.cliente,
                    itens
                });

                return {
                    sucesso: true,
                    mensagem: 'Pedido criado com sucesso',
                    pedido: formatarPedido(pedido)
                };
            },

            async ListarPedidos() {
                const pedidos = await PedidoService.listarPedidos();
                return {
                    sucesso: true,
                    pedidos: {
                        pedido: pedidos.map(formatarPedido)
                    }
                };
            },

            async ObterPedidoPorId(args) {
                const pedido = await PedidoService.obterPedidoPorId(args.id);
                return {
                    sucesso: true,
                    pedido: formatarPedido(pedido)
                };
            },

            async AtualizarStatusPedido(args) {
                const pedido = await PedidoService.atualizarStatus(args.id, args.status);
                return {
                    sucesso: true,
                    mensagem: 'Status atualizado com sucesso',
                    pedido: formatarPedido(pedido)
                };
            },

            async ExcluirPedido(args) {
                await PedidoService.excluirPedido(args.id);
                return {
                    sucesso: true,
                    mensagem: 'Pedido excluído com sucesso'
                };
            }
        }
    }
};
