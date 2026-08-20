const db = require('../../shared/database/tenant-db');

/**
 * Serviço responsável por controlar assinaturas (billing) dos Tenants.
 * Integração conceitual com Stripe ou outro gateway de pagamento.
 */
class BillingService {

    /**
     * Verifica se o restaurante possui uma assinatura ativa e válida.
     * Pode ser usado antes de processar pedidos ou cadastrar produtos.
     */
    async validarAssinaturaAtiva(tenantId) {
        // 1. Busca os detalhes da assinatura do restaurante no banco local
        const query = `
            SELECT t.status, s.plano, s.expira_em, s.stripe_subscription_id 
            FROM tenants t
            LEFT JOIN assinaturas s ON t.id = s.tenant_id
            WHERE t.id = ?
        `;
        
        const [rows] = await db.query(query, [tenantId]);
        
        if (rows.length === 0) {
            throw new Error("Tenant não cadastrado.");
        }

        const info = rows[0];

        // Se o tenant estiver inativo ou suspenso manualmente
        if (info.status !== 'ativo') {
            return {
                ativo: false,
                motivo: "Status da conta: " + info.status,
                mensagem: "Esta conta está suspensa. Por favor, regularize suas pendências financeiras."
            };
        }

        // Se a assinatura expirou
        if (info.expira_em && new Date(info.expira_em) < new Date()) {
            // Em um fluxo real SaaS, aqui você faria uma chamada para a API do Stripe para ver
            // se o pagamento foi atrasado ou está em período de graça antes de suspender.
            
            // Atualiza o status do tenant para suspenso no banco local
            await db.query('UPDATE tenants SET status = "suspenso" WHERE id = ?', [tenantId]);

            return {
                ativo: false,
                motivo: "assinatura_expirada",
                mensagem: "Sua assinatura expirou em " + new Date(info.expira_em).toLocaleDateString('pt-BR') + ". Regularize seu pagamento para continuar."
            };
        }

        return {
            ativo: true,
            plano: info.plano || 'gratuito',
            expiraEm: info.expira_em
        };
    }

    /**
     * Webhook do Stripe (Conceitual)
     * Método que seria chamado quando o Stripe enviar notificações de pagamentos aprovados ou falhas.
     */
    async processarWebhookStripe(eventoStripe) {
        const { type, data } = eventoStripe;

        // Identifica o ID da assinatura do Stripe
        const subscriptionId = data.object.id;

        if (type === 'invoice.payment_succeeded') {
            // Pagamento mensal aprovado: estende a expiração do tenant por mais 30 dias
            const novaDataExpira = new Date();
            novaDataExpira.setDate(novaDataExpira.getDate() + 30);

            await db.query(`
                UPDATE assinaturas 
                SET expira_em = ? 
                WHERE stripe_subscription_id = ?
            `, [novaDataExpira, subscriptionId]);

            // Garante que o status do tenant volte a ser 'ativo'
            await db.query(`
                UPDATE tenants t
                INNER JOIN assinaturas s ON t.id = s.tenant_id
                SET t.status = 'ativo'
                WHERE s.stripe_subscription_id = ?
            `, [subscriptionId]);

            console.log(`✅ Assinatura ${subscriptionId} renovada com sucesso via Webhook.`);
        } 
        
        else if (type === 'invoice.payment_failed') {
            // Falha no pagamento: Altera o status para suspenso
            await db.query(`
                UPDATE tenants t
                INNER JOIN assinaturas s ON t.id = s.tenant_id
                SET t.status = 'suspenso'
                WHERE s.stripe_subscription_id = ?
            `, [subscriptionId]);

            console.log(`❌ Falha no pagamento da assinatura ${subscriptionId}. Tenant suspenso.`);
        }
    }
}

module.exports = new BillingService();
