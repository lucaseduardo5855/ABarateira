
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Medicamentos from './Medicamentos';
import Vendas from './Vendas';
import EstoqueFilial from './EstoqueFilial';
import HistoricoVendas from './HistoricoVendas';
import Fornecedores from './Fornecedores';
import Promocoes from './Promocoes';
import ConsultaPrecos from './ConsultaPrecos';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1">
            <div className="p-4">
              <SidebarTrigger className="mb-4" />
              <Routes>
                <Route path="/" element={<Medicamentos />} />
                <Route path="/medicamentos" element={<Medicamentos />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/estoque-filial" element={<EstoqueFilial />} />
                <Route path="/historico-vendas" element={<HistoricoVendas />} />
                <Route path="/fornecedores" element={<Fornecedores />} />
                <Route path="/promocoes" element={<Promocoes />} />
                <Route path="/consulta-precos" element={<ConsultaPrecos />} />
              </Routes>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
