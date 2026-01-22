
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useMedicamentos } from '@/hooks/useMedicamentos';
import MedicamentoForm from '@/components/MedicamentoForm';
import MedicamentoTable from '@/components/MedicamentoTable';
import { Medicamento } from '@/types/Product';

const Medicamentos = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMedicamento, setEditingMedicamento] = useState<Medicamento | null>(null);
  const { medicamentos, isLoading, createMedicamento, updateMedicamento, deleteMedicamento } = useMedicamentos();

  const handleSave = async (data: any) => {
    try {
      if (editingMedicamento) {
        await updateMedicamento(editingMedicamento.id, data);
      } else {
        await createMedicamento(data);
      }
      setShowForm(false);
      setEditingMedicamento(null);
    } catch (error) {
      console.error('Erro ao salvar medicamento:', error);
    }
  };

  const handleEdit = (medicamento: Medicamento) => {
    setEditingMedicamento(medicamento);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedicamento(id);
    } catch (error) {
      console.error('Erro ao deletar medicamento:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMedicamento(null);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <MedicamentoForm
          medicamento={editingMedicamento}
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
        <h1 className="text-2xl font-bold text-gray-800">Medicamentos</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Medicamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Medicamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <MedicamentoTable
            medicamentos={medicamentos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Medicamentos;
