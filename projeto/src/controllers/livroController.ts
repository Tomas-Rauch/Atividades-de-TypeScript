import { Request, Response, NextFunction } from 'express';
import { LivroService } from '../services/livroService';
import { CreateLivroData, LivroFilters } from '../types/livro.types';

export class LivroController {
  static async criarLivro(req: Request, res: Response, next: NextFunction) {
    try {
      const dadosLivro: CreateLivroData = req.body;
      
      const livro = await LivroService.criarLivro(dadosLivro);
      
      res.status(201).json({
        message: 'Livro criado com sucesso',
        data: livro
      });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivros(req: Request, res: Response, next: NextFunction) {
    try {
      const { autor, disponivel } = req.query;
      
      const filters: LivroFilters = {};
      
      if (autor && typeof autor === 'string') {
        filters.autor = autor;
      }
      
      if (disponivel !== undefined) {
        if (disponivel === 'true' || disponivel === 'false') {
          filters.disponivel = disponivel === 'true';
        }
      }

      const livros = await LivroService.listarLivros(filters);
      
      res.json({
        message: 'Livros listados com sucesso',
        data: livros,
        total: livros.length
      });
    } catch (error) {
      next(error);
    }
  }

  static async emprestarLivro(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      
      const livro = await LivroService.emprestarLivro(id);
      
      res.json({
        message: 'Livro emprestado com sucesso',
        data: livro
      });
    } catch (error) {
      next(error);
    }
  }
}