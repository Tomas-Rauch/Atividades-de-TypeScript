export interface CreateLivroData {
  titulo: string;
  autor: string;
  anoPublicacao: number;
}

export interface LivroFilters {
  autor?: string;
  disponivel?: boolean;
}

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  disponivel: boolean;
  createdAt: Date;
  updatedAt: Date;
}