/* eslint-disable */

'use client'

import { useState, useEffect, useRef } from 'react'
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
  Check,
  Loader2
} from 'lucide-react'

// Updated interfaces to match your actual data structure
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
    verseText?: any
    referenceBadge?: any
    goldTexture?: any
    lightRays?: any
    ornaments?: any
    decorativeElements?: any
    [key: string]: any
  }
  created_at: string
  updated_at: string
}

interface SocialShareModalProps {
  isOpen: boolean
  onClose: () => void
  contentItem: ContentItem
  selectedTemplate: ShareTemplate | null
  shareTemplates: any
  onTemplateSelect: (template: ShareTemplate) => void
  onShareSuccess?: (platform: string) => void
  onDownloadSuccess?: (filename: string) => void
}

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

export function SocialShareModal({
  isOpen,
  onClose,
  contentItem,
  selectedTemplate,
  shareTemplates,
  onTemplateSelect,
  onShareSuccess,
  onDownloadSuccess
}: SocialShareModalProps) {
  const [customText, setCustomText] = useState(`${contentItem?.title}\n\n${contentItem.content}`)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('template')
  const [currentTemplate, setCurrentTemplate] = useState<ShareTemplate | null>(selectedTemplate)
  const [isDownloading, setIsDownloading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Update local template when prop changes
  useEffect(() => {
    setCurrentTemplate(selectedTemplate)
  }, [selectedTemplate])

  const generateShareText = (platform: string) => {
    const baseText = customText || `${contentItem?.title}\n\n${contentItem?.content}`
    const hashtags = contentItem?.tags?.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') || ''
    const scripture = contentItem?.scripture ? `\n\n${contentItem?.scripture}` : ''
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

  const handleTemplateSelect = (template: ShareTemplate) => {
    setCurrentTemplate(template)
    onTemplateSelect(template)
  }

  // Function to create canvas-based image download
  const downloadAsImage = async () => {
    if (!currentTemplate || !contentItem) return

    setIsDownloading(true)

    try {
      const canvas = canvasRef.current || document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas dimensions for high quality
      const width = 600
      const height = 800
      canvas.width = width
      canvas.height = height

      // Create gradient background if available
      let backgroundColor = currentTemplate.background || '#ffffff'
      if (currentTemplate.gradient_colors && currentTemplate.gradient_colors.length > 0) {
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        currentTemplate.gradient_colors.forEach((color, index) => {
          gradient.addColorStop(index / (currentTemplate.gradient_colors.length - 1), color)
        })
        backgroundColor = gradient as any
      }

      // Fill background
      if (typeof backgroundColor === 'string') {
        ctx.fillStyle = backgroundColor
      } else {
        ctx.fillStyle = backgroundColor
      }
      ctx.fillRect(0, 0, width, height)

      // Add border radius effect (simulate rounded corners)
      ctx.globalCompositeOperation = 'source-atop'

      // Set text properties
      ctx.fillStyle = currentTemplate.text_color || '#000000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Draw title
      const titleFontSize = 32
      ctx.font = `600 ${titleFontSize}px Arial, sans-serif`
      const titleY = height * 0.3

      // Word wrap for title
      const titleWords = contentItem.title.split(' ')
      let titleLine = ''
      let titleLineY = titleY
      const titleLineHeight = titleFontSize + 10

      for (let i = 0; i < titleWords.length; i++) {
        const testLine = titleLine + titleWords[i] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > width - 80 && i > 0) {
          ctx.fillText(titleLine, width / 2, titleLineY)
          titleLine = titleWords[i] + ' '
          titleLineY += titleLineHeight
        } else {
          titleLine = testLine
        }
      }
      ctx.fillText(titleLine, width / 2, titleLineY)

      // Draw content
      const contentFontSize = 18
      ctx.font = `400 ${contentFontSize}px Arial, sans-serif`
      ctx.globalAlpha = 0.9

      const contentY = titleLineY + 60
      const contentWords = contentItem.content.split(' ')
      let contentLine = ''
      let contentLineY = contentY
      const contentLineHeight = contentFontSize + 8
      const maxContentLines = 8
      let currentLine = 0

      for (let i = 0; i < contentWords.length && currentLine < maxContentLines; i++) {
        const testLine = contentLine + contentWords[i] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > width - 100 && contentLine !== '') {
          ctx.fillText(contentLine, width / 2, contentLineY)
          contentLine = contentWords[i] + ' '
          contentLineY += contentLineHeight
          currentLine++
        } else {
          contentLine = testLine
        }
      }
      if (currentLine < maxContentLines) {
        ctx.fillText(contentLine, width / 2, contentLineY)
        contentLineY += contentLineHeight
      }

      // Draw scripture if available
      if (contentItem.scripture) {
        ctx.globalAlpha = 1
        const scriptureY = contentLineY + 40
        ctx.font = `italic 16px Arial, sans-serif`

        // Create scripture badge background
        const scriptureMetrics = ctx.measureText(contentItem.scripture)
        const badgeWidth = scriptureMetrics.width + 40
        const badgeHeight = 32
        const badgeX = (width - badgeWidth) / 2
        const badgeYPos = scriptureY - 16

        // Draw badge background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.fillRect(badgeX, badgeYPos, badgeWidth, badgeHeight)

        // Draw scripture text
        ctx.fillStyle = currentTemplate.text_color || '#000000'
        ctx.fillText(contentItem.scripture, width / 2, scriptureY)
      }

      // Draw branding
      ctx.globalAlpha = 0.8
      const brandingY = height - 80
      ctx.font = '400 14px Arial, sans-serif'
      ctx.fillText('🙏 IprayDaily', width / 2, brandingY)

      // Create download link
      const link = document.createElement('a')
      link.download = `ipray-daily-${contentItem.category}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      onDownloadSuccess?.(link.download)
    } catch (error) {
      console.error('Error downloading image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const renderTemplatePreview = (template: ShareTemplate, forDownload = false) => {
    if (!template || !contentItem) {
      return <div className="p-4 bg-gray-100 rounded-lg">No template selected</div>
    }

    // Create the container style from template data
    const containerStyle = {
      ...template.styles.container,
      position: 'relative' as const,
      minHeight: forDownload ? '800px' : '200px',
      width: forDownload ? '600px' : 'auto',
      borderRadius: '12px',
      overflow: 'hidden',
      padding: forDownload ? '48px' : '24px',
      margin: forDownload ? '0 auto' : 'auto'
    }

    // Handle background - could be gradient or solid color
    if (template.gradient_colors && template.gradient_colors.length > 0) {
      if (template.styles.container?.background) {
        containerStyle.background = template.styles.container.background
      } else {
        containerStyle.background = `linear-gradient(45deg, ${template.gradient_colors.join(', ')})`
      }
    } else {
      containerStyle.backgroundColor = template.background || '#ffffff'
    }

    const titleFontSize = forDownload ? 32 : (template.styles.verseText?.fontSize || 20)
    const contentFontSize = forDownload ? 18 : 14
    const scriptureSize = forDownload ? 16 : 12

    return (
      <div style={containerStyle} className="relative">
        {/* Render additional texture/overlay elements if they exist */}
        {template.styles.goldTexture && (
          <div
            style={{
              ...template.styles.goldTexture,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none'
            }}
          />
        )}

        {template.styles.lightRays && (
          <div
            style={{
              ...template.styles.lightRays,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Decorative elements */}
        {template.styles.ornaments && (
          <div style={template.styles.ornaments} />
        )}

        {template.styles.decorativeElements && (
          <div style={template.styles.decorativeElements} />
        )}

        {/* Main content */}
        <div className="relative z-10 space-y-6 text-center h-full flex flex-col justify-center">
          <h3
            style={{
              color: template.text_color || '#000000',
              ...template.styles.verseText,
              fontSize: titleFontSize,
              fontWeight: template.styles.verseText?.fontWeight || '600',
              fontFamily: template.styles.verseText?.fontFamily || 'inherit',
              textAlign: template.styles.verseText?.textAlign || 'center',
              lineHeight: template.styles.verseText?.lineHeight || 1.4,
              textShadow: template.styles.verseText?.textShadow,
              letterSpacing: template.styles.verseText?.letterSpacing,
              marginBottom: forDownload ? '24px' : '16px'
            }}
          >
            {contentItem.title}
          </h3>

          <p
            style={{
              color: template.text_color || '#000000',
              fontSize: contentFontSize,
              opacity: 0.9,
              lineHeight: 1.6,
              marginBottom: forDownload ? '32px' : '16px',
              maxWidth: '90%',
              margin: '0 auto'
            }}
          >
            {forDownload ? contentItem.content : `${contentItem.content.substring(0, 150)}...`}
          </p>

          {contentItem.scripture && (
            <div
              style={{
                ...template.styles.referenceBadge,
                display: 'inline-block',
                margin: forDownload ? '24px auto' : '16px auto',
                fontSize: scriptureSize,
                padding: forDownload ? '12px 24px' : '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: template.text_color || '#000000',
                fontStyle: 'italic'
              }}
            >
              {contentItem.scripture}
            </div>
          )}

          <div className="mt-auto">
            <Badge
              variant="secondary"
              className={forDownload ? "text-lg" : "text-xs"}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: template.text_color || '#000000',
                padding: forDownload ? '8px 16px' : '4px 8px',
                fontSize: forDownload ? '14px' : '10px'
              }}
            >
              🙏 IprayDaily
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  const renderSimpleTemplateCard = (template: ShareTemplate) => {
    const style = {
      background: template.gradient_colors?.length
        ? `linear-gradient(45deg, ${template.gradient_colors.join(', ')})`
        : template.background,
      color: template.text_color,
      minHeight: '80px'
    }

    return (
      <div
        className="p-4 rounded-lg text-center text-sm"
        style={style}
      >
        <div style={{ color: template.text_color }}>
          {template.name}
        </div>
        <div
          className="text-xs opacity-75 mt-1"
          style={{ color: template.text_color }}
        >
          Sample Preview
        </div>
      </div>
    )
  }

  if (!contentItem) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl" style={{ color: '#0088DD' }}>
              Share to Social Media
            </DialogTitle>
            <DialogDescription>
              Choose a template and platform to share "{contentItem.title}"
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="template" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Template
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Customize
              </TabsTrigger>
              <TabsTrigger value="share" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Share
              </TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="space-y-6">
              <div>
                <Label className="text-base font-medium" style={{ color: '#0088DD' }}>
                  Choose Template
                </Label>
                <p className="text-sm text-gray-600">
                  Select how you want your content to appear
                </p>
              </div>

              {shareTemplates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No templates available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {shareTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all ${currentTemplate?.id === template.id
                        ? 'ring-2 ring-blue-500 shadow-lg'
                        : 'hover:shadow-md'
                        }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Image className="w-5 h-5 text-gray-400" />
                        </div>
                        <CardDescription className="text-sm capitalize">
                          {template.template_type} template
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {renderSimpleTemplateCard(template)}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="customize" className="space-y-6">
              <div>
                <Label className="text-base font-medium" style={{ color: '#0088DD' }}>
                  Customize Text
                </Label>
                <p className="text-sm text-gray-600">
                  Edit the text that will be shared (optional)
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-text">Share Text</Label>
                  <Textarea
                    id="custom-text"
                    placeholder={`${contentItem.title}\n\n${contentItem.content}`}
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
                      <p>Category: {contentItem.category}</p>
                      {contentItem.scripture && <p>Scripture: {contentItem.scripture}</p>}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {contentItem.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <div>
                <Label className="text-base font-medium" style={{ color: '#0088DD' }}>
                  Share to Platforms
                </Label>
                <p className="text-sm text-gray-600">
                  Choose where to share your content
                </p>
              </div>

              {/* Selected template preview */}
              {currentTemplate && (
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-700">
                      Preview: {currentTemplate.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderTemplatePreview(currentTemplate)}
                  </CardContent>
                </Card>
              )}

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

              {currentTemplate && (
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadAsImage}
                        disabled={isDownloading}
                        className="min-w-[100px]"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
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
                  if (activeTab === 'share') setActiveTab('customize')
                  else if (activeTab === 'customize') setActiveTab('template')
                }}
                disabled={activeTab === 'template'}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (activeTab === 'template') setActiveTab('customize')
                  else if (activeTab === 'customize') setActiveTab('share')
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

      {/* Hidden canvas for image generation */}
      <canvas
        ref={canvasRef}
        className="fixed -top-[9999px] -left-[9999px] pointer-events-none"
        style={{ opacity: 0 }}
      />
    </>
  )
}