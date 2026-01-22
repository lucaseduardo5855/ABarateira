
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Venda } from '@/types/Product';

interface VendaTableProps {
  vendas: Venda[];
  isLoading: boolean;
}

const VendaTable: React.FC<VendaTableProps> = ({ vendas, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-4">Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Medicamento</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Preço Unitário</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendas.map((venda) => (
          <TableRow key={venda.id}>
            <TableCell>{venda.cliente_nome}</TableCell>
            <TableCell>{venda.medicamento_nome}</TableCell>
            <TableCell>{venda.quantidade}</TableCell>
            <TableCell>R$ {venda.preco_unitario.toFixed(2)}</TableCell>
            <TableCell className="font-semibold text-green-600">
              R$ {venda.preco_total.toFixed(2)}
            </TableCell>
            <TableCell>{new Date(venda.data_venda).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VendaTable;
