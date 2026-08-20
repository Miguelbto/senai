const pool = require('../shared/database/tenant-db');

/**
 * Middleware para identificar e validar o Tenant (restaurante) na requisição.
 * Ele anexa o `tenantId` e as configurações do tenant ao objeto `req`.
 */
async function identificarTenant(req, res, next) {
    // 1. Tenta extrair o tenant por header ou subdomínio
    // Exemplo de header: X-Tenant-ID: 12
    // Exemplo de subdomínio: bellavita.sabordigital.com -> 'bellavita'
    let tenantId = req.headers['x-tenant-id'];
    const host = req.headers.host || '';
    
    // Se não veio no Header, vamos tentar descobrir pelo subdomínio (útil em SaaS real)
    if (!tenantId && host.includes('.')) {
        const partesHost = host.split('.');
        if (partesHost.length > 2) {
            const slug = partesHost[0]; // 'bellavita'
            
            try {
                // Busca o ID do tenant no banco usando o slug do subdomínio
                const [rows] = await pool.query(
                    'SELECT id, status FROM tenants WHERE slug = ?', 
                    [slug]
                );
                
                if (rows.length > 0) {
                    tenantId = rows[0].id;
                    req.tenantStatus = rows[0].status;
                }
            } catch (err) {
                return res.status(500).json({ 
                    sucesso: false, 
                    mensagem: "Erro ao resolver subdomínio do inquilino (Tenant)." 
                });
            }
        }
    }

    // Se nenhum Tenant foi identificado
    if (!tenantId) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Tenant não identificado. Envie o cabeçalho 'X-Tenant-ID' ou use um subdomínio válido."
        });
    }

    // Convertemos para número
    req.tenantId = Number(tenantId);

    // 2. Validação de status (se já temos o status do passo anterior ou se precisamos buscar pelo ID)
    try {
        if (!req.tenantStatus) {
            const [rows] = await pool.query(
                'SELECT status FROM tenants WHERE id = ?', 
                [req.tenantId]
            );

            if (rows.length === 0) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Restaurante (Tenant) não cadastrado no sistema."
                });
            }

            req.tenantStatus = rows[0].status;
        }

        // Se o restaurante estiver suspenso (ex: inadimplência) ou inativo
        if (req.tenantStatus === 'suspenso') {
            return res.status(403).json({
                sucesso: false,
                mensagem: "O acesso deste restaurante está suspenso devido a pendências financeiras. Entre em contato com o suporte."
            });
        }

        if (req.tenantStatus === 'inativo') {
            return res.status(403).json({
                sucesso: false,
                mensagem: "Esta conta de restaurante está inativa."
            });
        }

        // Tudo certo, prossegue para o próximo middleware/controlador
        next();

    } catch (err) {
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro interno ao validar o restaurante (Tenant)."
        });
    }
}

module.exports = identificarTenant;
