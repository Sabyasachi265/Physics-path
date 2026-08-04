/**
 * Hand-written types matching supabase/migrations/0001_init.sql.
 * If you change the SQL schema, update this file to match (or generate it
 * automatically later with the Supabase CLI: `supabase gen types typescript`).
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      topic_progress: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          completed: boolean;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id: string;
          completed?: boolean;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string;
          completed?: boolean;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      saved_resources: {
        Row: {
          id: string;
          user_id: string;
          resource_id: string;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          resource_id: string;
          saved_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          resource_id?: string;
          saved_at?: string;
        };
        Relationships: [];
      };
      topic_notes: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string | null;
          content: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic_id?: string | null;
          content?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic_id?: string | null;
          content?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      study_activity: {
        Row: {
          id: string;
          user_id: string;
          activity_date: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          activity_date?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          activity_date?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
