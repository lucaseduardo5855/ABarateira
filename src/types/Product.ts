
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

// Tipos baseados na estrutura do banco Supabase
export interface Medicamento {
  id: string;
  nome: string;
  principio_ativo: string | null;
  descricao: string | null;
  preco_compra: number;
  preco_venda: number;
  codigo_barras: string | null;
  validade: string | null;
  lote: string | null;
  fabricante: string | null;
  categoria: string | null;
  fornecedor_id: string | null;
  estoque_minimo: number;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Venda {
  id: string;
  numero_venda: string;
  cliente_nome: string;
  cliente_cpf: string | null;
  cliente_telefone: string | null;
  medicamento_id: string | null;
  medicamento_nome: string;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
  desconto: number;
  filial_id: string | null;
  vendedor_nome: string | null;
  forma_pagamento: string | null;
  data_venda: string;
  created_at?: string;
}

export interface EstoqueFilial {
  id: string;
  medicamento_id: string;
  filial_id: string;
  quantidade: number;
  estoque_minimo: number;
  ultima_atualizacao: string;
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string | null;
  email: string | null;
  endereco: string | null;
  contato_responsavel: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Promocao {
  id: string;
  medicamento_id: string | null;
  titulo: string;
  descricao: string | null;
  tipo_desconto: 'percentual' | 'valor_fixo';
  valor_desconto: number;
  preco_promocional: number | null;
  data_inicio: string;
  data_fim: string;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
  // Relação com medicamentos
  medicamentos?: {
    nome: string;
    preco_venda: number;
  } | null;
}

export interface Filial {
  id: string;
  nome: string;
  endereco: string;
  telefone: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'gerente' | 'vendedor';
  filial_id: string | null;
  ativo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
