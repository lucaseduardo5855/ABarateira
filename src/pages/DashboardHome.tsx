
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Total de Medicamentos',
      value: '156',
      icon: Pill,
      color: 'text-blue-600'
    },
    {
      title: 'Vendas Hoje',
      value: '23',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      title: 'Estoque Baixo',
      value: '8',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'Faturamento Mensal',
      value: 'R$ 45.230',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de gerenciamento da Farmácia A Barateira</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Medicamentos com Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span>Dipirona 500mg</span>
                <span className="font-semibold text-orange-600">5 unidades</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span>Amoxicilina 250mg</span>
                <span className="font-semibold text-orange-600">3 unidades</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span>Omeprazol 20mg</span>
                <span className="font-semibold text-orange-600">7 unidades</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-gray-600">Tylenol 500mg</p>
                </div>
                <span className="font-semibold text-green-600">R$ 25,80</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Maria Santos</p>
                  <p className="text-sm text-gray-600">Advil 400mg</p>
                </div>
                <span className="font-semibold text-green-600">R$ 22,50</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Pedro Costa</p>
                  <p className="text-sm text-gray-600">Dipirona 500mg</p>
                </div>
                <span className="font-semibold text-green-600">R$ 8,90</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
