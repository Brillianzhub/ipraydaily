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
  ArrowUpRight
} from 'lucide-react'

interface DashboardStats {
  totalContent: number
  bibleVerses: number
  prayers: number
  hymns: number
  devotions: number
  totalShares: number
  weeklyGrowth: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContent: 0,
    bibleVerses: 0,
    prayers: 0,
    hymns: 0,
    devotions: 0,
    totalShares: 0,
    weeklyGrowth: 0
  })

  useEffect(() => {
    // Simulate fetching dashboard stats
    setTimeout(() => {
      setStats({
        totalContent: 2847,
        bibleVerses: 1203,
        prayers: 586,
        hymns: 342,
        devotions: 716,
        totalShares: 15432,
        weeklyGrowth: 12.5
      })
    }, 500)
  }, [])

  const contentCards = [
    {
      title: 'Bible Verses',
      count: stats.bibleVerses,
      icon: BookOpen,
      description: 'Daily scripture verses',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Prayers',
      count: stats.prayers,
      icon: Heart,
      description: 'Prayer requests & templates',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      title: 'Hymns',
      count: stats.hymns,
      icon: Music,
      description: 'Traditional & modern hymns',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Devotions',
      count: stats.devotions,
      icon: MessageCircle,
      description: 'Daily spiritual reflections',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-teal-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Content</CardTitle>
              <Users className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-800">
                {stats.totalContent.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Social Shares</CardTitle>
              <Share2 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-800">
                {stats.totalShares.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">
                Total platform shares
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Weekly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-800">
                +{stats.weeklyGrowth}%
              </div>
              <p className="text-xs text-gray-600">
                Engagement increase
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Categories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-teal-800">Content Categories</h2>
            <Button variant="outline" size="sm" className="text-teal-700 border-teal-200 hover:bg-teal-50">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentCards.map((card) => (
              <Card key={card.title} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-teal-800">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-teal-800">
                      {card.count.toLocaleString()}
                    </div>
                    <CardDescription>{card.description}</CardDescription>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-teal-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-24 bg-teal-700 hover:bg-teal-800 text-white justify-start flex-col">
              <Share2 className="h-6 w-6 mb-2" />
              <span>Share to Social Media</span>
            </Button>
            
            <Button variant="outline" className="h-24 justify-start flex-col opacity-50 cursor-not-allowed">
              <Users className="h-6 w-6 mb-2" />
              <span>Send Email Notifications</span>
              <Badge variant="secondary" className="text-xs mt-1">Coming Soon</Badge>
            </Button>
            
            <Button variant="outline" className="h-24 justify-start flex-col opacity-50 cursor-not-allowed">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span>Update App Notifications</span>
              <Badge variant="secondary" className="text-xs mt-1">Coming Soon</Badge>
            </Button>
          </div>
        </div>
      </div>
  )
}