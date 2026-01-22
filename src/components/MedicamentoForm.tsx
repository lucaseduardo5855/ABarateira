
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Medicamento } from '@/types/Product';
import { useFornecedores } from '@/hooks/useFornecedores';

interface MedicamentoFormProps {
  medicamento?: Medicamento | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const MedicamentoForm: React.FC<MedicamentoFormProps> = ({
  medicamento,
  onSave,
  onCancel,
  isLoading
}) => {
  const { fornecedores } = useFornecedores();
  const [formData, setFormData] = useState({
    nome: '',
    principio_ativo: '',
    descricao: '',
    preco_compra: '',
    preco_venda: '',
    codigo_barras: '',
    validade: '',
    lote: '',
    fabricante: '',
    categoria: '',
    fornecedor_id: '',
    estoque_minimo: '10',
    ativo: true,
  });

  useEffect(() => {
    if (medicamento) {
      setFormData({
        nome: medicamento.nome || '',
        principio_ativo: medicamento.principio_ativo || '',
        descricao: medicamento.descricao || '',
        preco_compra: medicamento.preco_compra?.toString() || '',
        preco_venda: medicamento.preco_venda?.toString() || '',
        codigo_barras: medicamento.codigo_barras || '',
        validade: medicamento.validade || '',
        lote: medicamento.lote || '',
        fabricante: medicamento.fabricante || '',
        categoria: medicamento.categoria || '',
        fornecedor_id: medicamento.fornecedor_id || '',
        estoque_minimo: medicamento.estoque_minimo?.toString() || '10',
        ativo: medicamento.ativo !== undefined ? medicamento.ativo : true,
      });
    }
  }, [medicamento]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Submetendo formulário com dados:', formData);
    
    // Validar campos obrigatórios
    if (!formData.nome.trim()) {
      console.log('❌ Erro: Nome vazio');
      alert('Nome do medicamento é obrigatório');
      return;
    }

    if (!formData.preco_compra || parseFloat(formData.preco_compra) < 0) {
      console.log('❌ Erro: Preço de compra inválido');
      alert('Preço de compra deve ser um valor válido maior ou igual a zero');
      return;
    }

    if (!formData.preco_venda || parseFloat(formData.preco_venda) < 0) {
      console.log('❌ Erro: Preço de venda inválido');
      alert('Preço de venda deve ser um valor válido maior ou igual a zero');
      return;
    }

    // Preparar dados para envio
    const dataToSave = {
      nome: formData.nome.trim(),
      principio_ativo: formData.principio_ativo.trim() || null,
      descricao: formData.descricao.trim() || null,
      preco_compra: parseFloat(formData.preco_compra),
      preco_venda: parseFloat(formData.preco_venda),
      codigo_barras: formData.codigo_barras.trim() || null,
      validade: formData.validade || null,
      lote: formData.lote.trim() || null,
      fabricante: formData.fabricante.trim() || null,
      categoria: formData.categoria.trim() || null,
      fornecedor_id: formData.fornecedor_id || null,
      estoque_minimo: parseInt(formData.estoque_minimo) || 10,
      ativo: formData.ativo,
    };

    console.log('📝 Dados preparados para envio:', dataToSave);
    
    try {
      await onSave(dataToSave);
      console.log('✅ Medicamento salvo com sucesso');
    } catch (error) {
      console.error('❌ Erro ao salvar medicamento:', error);
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    console.log(`🔄 Alterando campo ${field} para:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {medicamento ? 'Editar Medicamento' : 'Novo Medicamento'}
        </h1>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados do Medicamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  required
                  placeholder="Digite o nome do medicamento"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="principio_ativo">Princípio Ativo</Label>
                <Input
                  id="principio_ativo"
                  value={formData.principio_ativo}
                  onChange={(e) => handleChange('principio_ativo', e.target.value)}
                  placeholder="Digite o princípio ativo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => handleChange('categoria', e.target.value)}
                  placeholder="Digite a categoria"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fabricante">Fabricante</Label>
                <Input
                  id="fabricante"
                  value={formData.fabricante}
                  onChange={(e) => handleChange('fabricante', e.target.value)}
                  placeholder="Digite o fabricante"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lote">Lote</Label>
                <Input
                  id="lote"
                  value={formData.lote}
                  onChange={(e) => handleChange('lote', e.target.value)}
                  placeholder="Digite o lote"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo_barras">Código de Barras</Label>
                <Input
                  id="codigo_barras"
                  value={formData.codigo_barras}
                  onChange={(e) => handleChange('codigo_barras', e.target.value)}
                  placeholder="Digite o código de barras"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validade">Validade</Label>
                <Input
                  id="validade"
                  type="date"
                  value={formData.validade}
                  onChange={(e) => handleChange('validade', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco_compra">Preço de Compra (R$) *</Label>
                <Input
                  id="preco_compra"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco_compra}
                  onChange={(e) => handleChange('preco_compra', e.target.value)}
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preco_venda">Preço de Venda (R$) *</Label>
                <Input
                  id="preco_venda"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco_venda}
                  onChange={(e) => handleChange('preco_venda', e.target.value)}
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estoque_minimo">Estoque Mínimo</Label>
                <Input
                  id="estoque_minimo"
                  type="number"
                  min="0"
                  value={formData.estoque_minimo}
                  onChange={(e) => handleChange('estoque_minimo', e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fornecedor_id">Fornecedor</Label>
                <Select 
                  value={formData.fornecedor_id} 
                  onValueChange={(value) => handleChange('fornecedor_id', value === 'none' ? '' : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum fornecedor</SelectItem>
                    {fornecedores.map((fornecedor) => (
                      <SelectItem key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  placeholder="Digite uma descrição do medicamento"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
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

export default MedicamentoForm;
