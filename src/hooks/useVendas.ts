
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Venda } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

export const useVendas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: vendas = [], isLoading } = useQuery({
    queryKey: ['vendas'],
    queryFn: async (): Promise<Venda[]> => {
      console.log('Buscando vendas do Supabase...');
      const { data, error } = await supabase
        .from('vendas')
        .select('*')
        .order('data_venda', { ascending: false });

      if (error) {
        console.error('Erro ao buscar vendas:', error);
        throw error;
      }

      console.log('Vendas encontradas:', data);
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (venda: Omit<Venda, 'id' | 'created_at'>) => {
      console.log('Criando venda:', venda);
      
      // Preparar dados para inserção no Supabase
      const vendaData = {
        numero_venda: venda.numero_venda,
        cliente_nome: venda.cliente_nome,
        cliente_cpf: venda.cliente_cpf || null,
        cliente_telefone: venda.cliente_telefone || null,
        medicamento_id: venda.medicamento_id || null,
        medicamento_nome: venda.medicamento_nome,
        quantidade: Number(venda.quantidade),
        preco_unitario: Number(venda.preco_unitario),
        preco_total: Number(venda.preco_total),
        desconto: Number(venda.desconto) || 0,
        vendedor_nome: venda.vendedor_nome || null,
        forma_pagamento: venda.forma_pagamento || null,
        data_venda: venda.data_venda || new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('vendas')
        .insert([vendaData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar venda:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendas'] });
      toast({
        title: "Sucesso",
        description: "Venda registrada com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro na mutação:', error);
      toast({
        title: "Erro",
        description: "Erro ao registrar venda. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const getVendasByFilter = (filtros: { cliente: string; produto: string; data: string }) => {
    return vendas.filter(venda => {
      const matchCliente = !filtros.cliente || 
        venda.cliente_nome.toLowerCase().includes(filtros.cliente.toLowerCase());
      
      const matchProduto = !filtros.produto || 
        venda.medicamento_nome.toLowerCase().includes(filtros.produto.toLowerCase());
      
      const matchData = !filtros.data || 
        new Date(venda.data_venda).toISOString().split('T')[0] === filtros.data;
      
      return matchCliente && matchProduto && matchData;
    });
  };

  return {
    vendas,
    isLoading,
    createVenda: createMutation.mutateAsync,
    getVendasByFilter,
  };
};
