
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useMedicamentos } from '@/hooks/useMedicamentos';

interface VendaFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const VendaForm: React.FC<VendaFormProps> = ({ onSave, onCancel, isLoading }) => {
  const { medicamentos } = useMedicamentos();
  const [formData, setFormData] = useState({
    numero_venda: '',
    cliente_nome: '',
    cliente_cpf: '',
    cliente_telefone: '',
    medicamento_id: '',
    medicamento_nome: '',
    quantidade: 1,
    preco_unitario: 0,
    preco_total: 0,
    desconto: 0,
    vendedor_nome: '',
    forma_pagamento: '',
    data_venda: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    // Gerar número da venda automático
    const numeroVenda = `V${Date.now()}`;
    setFormData(prev => ({ ...prev, numero_venda: numeroVenda }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calcular preço total considerando desconto
    const precoTotalFinal = (formData.quantidade * formData.preco_unitario) - formData.desconto;
    
    const vendaData = {
      ...formData,
      preco_total: precoTotalFinal,
      data_venda: new Date(formData.data_venda).toISOString(),
    };
    
    onSave(vendaData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Recalcular preço total quando quantidade, preço unitário ou desconto mudam
      if (field === 'quantidade' || field === 'preco_unitario' || field === 'desconto') {
        const quantidade = field === 'quantidade' ? Number(value) : updated.quantidade;
        const precoUnitario = field === 'preco_unitario' ? Number(value) : updated.preco_unitario;
        const desconto = field === 'desconto' ? Number(value) : updated.desconto;
        
        updated.preco_total = (quantidade * precoUnitario) - desconto;
      }
      
      return updated;
    });
  };

  const handleMedicamentoChange = (medicamentoId: string) => {
    const medicamento = medicamentos.find(m => m.id === medicamentoId);
    if (medicamento) {
      setFormData(prev => ({
        ...prev,
        medicamento_id: medicamentoId,
        medicamento_nome: medicamento.nome,
        preco_unitario: medicamento.preco_venda,
        preco_total: prev.quantidade * medicamento.preco_venda - prev.desconto,
      }));
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Nova Venda</h1>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados da Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero_venda">Número da Venda</Label>
                <Input
                  id="numero_venda"
                  value={formData.numero_venda}
                  onChange={(e) => handleChange('numero_venda', e.target.value)}
                  required
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliente_nome">Nome do Cliente *</Label>
                <Input
                  id="cliente_nome"
                  value={formData.cliente_nome}
                  onChange={(e) => handleChange('cliente_nome', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliente_cpf">CPF do Cliente</Label>
                <Input
                  id="cliente_cpf"
                  value={formData.cliente_cpf}
                  onChange={(e) => handleChange('cliente_cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cliente_telefone">Telefone do Cliente</Label>
                <Input
                  id="cliente_telefone"
                  value={formData.cliente_telefone}
                  onChange={(e) => handleChange('cliente_telefone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamento_id">Medicamento *</Label>
                <Select 
                  value={formData.medicamento_id} 
                  onValueChange={handleMedicamentoChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um medicamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicamentos.map((medicamento) => (
                      <SelectItem key={medicamento.id} value={medicamento.id}>
                        {medicamento.nome} - R$ {medicamento.preco_venda.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  min="1"
                  value={formData.quantidade}
                  onChange={(e) => handleChange('quantidade', Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco_unitario">Preço Unitário (R$)</Label>
                <Input
                  id="preco_unitario"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco_unitario}
                  onChange={(e) => handleChange('preco_unitario', Number(e.target.value))}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desconto">Desconto (R$)</Label>
                <Input
                  id="desconto"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.desconto}
                  onChange={(e) => handleChange('desconto', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendedor_nome">Vendedor</Label>
                <Input
                  id="vendedor_nome"
                  value={formData.vendedor_nome}
                  onChange={(e) => handleChange('vendedor_nome', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="forma_pagamento">Forma de Pagamento</Label>
                <Select 
                  value={formData.forma_pagamento} 
                  onValueChange={(value) => handleChange('forma_pagamento', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_venda">Data da Venda *</Label>
                <Input
                  id="data_venda"
                  type="date"
                  value={formData.data_venda}
                  onChange={(e) => handleChange('data_venda', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span>Valor Total:</span>
                <span className="font-bold text-green-600">R$ {formData.preco_total.toFixed(2)}</span>
              </div>
              {formData.desconto > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Desconto:</span>
                  <span>- R$ {formData.desconto.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading || !formData.medicamento_id}>
                {isLoading ? 'Processando...' : 'Finalizar Venda'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendaForm;
