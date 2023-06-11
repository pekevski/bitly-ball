export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      player: {
        Row: {
          id: string
          isHost: boolean
          name: string
          roomId: string
          userId: string | null
        }
        Insert: {
          id?: string
          isHost?: boolean
          name?: string
          roomId: string
          userId?: string | null
        }
        Update: {
          id?: string
          isHost?: boolean
          name?: string
          roomId?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_roomId_fkey"
            columns: ["roomId"]
            referencedRelation: "room"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      room: {
        Row: {
          createdDate: string
          id: string
          rounds: number
          status: Database["public"]["Enums"]["status"] | null
        }
        Insert: {
          createdDate?: string
          id?: string
          rounds?: number
          status?: Database["public"]["Enums"]["status"] | null
        }
        Update: {
          createdDate?: string
          id?: string
          rounds?: number
          status?: Database["public"]["Enums"]["status"] | null
        }
        Relationships: []
      }
      round: {
        Row: {
          createdDate: string
          id: string
          image: string | null
          phrase: string | null
          playerId: string | null
          points: number | null
          result: boolean
          roomId: string | null
          roundIndex: number
          submitted: boolean
        }
        Insert: {
          createdDate?: string
          id?: string
          image?: string | null
          phrase?: string | null
          playerId?: string | null
          points?: number | null
          result?: boolean
          roomId?: string | null
          roundIndex?: number
          submitted?: boolean
        }
        Update: {
          createdDate?: string
          id?: string
          image?: string | null
          phrase?: string | null
          playerId?: string | null
          points?: number | null
          result?: boolean
          roomId?: string | null
          roundIndex?: number
          submitted?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "round_playerId_fkey"
            columns: ["playerId"]
            referencedRelation: "player"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "round_roomId_fkey"
            columns: ["roomId"]
            referencedRelation: "room"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status: "created" | "inprogress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
