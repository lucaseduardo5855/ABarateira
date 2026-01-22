
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { 
  Pill, 
  ShoppingCart, 
  Building2, 
  History, 
  Truck, 
  Tag, 
  Search 
} from 'lucide-react';

const menuItems = [
  {
    title: "Medicamentos",
    url: "/medicamentos",
    icon: Pill,
  },
  {
    title: "Vendas",
    url: "/vendas",
    icon: ShoppingCart,
  },
  {
    title: "Estoque por Filial",
    url: "/estoque-filial",
    icon: Building2,
  },
  {
    title: "Histórico de Vendas",
    url: "/historico-vendas",
    icon: History,
  },
  {
    title: "Fornecedores",
    url: "/fornecedores",
    icon: Truck,
  },
  {
    title: "Promoções",
    url: "/promocoes",
    icon: Tag,
  },
  {
    title: "Consulta de Preços",
    url: "/consulta-precos",
    icon: Search,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold text-blue-800">Farmácia A Barateira</h2>
        <p className="text-sm text-gray-500">Sistema de Gerenciamento</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url || (location.pathname === "/" && item.url === "/medicamentos")}
                  >
                    <button
                      onClick={() => handleNavigate(item.url)}
                      className="flex items-center w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
