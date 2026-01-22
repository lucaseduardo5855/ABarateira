
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Fornecedor } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

export const useFornecedores = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: fornecedores = [], isLoading } = useQuery({
    queryKey: ['fornecedores'],
    queryFn: async (): Promise<Fornecedor[]> => {
      console.log('Buscando fornecedores do Supabase...');
      const { data, error } = await supabase
        .from('fornecedores')
        .select('*')
        .order('nome');

      if (error) {
        console.error('Erro ao buscar fornecedores:', error);
        throw error;
      }

      console.log('Fornecedores encontrados:', data);
      return data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (fornecedor: Omit<Fornecedor, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Criando fornecedor:', fornecedor);
      
      // Preparar dados para inserção no Supabase
      const fornecedorData = {
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        telefone: fornecedor.telefone || null,
        email: fornecedor.email || null,
        endereco: fornecedor.endereco || null,
        contato_responsavel: fornecedor.contato_responsavel || null,
      };

      const { data, error } = await supabase
        .from('fornecedores')
        .insert([fornecedorData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar fornecedor:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
      toast({
        title: "Sucesso",
        description: "Fornecedor criado com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro na mutação:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar fornecedor. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Fornecedor> }) => {
      console.log('Atualizando fornecedor:', id, updates);
      
      // Preparar dados para atualização
      const updateData: any = {};
      Object.keys(updates).forEach(key => {
        const value = updates[key as keyof Fornecedor];
        if (value === '') {
          updateData[key] = null;
        } else {
          updateData[key] = value;
        }
      });

      const { data, error } = await supabase
        .from('fornecedores')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar fornecedor:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
      toast({
        title: "Sucesso",
        description: "Fornecedor atualizado com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro na atualização:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar fornecedor. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deletando fornecedor:', id);
      const { error } = await supabase
        .from('fornecedores')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar fornecedor:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fornecedores'] });
      toast({
        title: "Sucesso",
        description: "Fornecedor removido com sucesso!",
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover fornecedor. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  return {
    fornecedores,
    isLoading,
    createFornecedor: createMutation.mutateAsync,
    updateFornecedor: (id: string, updates: Partial<Fornecedor>) => 
      updateMutation.mutateAsync({ id, updates }),
    deleteFornecedor: deleteMutation.mutateAsync,
  };
};
