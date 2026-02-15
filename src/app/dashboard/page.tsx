/* eslint-disable */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Heart,
  Music,
  MessageCircle,
  Users,
  Share2,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  FileText,
  Mic
} from 'lucide-react'
import PrivateRoute from '@/components/admin/PrivateRoutes'
import { api } from '@/services/requests/axiosInstance'

interface FeatureStats {
  period: number
  feature: string
  total: number
  change: number | null
  change_percent: number | null
}

interface DashboardStats {
  totalContent: number
  bibleVerses: number
  prayers: number
  hymns: number
  devotions: number
  sermons: number
  notes: number
  totalShares: number
  weeklyGrowth: number
}

type Period = 'day' | 'week' | 'month' | 'year'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContent: 0,
    bibleVerses: 0,
    prayers: 0,
    hymns: 0,
    devotions: 0,
    sermons: 0,
    notes: 0,
    totalShares: 0,
    weeklyGrowth: 0
  })
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeatureStats()
  }, [selectedPeriod])

  const fetchFeatureStats = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.get(`/stats/feature-clicks/?period=${selectedPeriod}`)
      const featureData: FeatureStats[] = response.data
      
      // Map API data to dashboard stats
      let totalClicks = 0
      const newStats: Partial<DashboardStats> = {
        bibleVerses: 0,
        prayers: 0,
        hymns: 0,
        devotions: 0,
        sermons: 0,
        notes: 0
      }

      featureData.forEach((item) => {
        totalClicks += item.total
        
        switch (item.feature.toLowerCase()) {
          case 'bible':
            newStats.bibleVerses = item.total
            break
          case 'prayer':
            newStats.prayers = item.total
            break
          case 'hymns':
            newStats.hymns = item.total
            break
          case 'devotion':
            newStats.devotions = item.total
            break
          case 'sermons':
            newStats.sermons = item.total
            break
          case 'notes':
            newStats.notes = item.total
            break
        }
      })

      // Calculate average growth from change_percent
      const itemsWithGrowth = featureData.filter(item => item.change_percent !== null)
      const avgGrowth = itemsWithGrowth.length > 0
        ? itemsWithGrowth.reduce((sum, item) => sum + (item.change_percent || 0), 0) / itemsWithGrowth.length
        : 0

      setStats({
        totalContent: totalClicks,
        bibleVerses: newStats.bibleVerses!,
        prayers: newStats.prayers!,
        hymns: newStats.hymns!,
        devotions: newStats.devotions!,
        sermons: newStats.sermons!,
        notes: newStats.notes!,
        totalShares: totalClicks * 3, // Estimate based on clicks
        weeklyGrowth: Math.round(avgGrowth * 10) / 10
      })
    } catch (err) {
      console.error('Error fetching feature stats:', err)
      setError('Failed to load statistics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contentCards = [
    {
      title: 'Bible Verses',
      count: stats.bibleVerses,
      icon: BookOpen,
      description: 'Daily scripture clicks',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Prayers',
      count: stats.prayers,
      icon: Heart,
      description: 'Prayer feature usage',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      title: 'Hymns',
      count: stats.hymns,
      icon: Music,
      description: 'Hymn selections',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Devotions',
      count: stats.devotions,
      icon: MessageCircle,
      description: 'Daily devotion reads',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Sermons',
      count: stats.sermons,
      icon: Mic,
      description: 'Sermon interactions',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Notes',
      count: stats.notes,
      icon: FileText,
      description: 'User notes created',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ]

  const periodButtons: { label: string; value: Period }[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ]

  return (
    <PrivateRoute>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#0c4b6e' }}>Dashboard Overview</h1>
            <p className="text-gray-600">Track feature usage and engagement metrics.</p>
          </div>
          
          {/* Period Selector */}
          <div className="flex gap-2">
            {periodButtons.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
                className={selectedPeriod === period.value ? 'bg-[#0c4b6e] hover:bg-[#0c4b6e]/90' : 'border-[#0c4b6e]/20 hover:bg-[#0c4b6e]/5'}
                style={selectedPeriod === period.value ? {} : { color: '#0c4b6e' }}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="shadow-sm border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-sm animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Interactions</CardTitle>
                  <Users className="h-4 w-4" style={{ color: '#0c4b6e' }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: '#0c4b6e' }}>
                    {stats.totalContent.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">
                    Across all features
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Estimated Shares</CardTitle>
                  <Share2 className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: '#0c4b6e' }}>
                    {stats.totalShares.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">
                    Based on engagement
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
                  <TrendingUp className={`h-4 w-4 ${stats.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: '#0c4b6e' }}>
                    {stats.weeklyGrowth > 0 ? '+' : ''}{stats.weeklyGrowth}%
                  </div>
                  <p className="text-xs text-gray-600">
                    Period over period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Content Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0c4b6e' }}>Feature Performance</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentCards.map((card) => (
                  <Card key={card.title} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <CardHeader className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg ${card.bgColor}`}>
                          <card.icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#0c4b6e] transition-colors" />
                      </div>
                      <CardTitle className="text-lg font-semibold" style={{ color: '#0c4b6e' }}>
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold" style={{ color: '#0c4b6e' }}>
                          {card.count.toLocaleString()}
                        </div>
                        <CardDescription>{card.description}</CardDescription>
                        <Badge variant="secondary" className="text-xs">
                          {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </PrivateRoute>
  )
}