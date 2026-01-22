
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePromocoes } from '@/hooks/usePromocoes';
import { useMedicamentos } from '@/hooks/useMedicamentos';

const Promocoes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    medicamento_id: 'none', // Mudança aqui: usar 'none' ao invés de string vazia
    tipo_desconto: 'percentual' as 'percentual' | 'valor_fixo',
    valor_desconto: '',
    preco_promocional: '',
    data_inicio: '',
    data_fim: ''
  });

  const { promocoes, isLoading, addPromocao, updatePromocao, deletePromocao } = usePromocoes();
  const { medicamentos } = useMedicamentos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const promocaoData = {
      titulo: formData.titulo,
      descricao: formData.descricao || null,
      medicamento_id: formData.medicamento_id === 'none' ? null : formData.medicamento_id, // Corrigir aqui
      tipo_desconto: formData.tipo_desconto,
      valor_desconto: parseFloat(formData.valor_desconto),
      preco_promocional: formData.preco_promocional ? parseFloat(formData.preco_promocional) : null,
      data_inicio: formData.data_inicio,
      data_fim: formData.data_fim
    };

    let success = false;
    if (editingId) {
      const result = await updatePromocao(editingId, promocaoData);
      success = !!result;
    } else {
      const result = await addPromocao(promocaoData);
      success = !!result;
    }

    if (success) {
      setIsOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      medicamento_id: 'none', // Usar 'none' ao invés de string vazia
      tipo_desconto: 'percentual',
      valor_desconto: '',
      preco_promocional: '',
      data_inicio: '',
      data_fim: ''
    });
    setEditingId(null);
  };

  const handleEdit = (promocao: any) => {
    setFormData({
      titulo: promocao.titulo,
      descricao: promocao.descricao || '',
      medicamento_id: promocao.medicamento_id || 'none', // Usar 'none' se for null
      tipo_desconto: promocao.tipo_desconto,
      valor_desconto: promocao.valor_desconto.toString(),
      preco_promocional: promocao.preco_promocional?.toString() || '',
      data_inicio: promocao.data_inicio,
      data_fim: promocao.data_fim
    });
    setEditingId(promocao.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta promoção?')) {
      await deletePromocao(id);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calcularDesconto = (precoOriginal: number, precoPromocional: number) => {
    const desconto = ((precoOriginal - precoPromocional) / precoOriginal * 100);
    return desconto.toFixed(0);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Promoções</h1>
        <Sheet open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <SheetTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Promoção
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{editingId ? 'Editar Promoção' : 'Nova Promoção'}</SheetTitle>
              <SheetDescription>
                Preencha os dados para {editingId ? 'editar' : 'criar'} a promoção.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Promoção</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ex: Desconto em Analgésicos"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição da promoção (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicamento_id">Medicamento (Opcional)</Label>
                <Select 
                  value={formData.medicamento_id} 
                  onValueChange={(value) => handleSelectChange('medicamento_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um medicamento (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum medicamento específico</SelectItem>
                    {medicamentos.map((medicamento) => (
                      <SelectItem key={medicamento.id} value={medicamento.id}>
                        {medicamento.nome} - {formatCurrency(medicamento.preco_venda)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo_desconto">Tipo de Desconto</Label>
                <Select 
                  value={formData.tipo_desconto} 
                  onValueChange={(value) => handleSelectChange('tipo_desconto', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentual">Percentual (%)</SelectItem>
                    <SelectItem value="valor_fixo">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valor_desconto">
                  Valor do Desconto {formData.tipo_desconto === 'percentual' ? '(%)' : '(R$)'}
                </Label>
                <Input
                  id="valor_desconto"
                  name="valor_desconto"
                  type="number"
                  step="0.01"
                  value={formData.valor_desconto}
                  onChange={handleInputChange}
                  placeholder={formData.tipo_desconto === 'percentual' ? '10' : '5.00'}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preco_promocional">Preço Promocional (R$) - Opcional</Label>
                <Input
                  id="preco_promocional"
                  name="preco_promocional"
                  type="number"
                  step="0.01"
                  value={formData.preco_promocional}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data_inicio">Data de Início</Label>
                <Input
                  id="data_inicio"
                  name="data_inicio"
                  type="date"
                  value={formData.data_inicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data_fim">Data de Fim</Label>
                <Input
                  id="data_fim"
                  name="data_fim"
                  type="date"
                  value={formData.data_fim}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {editingId ? 'Atualizar' : 'Criar'} Promoção
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promoções {isLoading ? '(Carregando...)' : `(${promocoes.length})`}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Medicamento</TableHead>
                <TableHead>Tipo Desconto</TableHead>
                <TableHead>Valor Desconto</TableHead>
                <TableHead>Preço Promocional</TableHead>
                <TableHead>Início</TableHead>
                <TableHead>Fim</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promocoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {isLoading ? 'Carregando promoções...' : 'Nenhuma promoção encontrada'}
                  </TableCell>
                </TableRow>
              ) : (
                promocoes.map((promocao) => (
                  <TableRow key={promocao.id}>
                    <TableCell className="font-medium">{promocao.titulo}</TableCell>
                    <TableCell>
                      {promocao.medicamentos?.nome || 'Geral'}
                    </TableCell>
                    <TableCell>
                      {promocao.tipo_desconto === 'percentual' ? 'Percentual' : 'Valor Fixo'}
                    </TableCell>
                    <TableCell className="font-semibold text-red-600">
                      {promocao.tipo_desconto === 'percentual' 
                        ? `${promocao.valor_desconto}%` 
                        : formatCurrency(promocao.valor_desconto)
                      }
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {promocao.preco_promocional ? formatCurrency(promocao.preco_promocional) : '-'}
                    </TableCell>
                    <TableCell>{formatDate(promocao.data_inicio)}</TableCell>
                    <TableCell>{formatDate(promocao.data_fim)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        promocao.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {promocao.ativo ? 'Ativa' : 'Inativa'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(promocao)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(promocao.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Promocoes;
