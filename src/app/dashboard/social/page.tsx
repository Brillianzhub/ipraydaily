/* eslint-disable */

'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Search,
  Filter,
  Share2,
  TrendingUp,
  Calendar,
  BookOpen,
  Heart,
  Music,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  MessageSquare,
  BarChart3,
  Clock,
  Users,
  Eye,
  RefreshCw,
  AlertCircle,
  Palette
} from 'lucide-react'
import { SocialShareModal } from '@/components/socials/SocialShareModal'
import { useFetchTodayDevotion } from '@/services/requests/devotion'
import { useFetchHymns } from '@/services/requests/hymns'
import { useFetchPrayers } from '@/services/requests/prayers'
import { useFetchShareTemplates } from '@/services/requests/templates'
import { useFetchBibleChapter } from '@/services/requests/bibles'
import { allBibleBooks } from '@/utils/bible'

// Updated interfaces based on API response
interface DevotionResponse {
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

interface ShareTemplate {
  id: number
  name: string
  template_type: string
  gradient_colors: string[]
  background: string
  text_color: string
  styles: {
    container: any
    [key: string]: any
  }
  created_at: string
  updated_at: string
}

interface ContentItem {
  id: string
  title: string
  content: string
  category: 'bible-verse' | 'prayer' | 'hymn' | 'devotion' | 'share-template'
  date: string
  author?: string
  tags: string[]
  shareCount: number
  lastShared?: string
  scripture?: string
  theme?: string
  template?: ShareTemplate // Add template data
}

interface ShareStats {
  totalShares: number
  weeklyShares: number
  topPlatform: string
  engagementRate: number
}

export default function SocialMediaPage() {
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([])
  const [paginatedItems, setPaginatedItems] = useState<ContentItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [activeTab, setActiveTab] = useState('share')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6) // 3x3 grid
  const [bibleParams, setBibleParams] = useState({
    version: 'KJV', // or whatever default version you want
    bookName: 'Matthew', // default book
    chapterNumber: 1 // default chapter
  })


  // API calls
  const { data: todayDevotion, isLoading: devotionLoading, error: devotionError, refetch: refetchDevotion } = useFetchTodayDevotion()
  const { data: hymns, isLoading: hymnsLoading, error: hymnsError, refetch: refetchHymns } = useFetchHymns()
  const { data: prayers, isLoading: prayersLoading, error: prayersError, refetch: refetchPrayers } = useFetchPrayers()
  const { data: shareTemplates, isLoading: templatesLoading, error: templatesError, refetch: refetchTemplates } = useFetchShareTemplates()
  const {
    data: bibleVerses,
    isLoading: bibleLoading,
    error: bibleError,
    refetch: refetchBible
  } = useFetchBibleChapter(
    bibleParams.version,
    bibleParams.bookName,
    bibleParams.chapterNumber
  )
  // Combine loading states
  const isLoading = devotionLoading || hymnsLoading || prayersLoading || templatesLoading
  const hasError = devotionError || hymnsError || prayersError || templatesError

  // Transform API data to ContentItem format
  const contentItems = useMemo(() => {
    const items: ContentItem[] = []

    // Add today's devotion
    if (todayDevotion) {
      items.push({
        id: `devotion-${todayDevotion.id}`,
        title: todayDevotion.daily_theme,
        content: todayDevotion.devotion,
        category: 'devotion',
        date: todayDevotion.devotional_date,
        tags: ['devotion', 'daily', todayDevotion.monthly_theme?.toLowerCase().replace(/\s+/g, '-')].filter(Boolean),
        shareCount: todayDevotion.shareCount || 0,
        lastShared: todayDevotion.lastShared,
        scripture: `${todayDevotion.bible_verse_text} - ${todayDevotion.bible_verse_reference}`,
        theme: todayDevotion.monthly_theme
      })
    }

    // Add Bible chapter data
    if (bibleVerses && Array.isArray(bibleVerses) && bibleVerses.length > 0) {
      // Add the entire chapter as one item
      const chapterText = bibleVerses.map(v => `${v.verse}. ${v.text}`).join(' ')
      items.push({
        id: `bible-chapter-${bibleParams.bookName}-${bibleParams.chapterNumber}`,
        title: `${bibleParams.bookName} Chapter ${bibleParams.chapterNumber}`,
        content: chapterText,
        category: 'bible-verse',
        date: new Date().toISOString().split('T')[0],
        tags: ['bible-chapter', bibleParams.bookName.toLowerCase(), bibleParams.version.toLowerCase()],
        shareCount: Math.floor(Math.random() * 60) + 15,
        scripture: `${bibleParams.bookName} ${bibleParams.chapterNumber} (${bibleParams.version})`
      })

      // Add first few verses as individual items (to avoid too many items)
      bibleVerses.slice(0, 5).forEach(verse => {
        items.push({
          id: `verse-${bibleParams.bookName}-${bibleParams.chapterNumber}-${verse.verse}`,
          title: `${bibleParams.bookName} ${bibleParams.chapterNumber}:${verse.verse}`,
          content: verse.text,
          category: 'bible-verse',
          date: new Date().toISOString().split('T')[0],
          tags: ['bible-verse', 'scripture', bibleParams.bookName.toLowerCase(), bibleParams.version.toLowerCase()],
          shareCount: Math.floor(Math.random() * 40) + 5,
          scripture: `${bibleParams.bookName} ${bibleParams.chapterNumber}:${verse.verse} (${bibleParams.version})`
        })
      })

      // Add some popular/key verses from the chapter
      const keyVerses = bibleVerses.filter(v => [1, 14, 29].includes(v.verse)) // John 1:1, 1:14, 1:29 are key verses
      keyVerses.forEach(verse => {
        if (!items.find(item => item.id === `verse-${bibleParams.bookName}-${bibleParams.chapterNumber}-${verse.verse}`)) {
          items.push({
            id: `key-verse-${bibleParams.bookName}-${bibleParams.chapterNumber}-${verse.verse}`,
            title: `${bibleParams.bookName} ${bibleParams.chapterNumber}:${verse.verse} (Key Verse)`,
            content: verse.text,
            category: 'bible-verse',
            date: new Date().toISOString().split('T')[0],
            tags: ['bible-verse', 'key-verse', 'scripture', bibleParams.bookName.toLowerCase(), bibleParams.version.toLowerCase()],
            shareCount: Math.floor(Math.random() * 80) + 20, // Higher share count for key verses
            scripture: `${bibleParams.bookName} ${bibleParams.chapterNumber}:${verse.verse} (${bibleParams.version})`
          })
        }
      })
    }

    // Add hymns
    if (hymns && Array.isArray(hymns)) {
      hymns.forEach(hymn => {
        const hymnContent = hymn.stanzas?.map(stanza => stanza.text).join('\n\n') ||
          (hymn.chorus ? `Chorus:\n${hymn.chorus}` : '')

        items.push({
          id: `hymn-${hymn.id}`,
          title: hymn.title,
          content: hymnContent,
          category: 'hymn',
          date: hymn.last_updated ? hymn.last_updated.split('T')[0] : new Date().toISOString().split('T')[0],
          author: hymn.author,
          tags: ['hymn', 'worship', 'music', hymn.year?.toString()].filter(Boolean),
          shareCount: hymn.shareCount || Math.floor(Math.random() * 40) + 5,
          lastShared: hymn.lastShared
        })
      })
    }

    // Add prayers
    if (prayers && Array.isArray(prayers)) {
      prayers.forEach(prayer => {
        items.push({
          id: `prayer-${prayer.id}`,
          title: `${prayer.prayer_category.charAt(0).toUpperCase() + prayer.prayer_category.slice(1)} Prayer`,
          content: prayer.prayer,
          category: 'prayer',
          date: prayer.last_updated ? prayer.last_updated.split('T')[0] : new Date().toISOString().split('T')[0],
          tags: ['prayer', prayer.prayer_category, prayer.featured ? 'featured' : null].filter(Boolean),
          shareCount: prayer.shareCount || Math.floor(Math.random() * 35) + 8,
          lastShared: prayer.lastShared,
          scripture: prayer.prayer_scripture
        })
      })
    }

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [todayDevotion, hymns, prayers, bibleVerses])


  // Mock share stats (you can replace with actual API call later)
  const shareStats: ShareStats = useMemo(() => ({
    totalShares: contentItems.reduce((sum, item) => sum + item.shareCount, 0),
    weeklyShares: Math.floor(contentItems.reduce((sum, item) => sum + item.shareCount, 0) * 0.08), // Mock calculation
    topPlatform: 'Facebook',
    engagementRate: 8.7
  }), [contentItems])

  // Filter content items
  useEffect(() => {
    let filtered = contentItems

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [contentItems, selectedCategory, searchQuery])

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setPaginatedItems(filteredItems.slice(startIndex, endIndex))
  }, [filteredItems, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of content area
    const contentElement = document.getElementById('content-grid')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleShare = (item: ContentItem) => {
    setSelectedItem(item)

    // Auto-select appropriate template based on content type
    if (shareTemplates && Array.isArray(shareTemplates)) {
      const appropriateTemplate = shareTemplates.find((template: any) => {
        if (item.category === 'bible-verse' && template.template_type === 'verse') {
          return true
        }
        // Add more template matching logic here
        return false
      })

      setSelectedTemplate(appropriateTemplate || shareTemplates[0] || null)
    }

    setShowShareModal(true)
  }

  const handleRefresh = () => {
    refetchDevotion()
    refetchHymns()
    refetchPrayers()
    refetchTemplates()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bible-verse': return BookOpen
      case 'prayer': return Heart
      case 'hymn': return Music
      case 'devotion': return MessageCircle
      case 'share-template': return Share2
      default: return BookOpen
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bible-verse': return 'text-blue-600 bg-blue-50'
      case 'prayer': return 'text-rose-600 bg-rose-50'
      case 'hymn': return 'text-purple-600 bg-purple-50'
      case 'devotion': return 'text-green-600 bg-green-50'
      case 'share-template': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return Facebook
      case 'twitter': return Twitter
      case 'instagram': return Instagram
      case 'whatsapp': return MessageSquare
      default: return Share2
    }
  }

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: contentItems.length },
    { value: 'devotion', label: 'Devotions', count: contentItems.filter(i => i.category === 'devotion').length },
    { value: 'bible-verse', label: 'Bible Verses', count: contentItems.filter(i => i.category === 'bible-verse').length },
    { value: 'prayer', label: 'Prayers', count: contentItems.filter(i => i.category === 'prayer').length },
    { value: 'hymn', label: 'Hymns', count: contentItems.filter(i => i.category === 'hymn').length },
  ]

  // Mock recent shares (you can replace with actual API call)
  const recentShares = [
    { platform: 'Facebook', content: contentItems[0]?.title || 'Recent content', time: '2 hours ago', engagement: '45 likes, 12 shares' },
    { platform: 'Instagram', content: contentItems[1]?.title || 'Recent content', time: '4 hours ago', engagement: '89 likes, 23 comments' },
    { platform: 'Twitter', content: contentItems[2]?.title || 'Recent content', time: '6 hours ago', engagement: '34 retweets, 67 likes' },
    { platform: 'WhatsApp', content: contentItems[3]?.title || 'Recent content', time: '1 day ago', engagement: 'Shared to 5 groups' }
  ]

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = []
    const showEllipsis = totalPages > 7

    if (showEllipsis) {
      items.push(1)

      if (currentPage > 4) {
        items.push('ellipsis-start')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!items.includes(i)) {
          items.push(i)
        }
      }

      if (currentPage < totalPages - 3) {
        items.push('ellipsis-end')
      }

      if (totalPages > 1) {
        items.push(totalPages)
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    }

    return items
  }

  const handleBibleParamsChange = useCallback((newParams: Partial<typeof bibleParams>) => {
    setBibleParams(prev => ({ ...prev, ...newParams }))
  }, [])

  const BibleSelector = useCallback(() => (
    <Card className="shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="text-lg" style={{ color: '#0088DD' }}>Bible Chapter Selection</CardTitle>
        <CardDescription>Choose a specific Bible chapter to include in your shareable content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Version</label>
            <Select value={bibleParams.version} onValueChange={(value) => handleBibleParamsChange({ version: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KJV">King James Version</SelectItem>
                <SelectItem value="AMP">Amplified Version</SelectItem>
                <SelectItem value="ASV">American Standard Version</SelectItem>
                <SelectItem value="NIV">New International Version</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Book</label>
            <Select
              value={bibleParams.bookName}
              onValueChange={(value) => handleBibleParamsChange({ bookName: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select book" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50">Old Testament</div>
                {allBibleBooks.slice(0, 39).map((book) => (
                  <SelectItem key={book.abbreviation} value={book.name}>
                    {book.name}
                  </SelectItem>
                ))}
                <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50 border-t">New Testament</div>
                {allBibleBooks.slice(39).map((book) => (
                  <SelectItem key={book.abbreviation} value={book.name}>
                    {book.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Chapter</label>
            <Input
              type="number"
              min="1"
              placeholder="Chapter number"
              value={bibleParams.chapterNumber}
              onChange={(e) => handleBibleParamsChange({ chapterNumber: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        {bibleVerses && bibleVerses?.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Loaded {bibleVerses?.length} verses from {bibleParams.bookName} Chapter {bibleParams.chapterNumber} ({bibleParams.version})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  ), [bibleParams, bibleVerses, handleBibleParamsChange])


  if (hasError) {
    return (
      <div className="space-y-6">
        <Card className="shadow-sm border-red-200">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Error Loading Content</h3>
              <p className="mt-1 text-sm text-gray-500">
                There was an error loading your content. Please try again.
              </p>
              <Button onClick={handleRefresh} className="mt-4" style={{ backgroundColor: '#0088DD' }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0088DD' }}>Social Media Sharing</h1>
          <p className="text-gray-600 text-sm">Share spiritual content across social media platforms</p>
        </div>
        {/* <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="border-2"
            style={{ borderColor: '#0088DD', color: '#0088DD' }}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Shares</CardTitle>
            <Share2 className="h-4 w-4" style={{ color: '#0088DD' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#0088DD' }}>
              {shareStats.totalShares.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#0088DD' }}>
              {shareStats.weeklyShares.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Platform</CardTitle>
            <Facebook className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#0088DD' }}>
              {shareStats.topPlatform}
            </div>
            <p className="text-xs text-gray-600">
              45% of total shares
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Engagement</CardTitle>
            <BarChart3 className="h-4 w-4" style={{ color: '#FB9604' }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: '#0088DD' }}>
              {shareStats.engagementRate}%
            </div>
            <p className="text-xs text-gray-600">
              Average engagement rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <BibleSelector />
      </div>

      {/* Available Templates Section */}
      {shareTemplates && shareTemplates.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#0088DD' }}>
              <Palette className="h-5 w-5" />
              Available Templates
            </CardTitle>
            <CardDescription>Choose a template style for your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shareTemplates.map((template: any) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:scale-105 ${selectedTemplate?.id === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                    }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  {/* Template Preview */}
                  <div
                    className="w-full h-24 rounded-lg mb-3 flex items-center justify-center text-white text-xs font-medium relative overflow-hidden"
                    style={{
                      background: template.gradient_colors
                        ? `linear-gradient(45deg, ${template.gradient_colors.join(', ')})`
                        : template.background,
                    }}
                  >
                    <div className="text-center">
                      <div style={{ color: template.text_color }}>
                        Sample Text
                      </div>
                      <div className="text-xs opacity-75" style={{ color: template.text_color }}>
                        Bible Verse
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium text-sm text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-500 capitalize">{template.template_type} template</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Share Content Tab */}
        <TabsContent value="share" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: '#0088DD' }}>Find Content to Share</CardTitle>
              <CardDescription>Search and filter your content for social media sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search content, titles, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-64">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {option.count}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results summary */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="mt-4 text-sm text-gray-600">
                  Showing {filteredItems.length} results
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categoryOptions.find(c => c.value === selectedCategory)?.label}`}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div id="content-grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <Card key={i} className="shadow-sm animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : paginatedItems.length === 0 ? (
                <div className="col-span-full">
                  <Card className="shadow-sm">
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No content found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Try adjusting your search or filter criteria.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                paginatedItems.map((item) => {
                  const Icon = getCategoryIcon(item.category)
                  const categoryColor = getCategoryColor(item.category)

                  return (
                    <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow group">
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-lg ${categoryColor.split(' ')[1]}`}>
                            <Icon className={`h-4 w-4 ${categoryColor.split(' ')[0]}`} />
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {item.category.replace('-', ' ')}
                          </Badge>
                        </div>

                        <CardTitle className="text-lg leading-tight line-clamp-2" style={{ color: '#0088DD' }}>
                          {item.title}
                        </CardTitle>

                        <CardDescription className="line-clamp-3">
                          {item.content.substring(0, 120)}...
                        </CardDescription>

                        {item.scripture && (
                          <div className="text-xs text-gray-600 italic">
                            {item.scripture}
                          </div>
                        )}
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Meta information */}
                        <div className="flex justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Share2 className="h-3 w-3" />
                            <span>{item.shareCount} shares</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Share Button */}
                        <Button
                          className="w-full text-white hover:opacity-90"
                          style={{ backgroundColor: '#0088DD' }}
                          onClick={() => handleShare(item)}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share to Social Media
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {!isLoading && filteredItems.length > 0 && totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) {
                            handlePageChange(currentPage - 1)
                          }
                        }}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {generatePaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (typeof item === 'number') {
                                handlePageChange(item)
                              }
                            }}
                            isActive={currentPage === item}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) {
                            handlePageChange(currentPage + 1)
                          }
                        }}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Social Share Modal */}
      {showShareModal && selectedItem && (
        <SocialShareModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false)
            setSelectedItem(null)
            setSelectedTemplate(null)
          }}
          contentItem={selectedItem}
          selectedTemplate={selectedTemplate}
          shareTemplates={shareTemplates || []}
          onTemplateSelect={setSelectedTemplate}
          onShareSuccess={(platform) => {
            console.log(`Content shared to ${platform}`)
            // You can add analytics tracking here
            // trackShare(selectedItem.id, platform)

            // Optionally close the modal after successful share
            // setShowShareModal(false)
          }}
        />
      )}
    </div>
  )
}