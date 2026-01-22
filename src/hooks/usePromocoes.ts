
import { useState, useEffect } from 'react';
import { Promocao } from '@/types/Product';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePromocoes = () => {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPromocoes();
  }, []);

  const loadPromocoes = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('promocoes')
        .select(`
          *,
          medicamentos (
            nome,
            preco_venda
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar promoções:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar promoções. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      // Converter os dados para o tipo correto
      const promocoesFormatadas = (data || []).map(promocao => ({
        ...promocao,
        tipo_desconto: promocao.tipo_desconto as 'percentual' | 'valor_fixo'
      }));

      setPromocoes(promocoesFormatadas);
    } catch (error) {
      console.error('Erro ao carregar promoções:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar promoções. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPromocao = async (promocaoData: {
    titulo: string;
    descricao?: string;
    medicamento_id?: string;
    tipo_desconto: 'percentual' | 'valor_fixo';
    valor_desconto: number;
    preco_promocional?: number;
    data_inicio: string;
    data_fim: string;
  }) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('promocoes')
        .insert([promocaoData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar promoção:', error);
        toast({
          title: "Erro",
          description: "Erro ao criar promoção. Tente novamente.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Promoção criada com sucesso!",
      });
      
      await loadPromocoes(); // Recarregar a lista
      return data;
    } catch (error) {
      console.error('Erro ao criar promoção:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar promoção. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePromocao = async (id: string, promocaoData: Partial<Promocao>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('promocoes')
        .update(promocaoData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar promoção:', error);
        toast({
          title: "Erro",
          description: "Erro ao atualizar promoção. Tente novamente.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Sucesso",
        description: "Promoção atualizada com sucesso!",
      });
      
      await loadPromocoes(); // Recarregar a lista
      return data;
    } catch (error) {
      console.error('Erro ao atualizar promoção:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar promoção. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePromocao = async (id: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('promocoes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir promoção:', error);
        toast({
          title: "Erro",
          description: "Erro ao excluir promoção. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Promoção excluída com sucesso!",
      });
      
      await loadPromocoes(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao excluir promoção:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir promoção. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    promocoes,
    isLoading,
    addPromocao,
    updatePromocao,
    deletePromocao,
    loadPromocoes
  };
};
