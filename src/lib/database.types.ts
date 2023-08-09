export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      schemas: {
        Row: {
          created_at: string | null;
          database_name: string;
          deleted_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          database_name: string;
          deleted_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          database_name?: string;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "schemas_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tables: {
        Row: {
          columns: Json;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          indexes: Json;
          name: string;
          schema_id: string;
          updated_at: string | null;
        };
        Insert: {
          columns: Json;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          indexes: Json;
          name: string;
          schema_id: string;
          updated_at?: string | null;
        };
        Update: {
          columns?: Json;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          indexes?: Json;
          name?: string;
          schema_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tables_schema_id_fkey";
            columns: ["schema_id"];
            referencedRelation: "schemas";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
