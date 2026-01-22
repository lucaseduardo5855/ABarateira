
-- Habilitar RLS na tabela promocoes se ainda não estiver habilitado
ALTER TABLE public.promocoes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir que usuários autenticados vejam todas as promoções
CREATE POLICY "Users can view all promocoes" 
  ON public.promocoes 
  FOR SELECT 
  USING (true);

-- Criar política para permitir que usuários autenticados criem promoções
CREATE POLICY "Users can create promocoes" 
  ON public.promocoes 
  FOR INSERT 
  WITH CHECK (true);

-- Criar política para permitir que usuários autenticados atualizem promoções
CREATE POLICY "Users can update promocoes" 
  ON public.promocoes 
  FOR UPDATE 
  USING (true);

-- Criar política para permitir que usuários autenticados excluam promoções
CREATE POLICY "Users can delete promocoes" 
  ON public.promocoes 
  FOR DELETE 
  USING (true);
