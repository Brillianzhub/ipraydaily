'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Download,
  Copy,
  Palette,
  Type,
  Image,
  Check
} from 'lucide-react'

interface ContentData {
  title: string
  description: string
  scripture?: string
  category: string
  tags: string[]
}

interface SocialShareModalProps {
  isOpen: boolean
  onClose: () => void
  content: ContentData
  onShareSuccess?: (platform: string) => void
}

interface SocialTemplate {
  id: string
  name: string
  type: 'text' | 'image' | 'card'
  description: string
  preview: string
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
}

const socialTemplates: SocialTemplate[] = [
  {
    id: 'simple-text',
    name: 'Simple Text',
    type: 'text',
    description: 'Clean text format perfect for Twitter and Facebook',
    preview: 'Plain text with hashtags',
    textColor: '#1f2937'
  },
  {
    id: 'elegant-card',
    name: 'Elegant Card',
    type: 'card',
    description: 'Styled card with background and branding',
    preview: 'Card with colored background',
    backgroundColor: '#0088DD',
    textColor: '#ffffff'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    type: 'card',
    description: 'Clean white card with subtle styling',
    preview: 'Minimal white card design',
    backgroundColor: '#ffffff',
    textColor: '#1f2937'
  },
  {
    id: 'warm-gradient',
    name: 'Warm Gradient',
    type: 'card',
    description: 'Gradient background with warm colors',
    preview: 'Gradient blue to darker blue',
    backgroundColor: 'linear-gradient(135deg, #0088DD 0%, #0066BB 100%)',
    textColor: '#ffffff'
  }
]

const socialPlatforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600 hover:bg-blue-700',
    maxLength: 2200
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    color: 'bg-black hover:bg-gray-800',
    maxLength: 280
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    maxLength: 2200
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-600 hover:bg-green-700',
    maxLength: 4096
  }
]

export function SocialShareModal({ isOpen, onClose, content, onShareSuccess }: SocialShareModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(socialTemplates[0])
  const [customText, setCustomText] = useState('')
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('template')

  const generateShareText = (platform: string) => {
    const baseText = customText || `${content.title}\n\n${content.description}`
    const hashtags = content.tags?.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') || ''
    const scripture = content.scripture ? `\n\n${content.scripture}` : ''
    const branding = '\n\n🙏 #IprayDaily'

    let shareText = `${baseText}${scripture}${branding} ${hashtags}`

    // Trim to platform limits
    const platformData = socialPlatforms.find(p => p.id === platform)
    if (platformData && shareText.length > platformData.maxLength) {
      shareText = shareText.substring(0, platformData.maxLength - 3) + '...'
    }

    return shareText
  }

  const handleCopyText = async (platform: string) => {
    const text = generateShareText(platform)
    await navigator.clipboard.writeText(text)
    setCopiedPlatform(platform)
    setTimeout(() => setCopiedPlatform(null), 2000)
  }

  const handleShare = (platform: string) => {
    const text = generateShareText(platform)
    const encodedText = encodeURIComponent(text)

    let url = ''
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}`
        break
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}`
        break
      default:
        handleCopyText(platform)
        return
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
      onShareSuccess?.(platform)
    }
  }

  const renderTemplatePreview = (template: SocialTemplate) => {
    const sampleText = `${content.title}\n\n${content.description.substring(0, 100)}...`

    if (template.type === 'text') {
      return (
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-sm text-gray-600 font-mono whitespace-pre-wrap">
            {sampleText}
          </p>
        </div>
      )
    }

    return (
      <div
        className="p-6 rounded-lg text-center"
        style={{
          background: template.backgroundColor,
          color: template.textColor
        }}
      >
        <div className="space-y-3">
          <h3 className="font-bold text-lg">{content.title}</h3>
          <p className="text-sm opacity-90 line-clamp-3">
            {content.description}
          </p>
          {content.scripture && (
            <p className="text-xs opacity-75">{content.scripture}</p>
          )}
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-xs opacity-80">
              IprayDaily
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl" style={{ color: '#0088DD' }}>Share to Social Media</DialogTitle>
          <DialogDescription>
            Choose a template and platform to share "{content.title}"
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Template
            </TabsTrigger>
            {/* <TabsTrigger value="customize" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Customize
            </TabsTrigger> */}
            <TabsTrigger value="share" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Share
            </TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-6">
            <div>
              <Label className="text-base font-medium" style={{ color: '#0088DD' }}>Choose Template</Label>
              <p className="text-sm text-gray-600">Select how you want your content to appear</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${selectedTemplate.id === template.id
                      ? 'ring-2 shadow-lg'
                      : 'hover:shadow-md'
                    }`}
                  style={{
                    ringColor: selectedTemplate.id === template.id ? '#0088DD' : 'transparent'
                  }}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.type === 'card' ? (
                        <Image className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Type className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderTemplatePreview(template)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="customize" className="space-y-6">
            <div>
              <Label className="text-base font-medium" style={{ color: '#0088DD' }}>Customize Text</Label>
              <p className="text-sm text-gray-600">Edit the text that will be shared (optional)</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-text">Share Text</Label>
                <Textarea
                  id="custom-text"
                  placeholder={`${content.title}\n\n${content.description}`}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to use original content. Text will be automatically formatted for each platform.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-700">Content Info</p>
                  <div className="text-xs text-gray-500 space-y-1 mt-1">
                    <p>Category: {content.category}</p>
                    {content.scripture && <p>Scripture: {content.scripture}</p>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {content.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent> */}

          <TabsContent value="share" className="space-y-6">
            <div>
              <Label className="text-base font-medium" style={{ color: '#0088DD' }}>Share to Platforms</Label>
              <p className="text-sm text-gray-600">Choose where to share your content</p>
            </div>

            {/* Selected template preview */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-sm text-gray-700">Preview: {selectedTemplate.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderTemplatePreview(selectedTemplate)}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                const shareText = generateShareText(platform.id)
                const isCopied = copiedPlatform === platform.id

                return (
                  <Card key={platform.id} className="shadow-sm">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${platform.color.split(' ')[0]} text-white`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{platform.name}</h3>
                              <p className="text-xs text-gray-500">
                                Max {platform.maxLength} characters
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {shareText.length}/{platform.maxLength}
                          </Badge>
                        </div>

                        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border max-h-20 overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans">
                            {shareText.substring(0, 150)}
                            {shareText.length > 150 && '...'}
                          </pre>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleShare(platform.id)}
                            className={`flex-1 ${platform.color} text-white`}
                            size="sm"
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            Share
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyText(platform.id)}
                            className="px-3"
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {selectedTemplate.type === 'card' && (
              <Card style={{ backgroundColor: '#E6F7FF', borderColor: '#0088DD' }}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" style={{ color: '#0088DD' }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: '#0088DD' }}>
                        Download as Image
                      </p>
                      <p className="text-xs" style={{ color: '#0066BB' }}>
                        Save the styled card as an image for Instagram or other platforms
                      </p>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Download
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Soon
                      </Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setActiveTab('template')
              }}
              disabled={activeTab === 'template'}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                setActiveTab('share')
              }}
              disabled={activeTab === 'share'}
              className="text-white hover:opacity-90"
              style={{ backgroundColor: '#0088DD' }}
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}