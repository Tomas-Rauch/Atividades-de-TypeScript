import { Request, Response, NextFunction } from 'express';
import { CreateLivroData } from '../types/livro.types';

export const validateCreateLivro = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { titulo, autor, anoPublicacao }: CreateLivroData = req.body;

  // Validar campos obrigatórios
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
    return res.status(400).json({
      error: 'Título é obrigatório e deve ser uma string não vazia'
    });
  }

  if (!autor || typeof autor !== 'string' || autor.trim().length === 0) {
    return res.status(400).json({
      error: 'Autor é obrigatório e deve ser uma string não vazia'
    });
  }

  if (!anoPublicacao || typeof anoPublicacao !== 'number') {
    return res.status(400).json({
      error: 'Ano de publicação é obrigatório e deve ser um número'
    });
  }

  // Validar ano de publicação
  const anoAtual = new Date().getFullYear();
  if (anoPublicacao > anoAtual) {
    return res.status(400).json({
      error: 'Ano de publicação não pode ser no futuro'
    });
  }

  if (anoPublicacao < 0) {
    return res.status(400).json({
      error: 'Ano de publicação deve ser positivo'
    });
  }

  // Normalizar dados
  req.body.titulo = titulo.trim();
  req.body.autor = autor.trim();

  next();
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const livroId = parseInt(id);

  if (isNaN(livroId) || livroId <= 0) {
    return res.status(400).json({
      error: 'ID deve ser um número válido e positivo'
    });
  }

  req.params.id = livroId.toString();
  next();
};