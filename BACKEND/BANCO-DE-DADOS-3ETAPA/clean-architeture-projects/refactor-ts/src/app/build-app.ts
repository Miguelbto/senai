import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

// interface com as opções de configuração
export interface BuildAppOptions {
    dbPath?: string;
    logger?: boolean;
}

// função principal para construir a aplicação fastfy
export function buildApp(options: BuildAppOptions = {}): FastifyInstance {
    // define se usa fichiero físico ou base de dados em memória
    const dbPath = options.dbPath ?? 'loja.db';

    // variavel db passa a ser estritamente local à função buildApp
    const db = new Database(dbPath);

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        is_vip INTEGER DEFAULT 0,
        created_at TEXT
    );
    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        price_cents INTEGER,
        stock INTEGER,
        active INTEGER DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        status TEXT,
        subtotal INTEGER,
        discount INTEGER,
        shipping INTEGER,
        total INTEGER,
        coupon TEXT,
        payment_method TEXT,
        installments INTEGER,
        tracking_code TEXT,
        created_at TEXT,
        paid_at TEXT,
        shipped_at TEXT,
        canceled_at TEXT
    );
    CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT,
        product_id TEXT,
        quantity INTEGER,
        unit_price INTEGER
    );
        `)

    // instância do Fastify
    const app = Fastify({
        logger: options.logger ?? true,
    })

    //Fecha a ligação à base de dados quando o fastify for encerrado
    app.addHook('onClose', async () => {
        db.close()
    })



    // 3. Registo das rotas (capturam a variável local 'db' por closure)
    app.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const stmt = db.prepare('SELECT * FROM users');
        const users = stmt.all();
        return reply.send(users);
    });

    app.get('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const u: any = db.prepare('SELECT * FROM users WHERE id = ?').get(request.id)
        if (!u) return reply.status(404).send({ error: 'usuario nao encontrado' })
        return { id: u.id, name: u.name, email: u.email, isVip: !!u.is_vip, createdAt: u.created_at }
    })

    app.post('/users', async (request, reply) => {
        const { name, email, password, isVip } = request.body as { name: string; email: string, password: string, isVip: number };

        const id = crypto.randomUUID() // não é aqui
        const hashPassword = password //falta criptografar

        const stmt = db.prepare('INSERT INTO users (id, name, email, password, is_vip) VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(id, name, email, password, isVip ? 1 : 0, new Date().toISOString());


        return reply.status(201).send({ id, name, email, isVip: !!isVip });
    });

    return app;
}

// 4. Execução do .listen() APENAS se este ficheiro for o ponto de entrada principal
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMainModule) {
    const app = buildApp({ dbPath: 'loja.db' });
    const PORT = Number(process.env.PORT) || 3000;

    app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        console.log(`🚀 Servidor a rodar em ${address}`);
    });

}