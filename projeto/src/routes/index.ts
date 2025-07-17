import { Router } from 'express';
import livroRoutes from './livroRoutes';

const router = Router();

// Rotas da API
router.use('/livros', livroRoutes);

// Rota de status da API
router.get('/health', (req, res) => {
  res.json({
    message: 'API Biblioteca funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;