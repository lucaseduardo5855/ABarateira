
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Medicamento } from '@/types/Product';

interface MedicamentoTableProps {
  medicamentos: Medicamento[];
  onEdit: (medicamento: Medicamento) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const MedicamentoTable: React.FC<MedicamentoTableProps> = ({
  medicamentos,
  onEdit,
  onDelete,
  isLoading
}) => {
  if (isLoading) {
    return <div className="text-center py-4">Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Princípio Ativo</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Fabricante</TableHead>
          <TableHead>Preço Compra</TableHead>
          <TableHead>Preço Venda</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicamentos.map((medicamento) => (
          <TableRow key={medicamento.id}>
            <TableCell className="font-medium">{medicamento.nome}</TableCell>
            <TableCell>{medicamento.principio_ativo || '-'}</TableCell>
            <TableCell>{medicamento.categoria || '-'}</TableCell>
            <TableCell>{medicamento.fabricante || '-'}</TableCell>
            <TableCell>R$ {medicamento.preco_compra.toFixed(2)}</TableCell>
            <TableCell>R$ {medicamento.preco_venda.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(medicamento)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(medicamento.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MedicamentoTable;
