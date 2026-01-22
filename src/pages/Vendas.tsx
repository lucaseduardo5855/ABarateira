
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useVendas } from '@/hooks/useVendas';
import VendaForm from '@/components/VendaForm';
import VendaTable from '@/components/VendaTable';

const Vendas = () => {
  const [showForm, setShowForm] = useState(false);
  const { vendas, isLoading, createVenda } = useVendas();

  const handleSave = async (data: any) => {
    try {
      await createVenda(data);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <VendaForm
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vendas</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Venda
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <VendaTable vendas={vendas} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Vendas;
