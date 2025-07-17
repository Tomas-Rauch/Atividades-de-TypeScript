import prisma from '../database/prisma';
import { CreateLivroData, LivroFilters } from '../types/livro.types';

export class LivroService {
  static async criarLivro(data: CreateLivroData) {
    try {
      const livro = await prisma.livro.create({
        data
      });
      return livro;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw new Error('Erro interno ao criar livro');
    }
  }

  static async listarLivros(filters: LivroFilters = {}) {
    try {
      const where: any = {};

      if (filters.autor) {
        where.autor = {
          contains: filters.autor,
          mode: 'insensitive'
        };
      }

      if (filters.disponivel !== undefined) {
        where.disponivel = filters.disponivel;
      }

      const livros = await prisma.livro.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        }
      });

      return livros;
    } catch (error) {
      console.error('Erro ao listar livros:', error);
      throw new Error('Erro interno ao buscar livros');
    }
  }

  static async buscarLivroPorId(id: number) {
    try {
      const livro = await prisma.livro.findUnique({
        where: { id }
      });
      return livro;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw new Error('Erro interno ao buscar livro');
    }
  }

  static async emprestarLivro(id: number) {
    try {
      const livro = await this.buscarLivroPorId(id);

      if (!livro) {
        const error = new Error('Livro não encontrado') as any;
        error.statusCode = 404;
        throw error;
      }

      if (!livro.disponivel) {
        const error = new Error('Este livro já está emprestado') as any;
        error.statusCode = 400;
        throw error;
      }

      const livroAtualizado = await prisma.livro.update({
        where: { id },
        data: { disponivel: false }
      });

      return livroAtualizado;
    } catch (error: any) {
      if (error.statusCode) {
        throw error;
      }
      console.error('Erro ao emprestar livro:', error);
      throw new Error('Erro interno ao emprestar livro');
    }
  }
}