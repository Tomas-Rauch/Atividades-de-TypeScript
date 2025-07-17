import { Request, Response, NextFunction } from "express";

export const validarTarefa = (req: Request, res: Response, next: NextFunction): Response | void => {
  const titulo = req.body?.titulo;

  const tituloInvalido =
    typeof titulo !== "string" ||
    titulo.trim().length === 0;

  if (!titulo || tituloInvalido) {
    return res.status(400).json({
      erro: "O campo 'titulo' é obrigatório e deve ser uma string não vazia.",
    });
  }

  next();
};