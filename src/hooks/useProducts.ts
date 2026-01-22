
import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { toast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    
    // Simulação de dados para demonstração
    // Em produção, isso seria uma chamada para a API Laravel
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Dipirona 500mg',
        price: 8.50,
        quantity: 45,
        created_at: '2024-01-15',
        updated_at: '2024-01-15'
      },
      {
        id: 2,
        name: 'Paracetamol 750mg',
        price: 12.30,
        quantity: 8,
        created_at: '2024-01-16',
        updated_at: '2024-01-16'
      },
      {
        id: 3,
        name: 'Ibuprofeno 600mg',
        price: 15.80,
        quantity: 22,
        created_at: '2024-01-17',
        updated_at: '2024-01-17'
      }
    ];

    // Simulação de delay de rede
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulação de criação de produto
      // Em produção, isso seria uma chamada POST para a API Laravel
      const newProduct: Product = {
        ...productData,
        id: Date.now(), // ID temporário para demonstração
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setProducts(prev => [...prev, newProduct]);
      
      toast({
        title: "Sucesso",
        description: "Produto cadastrado com sucesso!",
      });
      
      setIsLoading(false);
      return newProduct;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar produto. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const updateProduct = async (id: number, productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    
    try {
      // Simulação de atualização de produto
      // Em produção, isso seria uma chamada PUT para a API Laravel
      const updatedProduct: Product = {
        ...productData,
        id,
        updated_at: new Date().toISOString()
      };

      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso!",
      });
      
      setIsLoading(false);
      return updatedProduct;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar produto. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    
    try {
      // Simulação de exclusão de produto
      // Em produção, isso seria uma chamada DELETE para a API Laravel
      setProducts(prev => prev.filter(product => product.id !== id));
      
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso!",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir produto. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProducts
  };
};
