export interface Prayer {
  id: number
  prayer_category: string
  prayer: string
  prayer_scripture: string
  publish: boolean
  featured: boolean
  last_updated: string
  shareCount?: number
  lastShared?: string
}