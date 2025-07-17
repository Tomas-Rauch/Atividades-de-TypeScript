import { Router } from 'express';
import { LivroController } from '../controllers/livroController';
import { validateCreateLivro, validateIdParam } from '../middleware/validation';

const router = Router();

// POST /livros - Criar novo livro
router.post('/', validateCreateLivro, LivroController.criarLivro);

// GET /livros - Listar livros (com filtros opcionais)
router.get('/', LivroController.listarLivros);

// PATCH /livros/:id/emprestar - Emprestar livro
router.patch('/:id/emprestar', validateIdParam, LivroController.emprestarLivro);

export default router;