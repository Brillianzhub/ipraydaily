export interface Devotion {
  id: number
  devotional_date: string
  monthly_theme: string
  daily_theme: string
  bible_verse_text: string
  bible_verse_reference: string
  devotion: string
  reflection_question_1: string
  reflection_question_2: string
  reflection_question_3?: string
  prayer: string
  family_challenge?: string
  shareCount?: number
  lastShared?: string
}
