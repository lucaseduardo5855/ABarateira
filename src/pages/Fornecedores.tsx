
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useFornecedores } from '@/hooks/useFornecedores';
import FornecedorForm from '@/components/FornecedorForm';
import FornecedorTable from '@/components/FornecedorTable';
import { Fornecedor } from '@/types/Product';

const Fornecedores = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);
  const { fornecedores, isLoading, createFornecedor, updateFornecedor, deleteFornecedor } = useFornecedores();

  const handleSave = async (data: any) => {
    try {
      if (editingFornecedor) {
        await updateFornecedor(editingFornecedor.id, data);
      } else {
        await createFornecedor(data);
      }
      setShowForm(false);
      setEditingFornecedor(null);
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const handleEdit = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFornecedor(id);
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFornecedor(null);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <FornecedorForm
          fornecedor={editingFornecedor}
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
        <h1 className="text-2xl font-bold text-gray-800">Fornecedores</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Fornecedor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Fornecedores</CardTitle>
        </CardHeader>
        <CardContent>
          <FornecedorTable
            fornecedores={fornecedores}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Fornecedores;
