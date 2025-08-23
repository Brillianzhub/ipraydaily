/* eslint-disable */

export interface Hymn {
  id: number
  title: string
  author: string
  year: number
  has_chorus: boolean
  chorus: string
  last_updated: string
  stanzas: any[]
  shareCount?: number
  lastShared?: string
}