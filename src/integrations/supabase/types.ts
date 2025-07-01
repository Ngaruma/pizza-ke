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
      blogs: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          pizza_id: string
          quantity: number
          selected_toppings: Json | null
          size: string | null
          special_instructions: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          pizza_id: string
          quantity?: number
          selected_toppings?: Json | null
          size?: string | null
          special_instructions?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          pizza_id?: string
          quantity?: number
          selected_toppings?: Json | null
          size?: string | null
          special_instructions?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_pizza_id_fkey"
            columns: ["pizza_id"]
            isOneToOne: false
            referencedRelation: "pizzas"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_address: string
          delivery_fee: number | null
          delivery_notes: string | null
          estimated_delivery: string | null
          id: string
          payment_method: string | null
          payment_status: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_address: string
          delivery_fee?: number | null
          delivery_notes?: string | null
          estimated_delivery?: string | null
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_address?: string
          delivery_fee?: number | null
          delivery_notes?: string | null
          estimated_delivery?: string | null
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      pizza_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pizzas: {
        Row: {
          base_price: number
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          name: string
          preparation_time: number | null
          rating: number | null
          sizes: Json | null
          toppings: Json | null
          total_reviews: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          base_price: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name: string
          preparation_time?: number | null
          rating?: number | null
          sizes?: Json | null
          toppings?: Json | null
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          base_price?: number
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          name?: string
          preparation_time?: number | null
          rating?: number | null
          sizes?: Json | null
          toppings?: Json | null
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pizzas_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "pizza_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pizzas_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string
          id: string
          pizza_id: string | null
          rating: number
          vendor_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          pizza_id?: string | null
          rating: number
          vendor_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          pizza_id?: string | null
          rating?: number
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_pizza_id_fkey"
            columns: ["pizza_id"]
            isOneToOne: false
            referencedRelation: "pizzas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          analytics_access: boolean | null
          created_at: string | null
          custom_branding: boolean | null
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_pizzas: number | null
          monthly_price: number
          name: string
          priority_support: boolean | null
          updated_at: string | null
          yearly_price: number
        }
        Insert: {
          analytics_access?: boolean | null
          created_at?: string | null
          custom_branding?: boolean | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_pizzas?: number | null
          monthly_price: number
          name: string
          priority_support?: boolean | null
          updated_at?: string | null
          yearly_price: number
        }
        Update: {
          analytics_access?: boolean | null
          created_at?: string | null
          custom_branding?: boolean | null
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_pizzas?: number | null
          monthly_price?: number
          name?: string
          priority_support?: boolean | null
          updated_at?: string | null
          yearly_price?: number
        }
        Relationships: []
      }
      vendor_subscriptions: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_subscriptions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          badges: string[] | null
          banner_url: string | null
          business_name: string
          city: string | null
          created_at: string | null
          current_plan_id: string | null
          delivery_fee: number | null
          delivery_time_max: number | null
          delivery_time_min: number | null
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          logo_url: string | null
          phone: string | null
          rating: number | null
          subscription_status: string | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          badges?: string[] | null
          banner_url?: string | null
          business_name: string
          city?: string | null
          created_at?: string | null
          current_plan_id?: string | null
          delivery_fee?: number | null
          delivery_time_max?: number | null
          delivery_time_min?: number | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          logo_url?: string | null
          phone?: string | null
          rating?: number | null
          subscription_status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          badges?: string[] | null
          banner_url?: string | null
          business_name?: string
          city?: string | null
          created_at?: string | null
          current_plan_id?: string | null
          delivery_fee?: number | null
          delivery_time_max?: number | null
          delivery_time_min?: number | null
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          logo_url?: string | null
          phone?: string | null
          rating?: number | null
          subscription_status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_current_plan_id_fkey"
            columns: ["current_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: {
        Args: { title: string }
        Returns: string
      }
    }
    Enums: {
      user_role: "customer" | "vendor" | "admin"
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
    Enums: {
      user_role: ["customer", "vendor", "admin"],
    },
  },
} as const
