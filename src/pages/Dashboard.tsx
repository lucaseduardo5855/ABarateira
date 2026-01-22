
import React from 'react';
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
import DashboardHome from './DashboardHome';

const Dashboard = () => {
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
                <Route path="/" element={<DashboardHome />} />
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

export default Dashboard;
