
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Medicamento } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

export const useMedicamentos = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: medicamentos = [], isLoading } = useQuery({
    queryKey: ['medicamentos'],
    queryFn: async (): Promise<Medicamento[]> => {
      console.log('Buscando medicamentos do Supabase...');
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (error) {
        console.error('Erro ao buscar medicamentos:', error);
        throw error;
      }

      console.log('Medicamentos encontrados:', data);
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (medicamento: Omit<Medicamento, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('🚀 Iniciando criação de medicamento:', medicamento);
      
      // Validar campos obrigatórios primeiro
      if (!medicamento.nome || medicamento.nome.trim() === '') {
        throw new Error('Nome do medicamento é obrigatório');
      }

      if (medicamento.preco_compra === undefined || medicamento.preco_compra === null || medicamento.preco_compra < 0) {
        throw new Error('Preço de compra deve ser um valor válido maior ou igual a zero');
      }

      if (medicamento.preco_venda === undefined || medicamento.preco_venda === null || medicamento.preco_venda < 0) {
        throw new Error('Preço de venda deve ser um valor válido maior ou igual a zero');
      }

      // Preparar dados para inserção no Supabase
      const medicamentoData = {
        nome: medicamento.nome.trim(),
        principio_ativo: medicamento.principio_ativo && medicamento.principio_ativo.trim() !== '' ? medicamento.principio_ativo.trim() : null,
        descricao: medicamento.descricao && medicamento.descricao.trim() !== '' ? medicamento.descricao.trim() : null,
        preco_compra: Number(medicamento.preco_compra),
        preco_venda: Number(medicamento.preco_venda),
        codigo_barras: medicamento.codigo_barras && medicamento.codigo_barras.trim() !== '' ? medicamento.codigo_barras.trim() : null,
        validade: medicamento.validade && medicamento.validade !== '' ? medicamento.validade : null,
        lote: medicamento.lote && medicamento.lote.trim() !== '' ? medicamento.lote.trim() : null,
        fabricante: medicamento.fabricante && medicamento.fabricante.trim() !== '' ? medicamento.fabricante.trim() : null,
        categoria: medicamento.categoria && medicamento.categoria.trim() !== '' ? medicamento.categoria.trim() : null,
        fornecedor_id: medicamento.fornecedor_id && medicamento.fornecedor_id.trim() !== '' ? medicamento.fornecedor_id.trim() : null,
        estoque_minimo: medicamento.estoque_minimo ? Number(medicamento.estoque_minimo) : 10,
        ativo: medicamento.ativo !== undefined ? medicamento.ativo : true,
      };

      console.log('📝 Dados preparados para inserção:', medicamentoData);

      const { data, error } = await supabase
        .from('medicamentos')
        .insert([medicamentoData])
        .select()
        .single();

      if (error) {
        console.error('❌ Erro detalhado do Supabase:', error);
        console.error('❌ Código do erro:', error.code);
        console.error('❌ Mensagem do erro:', error.message);
        console.error('❌ Detalhes do erro:', error.details);
        throw new Error(`Erro ao criar medicamento: ${error.message}`);
      }

      console.log('✅ Medicamento criado com sucesso:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('✅ Sucesso na mutação, invalidando queries...');
      queryClient.invalidateQueries({ queryKey: ['medicamentos'] });
      toast({
        title: "Sucesso",
        description: `Medicamento "${data.nome}" criado com sucesso!`,
      });
    },
    onError: (error) => {
      console.error('❌ Erro na mutação:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar medicamento';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Medicamento> }) => {
      console.log('Atualizando medicamento:', id, updates);
      
      // Preparar dados para atualização com validação
      const updateData: any = {};
      Object.keys(updates).forEach(key => {
        const value = updates[key as keyof Medicamento];
        if (key === 'preco_compra' || key === 'preco_venda' || key === 'estoque_minimo') {
          updateData[key] = value ? Number(value) : 0;
        } else if (value === '' || value === undefined) {
          updateData[key] = null;
        } else if (typeof value === 'string') {
          updateData[key] = value.trim() || null;
        } else {
          updateData[key] = value;
        }
      });

      // Validar campos obrigatórios na atualização
      if (updateData.nome !== undefined && !updateData.nome) {
        throw new Error('Nome do medicamento é obrigatório');
      }

      console.log('Dados de atualização preparados:', updateData);

      const { data, error } = await supabase
        .from('medicamentos')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar medicamento:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicamentos'] });
      toast({
        title: "Sucesso",
        description: "Medicamento atualizado com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro na atualização:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao atualizar medicamento';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Desativando medicamento:', id);
      const { error } = await supabase
        .from('medicamentos')
        .update({ ativo: false })
        .eq('id', id);

      if (error) {
        console.error('Erro ao desativar medicamento:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicamentos'] });
      toast({
        title: "Sucesso",
        description: "Medicamento removido com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro ao desativar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao remover medicamento';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  return {
    medicamentos,
    isLoading,
    createMedicamento: createMutation.mutateAsync,
    updateMedicamento: (id: string, updates: Partial<Medicamento>) => 
      updateMutation.mutateAsync({ id, updates }),
    deleteMedicamento: deleteMutation.mutateAsync,
  };
};
