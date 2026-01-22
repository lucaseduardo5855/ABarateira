
-- Habilitar RLS nas tabelas se ainda não estiver habilitado
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

-- Criar políticas para fornecedores
DROP POLICY IF EXISTS "Permitir todas operações em fornecedores" ON public.fornecedores;
CREATE POLICY "Permitir todas operações em fornecedores" 
  ON public.fornecedores 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Criar políticas para medicamentos
DROP POLICY IF EXISTS "Permitir todas operações em medicamentos" ON public.medicamentos;
CREATE POLICY "Permitir todas operações em medicamentos" 
  ON public.medicamentos 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Criar políticas para vendas
DROP POLICY IF EXISTS "Permitir todas operações em vendas" ON public.vendas;
CREATE POLICY "Permitir todas operações em vendas" 
  ON public.vendas 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Inserir dados de exemplo
INSERT INTO public.fornecedores (nome, cnpj, telefone, email, endereco, contato_responsavel)
VALUES 
  ('Farmácia Distribuidora ABC', '12.345.678/0001-90', '(11) 3456-7890', 'contato@farmabc.com.br', 'Rua das Flores, 123 - São Paulo/SP', 'João Silva'),
  ('Medicamentos Express Ltda', '98.765.432/0001-10', '(11) 2345-6789', 'vendas@medexpress.com.br', 'Av. Paulista, 456 - São Paulo/SP', 'Maria Santos')
ON CONFLICT (cnpj) DO NOTHING;

-- Inserir medicamentos de exemplo
INSERT INTO public.medicamentos (
  nome, 
  principio_ativo, 
  descricao, 
  preco_compra, 
  preco_venda, 
  codigo_barras, 
  fabricante, 
  categoria, 
  fornecedor_id,
  estoque_minimo
)
SELECT 
  'Paracetamol 500mg',
  'Paracetamol',
  'Analgésico e antitérmico',
  2.50,
  4.99,
  '7891234567890',
  'EMS',
  'Analgésicos',
  f.id,
  20
FROM public.fornecedores f 
WHERE f.nome = 'Farmácia Distribuidora ABC'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.medicamentos (
  nome, 
  principio_ativo, 
  descricao, 
  preco_compra, 
  preco_venda, 
  codigo_barras, 
  fabricante, 
  categoria, 
  fornecedor_id,
  estoque_minimo
)
SELECT 
  'Dipirona 500mg',
  'Dipirona Sódica',
  'Analgésico, antipirético e antiespasmódico',
  1.80,
  3.49,
  '7891234567891',
  'Medley',
  'Analgésicos',
  f.id,
  15
FROM public.fornecedores f 
WHERE f.nome = 'Medicamentos Express Ltda'
LIMIT 1
ON CONFLICT DO NOTHING;
