import { Router } from 'express';
import ProductController from './ProductController.js';
import upload from '../../shared/middlewares/multer.js';
import { verifyToken, verifyAdmin } from '../../shared/middlewares/auth.js';

const router = Router();

router.use((req, res, next) => {
    console.log(`📍 Rota de Produtos - ${req.method} ${req.path}`);
    next();
});

router.get('/', ProductController.list);
router.get('/:id', ProductController.findById);

router.post('/', verifyToken, verifyAdmin, (req, res, next) => {
    console.log('📤 POST /produtos - Iniciando upload...');
    upload.single('imagem')(req, res, (err) => {
        if (err) {
            console.error('❌ Erro no upload:', err.message);
            return res.status(400).json({ sucesso: false, mensagem: 'Erro no upload: ' + err.message, erro: err.stack });
        }
        console.log('✅ Upload concluído, chamando controlador...');
        ProductController.create(req, res, next);
    });
});

router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), ProductController.update);
router.delete('/:id', verifyToken, verifyAdmin, ProductController.delete);

export default router;