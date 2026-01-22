
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useVendas } from '@/hooks/useVendas';
import VendaTable from '@/components/VendaTable';

const HistoricoVendas = () => {
  const { vendas, getVendasByFilter } = useVendas();
  const [filtros, setFiltros] = useState({
    cliente: '',
    produto: '',
    data: ''
  });
  const [vendasFiltradas, setVendasFiltradas] = useState(vendas);

  const handleFiltrar = () => {
    const resultado = getVendasByFilter(filtros);
    setVendasFiltradas(resultado);
  };

  const handleLimpar = () => {
    setFiltros({ cliente: '', produto: '', data: '' });
    setVendasFiltradas(vendas);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Vendas</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={filtros.cliente}
                onChange={(e) => setFiltros(prev => ({ ...prev, cliente: e.target.value }))}
                placeholder="Nome do cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="produto">Produto</Label>
              <Input
                id="produto"
                value={filtros.produto}
                onChange={(e) => setFiltros(prev => ({ ...prev, produto: e.target.value }))}
                placeholder="Nome do produto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={filtros.data}
                onChange={(e) => setFiltros(prev => ({ ...prev, data: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleFiltrar}>Filtrar</Button>
            <Button variant="outline" onClick={handleLimpar}>Limpar</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vendas Encontradas ({vendasFiltradas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <VendaTable vendas={vendasFiltradas} isLoading={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricoVendas;
