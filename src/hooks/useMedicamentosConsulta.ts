
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MedicamentoConsulta {
  id: string;
  nome: string;
  principio_ativo: string | null;
  preco_venda: number;
  categoria: string | null;
  fabricante: string | null;
  ativo: boolean;
}

const useMedicamentosConsulta = () => {
  const buscarMedicamentos = async (termo: string): Promise<MedicamentoConsulta[]> => {
    console.log('Buscando medicamentos com termo:', termo);
    
    const { data, error } = await supabase
      .from('medicamentos')
      .select('id, nome, principio_ativo, preco_venda, categoria, fabricante, ativo')
      .eq('ativo', true)
      .or(`nome.ilike.%${termo}%, principio_ativo.ilike.%${termo}%`)
      .order('nome');

    if (error) {
      console.error('Erro ao buscar medicamentos:', error);
      throw error;
    }

    console.log('Medicamentos encontrados:', data);
    return data || [];
  };

  const obterTodosMedicamentos = async (): Promise<MedicamentoConsulta[]> => {
    console.log('Obtendo todos os medicamentos ativos');
    
    const { data, error } = await supabase
      .from('medicamentos')
      .select('id, nome, principio_ativo, preco_venda, categoria, fabricante, ativo')
      .eq('ativo', true)
      .order('nome');

    if (error) {
      console.error('Erro ao obter medicamentos:', error);
      throw error;
    }

    console.log('Todos os medicamentos:', data);
    return data || [];
  };

  return {
    buscarMedicamentos,
    obterTodosMedicamentos
  };
};

export default useMedicamentosConsulta;
