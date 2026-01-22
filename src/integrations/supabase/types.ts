export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      estoque_filiais: {
        Row: {
          estoque_minimo: number | null
          filial_id: string | null
          id: string
          medicamento_id: string | null
          quantidade: number
          ultima_atualizacao: string | null
        }
        Insert: {
          estoque_minimo?: number | null
          filial_id?: string | null
          id?: string
          medicamento_id?: string | null
          quantidade?: number
          ultima_atualizacao?: string | null
        }
        Update: {
          estoque_minimo?: number | null
          filial_id?: string | null
          id?: string
          medicamento_id?: string | null
          quantidade?: number
          ultima_atualizacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estoque_filiais_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estoque_filiais_medicamento_id_fkey"
            columns: ["medicamento_id"]
            isOneToOne: false
            referencedRelation: "medicamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      filiais: {
        Row: {
          created_at: string | null
          endereco: string
          id: string
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          endereco: string
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          endereco?: string
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fornecedores: {
        Row: {
          cnpj: string
          contato_responsavel: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          cnpj: string
          contato_responsavel?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          cnpj?: string
          contato_responsavel?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      log_acesso: {
        Row: {
          data_login: string | null
          id: string
          ip_address: unknown | null
          sucesso: boolean | null
          user_agent: string | null
          usuario_id: string | null
        }
        Insert: {
          data_login?: string | null
          id?: string
          ip_address?: unknown | null
          sucesso?: boolean | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Update: {
          data_login?: string | null
          id?: string
          ip_address?: unknown | null
          sucesso?: boolean | null
          user_agent?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      medicamentos: {
        Row: {
          ativo: boolean | null
          categoria: string | null
          codigo_barras: string | null
          created_at: string | null
          descricao: string | null
          estoque_minimo: number | null
          fabricante: string | null
          fornecedor_id: string | null
          id: string
          lote: string | null
          nome: string
          preco_compra: number
          preco_venda: number
          principio_ativo: string | null
          quantidade: number | null
          updated_at: string | null
          validade: string | null
        }
        Insert: {
          ativo?: boolean | null
          categoria?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque_minimo?: number | null
          fabricante?: string | null
          fornecedor_id?: string | null
          id?: string
          lote?: string | null
          nome: string
          preco_compra: number
          preco_venda: number
          principio_ativo?: string | null
          quantidade?: number | null
          updated_at?: string | null
          validade?: string | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          descricao?: string | null
          estoque_minimo?: number | null
          fabricante?: string | null
          fornecedor_id?: string | null
          id?: string
          lote?: string | null
          nome?: string
          preco_compra?: number
          preco_venda?: number
          principio_ativo?: string | null
          quantidade?: number | null
          updated_at?: string | null
          validade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medicamentos_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          email: string
          filial_id: string | null
          id: string
          nome: string
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          email: string
          filial_id?: string | null
          id: string
          nome: string
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          email?: string
          filial_id?: string | null
          id?: string
          nome?: string
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
        ]
      }
      promocoes: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          medicamento_id: string | null
          preco_promocional: number | null
          tipo_desconto: string | null
          titulo: string
          updated_at: string | null
          valor_desconto: number
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: string
          medicamento_id?: string | null
          preco_promocional?: number | null
          tipo_desconto?: string | null
          titulo: string
          updated_at?: string | null
          valor_desconto: number
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          medicamento_id?: string | null
          preco_promocional?: number | null
          tipo_desconto?: string | null
          titulo?: string
          updated_at?: string | null
          valor_desconto?: number
        }
        Relationships: [
          {
            foreignKeyName: "promocoes_medicamento_id_fkey"
            columns: ["medicamento_id"]
            isOneToOne: false
            referencedRelation: "medicamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      vendas: {
        Row: {
          cliente_cpf: string | null
          cliente_nome: string
          cliente_telefone: string | null
          created_at: string | null
          data_venda: string | null
          desconto: number | null
          filial_id: string | null
          forma_pagamento: string | null
          id: string
          medicamento_id: string | null
          medicamento_nome: string
          numero_venda: string
          preco_total: number
          preco_unitario: number
          quantidade: number
          vendedor_nome: string | null
        }
        Insert: {
          cliente_cpf?: string | null
          cliente_nome: string
          cliente_telefone?: string | null
          created_at?: string | null
          data_venda?: string | null
          desconto?: number | null
          filial_id?: string | null
          forma_pagamento?: string | null
          id?: string
          medicamento_id?: string | null
          medicamento_nome: string
          numero_venda: string
          preco_total: number
          preco_unitario: number
          quantidade: number
          vendedor_nome?: string | null
        }
        Update: {
          cliente_cpf?: string | null
          cliente_nome?: string
          cliente_telefone?: string | null
          created_at?: string | null
          data_venda?: string | null
          desconto?: number | null
          filial_id?: string | null
          forma_pagamento?: string | null
          id?: string
          medicamento_id?: string | null
          medicamento_nome?: string
          numero_venda?: string
          preco_total?: number
          preco_unitario?: number
          quantidade?: number
          vendedor_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendas_filial_id_fkey"
            columns: ["filial_id"]
            isOneToOne: false
            referencedRelation: "filiais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendas_medicamento_id_fkey"
            columns: ["medicamento_id"]
            isOneToOne: false
            referencedRelation: "medicamentos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_or_manager: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
