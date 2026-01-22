
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const EstoqueFilial = () => {
  const estoqueFiliais = [
    { medicamento: 'Tylenol 500mg', matriz: 150, filial1: 85, filial2: 92 },
    { medicamento: 'Advil 400mg', matriz: 85, filial1: 45, filial2: 67 },
    { medicamento: 'Dipirona 500mg', matriz: 200, filial1: 123, filial2: 156 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Estoque por Filial</h1>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicamento</TableHead>
                <TableHead>Matriz</TableHead>
                <TableHead>Filial 1</TableHead>
                <TableHead>Filial 2</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoqueFiliais.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.medicamento}</TableCell>
                  <TableCell>{item.matriz}</TableCell>
                  <TableCell>{item.filial1}</TableCell>
                  <TableCell>{item.filial2}</TableCell>
                  <TableCell className="font-semibold">
                    {item.matriz + item.filial1 + item.filial2}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoqueFilial;
