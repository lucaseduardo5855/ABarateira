
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, Tag, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import useMedicamentosConsulta, { type MedicamentoConsulta } from '@/hooks/useMedicamentosConsulta';
import { useToast } from '@/hooks/use-toast';

const ConsultaPrecos = () => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<MedicamentoConsulta[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  
  const { buscarMedicamentos } = useMedicamentosConsulta();
  const { toast } = useToast();

  const handleBuscar = async () => {
    if (!busca.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite o nome do medicamento para buscar.",
        variant: "destructive"
      });
      return;
    }

    setCarregando(true);
    setBuscaRealizada(true);
    
    try {
      const medicamentos = await buscarMedicamentos(busca.trim());
      setResultados(medicamentos);
      
      if (medicamentos.length === 0) {
        toast({
          title: "Nenhum resultado",
          description: `Nenhum medicamento encontrado para "${busca}".`,
        });
      } else {
        toast({
          title: "Busca realizada",
          description: `${medicamentos.length} medicamento(s) encontrado(s).`,
        });
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast({
        title: "Erro na busca",
        description: "Ocorreu um erro ao buscar os medicamentos. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Consulta de Preços</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Medicamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite o nome do medicamento ou princípio ativo..."
              onKeyPress={handleKeyPress}
              disabled={carregando}
            />
            <Button 
              onClick={handleBuscar} 
              className="flex items-center gap-2"
              disabled={carregando}
            >
              <Search className="h-4 w-4" />
              {carregando ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {resultados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Resultados ({resultados.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resultados.map((medicamento) => (
                <div key={medicamento.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {medicamento.nome}
                      </h3>
                      
                      <div className="space-y-2">
                        {medicamento.principio_ativo && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Tag className="h-4 w-4" />
                            <span><strong>Princípio Ativo:</strong> {medicamento.principio_ativo}</span>
                          </div>
                        )}
                        
                        {medicamento.fabricante && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building className="h-4 w-4" />
                            <span><strong>Fabricante:</strong> {medicamento.fabricante}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mt-2">
                          {medicamento.categoria && (
                            <Badge variant="secondary">{medicamento.categoria}</Badge>
                          )}
                          <Badge variant="outline" className="text-green-700 border-green-300">
                            Disponível
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">
                        R$ {medicamento.preco_venda.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">Preço de venda</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {buscaRealizada && resultados.length === 0 && !carregando && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Nenhum medicamento encontrado para "{busca}"
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Tente buscar por outro nome ou princípio ativo
            </p>
          </CardContent>
        </Card>
      )}

      {!buscaRealizada && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Digite o nome de um medicamento para começar a busca
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Você pode buscar por nome comercial ou princípio ativo
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsultaPrecos;
