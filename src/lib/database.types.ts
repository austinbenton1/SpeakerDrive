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
      companies: {
        Row: {
          id: number
          company_name: string
          company_address: string | null
          company_contact_number: string | null
          company_email: string | null
          company_email_key: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          company_name: string
          company_address?: string | null
          company_contact_number?: string | null
          company_email?: string | null
          company_email_key?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          company_name?: string
          company_address?: string | null
          company_contact_number?: string | null
          company_email?: string | null
          company_email_key?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: number
          user_id: string
          email: string
          password: string
          user_type: 'Admin' | 'Client'
          user_role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          email: string
          password: string
          user_type?: 'Admin' | 'Client'
          user_role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          email?: string
          password?: string
          user_type?: 'Admin' | 'Client'
          user_role?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: number
          email: string
          password: string
          user_type: 'Admin' | 'Client'
          company: number | null
          user_role: string | null
          fname: string | null
          lname: string | null
          contact_number: string | null
          address: string | null
          last_login: string | null
          online: 0 | 1
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          email: string
          password: string
          user_type: 'Admin' | 'Client'
          company?: number | null
          user_role?: string | null
          fname?: string | null
          lname?: string | null
          contact_number?: string | null
          address?: string | null
          last_login?: string | null
          online?: 0 | 1
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          email?: string
          password?: string
          user_type?: 'Admin' | 'Client'
          company?: number | null
          user_role?: string | null
          fname?: string | null
          lname?: string | null
          contact_number?: string | null
          address?: string | null
          last_login?: string | null
          online?: 0 | 1
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      password_reset_tokens: {
        Row: {
          email: string
          token: string
          created_at: string
          expires_at: string
        }
        Insert: {
          email: string
          token: string
          created_at?: string
          expires_at?: string
        }
        Update: {
          email?: string
          token?: string
          created_at?: string
          expires_at?: string
        }
      }
    }
    Enums: {
      user_type: 'Admin' | 'Client'
    }
  }
}