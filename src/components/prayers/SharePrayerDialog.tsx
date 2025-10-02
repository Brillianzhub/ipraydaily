"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useRef, useState } from "react";

export const SharePrayerDialog = ({ prayer, isOpen, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('Heavenly Blue');
    const [isGenerating, setIsGenerating] = useState(false);
    const previewRef = useRef(null);

    const categoryDisplayNames = {
        'advancement': 'Advancement',
        'healing': 'Healing & Comfort',
        'dominion': 'Dominion & Authority',
        'deliverance': 'Deliverance & Freedom',
        'provision': 'Provision & Blessing',
        'peace': 'Peace & Rest',
        'faith': 'Faith & Trust',
        'wisdom': 'Wisdom & Direction',
        'protection': 'Protection & Safety',
        'favor': 'Divine Favor',
        'strength': 'Strength & Power',
        'joy': 'Joy & Celebration',
        'guidance': 'Guidance & Direction',
        'courage': 'Courage & Boldness',
        'spiritual growth': 'Spiritual Growth',
        'anointing': 'Anointing & Ministry',
        'victory': 'Victory & Triumph',
        'righteousness': 'Righteousness & Holiness',
        'restoration': 'Restoration & Renewal',
        'purpose': 'Purpose & Destiny',
        'promotion': 'Promotion & Elevation',
        'blessing': 'Blessing & Abundance',
        'breakthrough': 'Breakthrough & Liberation',
        'emotional healing': 'Emotional Healing',
        'fulfillment': 'Fulfillment & Completion',
        'salvation': 'Salvation & Redemption',
        'soul winning': 'Soul Winning',
        'transformation': 'Transformation & Change',
        'churches': 'Church & Ministry',
        'nations': 'Nations & Revival',
        'revival': 'Revival & Awakening',
        'love': 'Love & Relationships',
        'gratitude': 'Gratitude & Thanksgiving',
        'family': 'Family & Relationships',
        'thanksgiving': 'Thanksgiving & Praise',
        'marriage': 'Marriage & Unity',
        'trials': 'Trials & Challenges',
        'speed': 'Divine Speed',
        'increase': 'Increase & Growth',
        'power': 'Power & Authority',
        'glory': 'Glory & Honor',
        'prophecy fulfilment': 'Prophecy & Fulfillment',
        'spiritual warfare': 'Spiritual Warfare',
        'surrender': 'Surrender & Commitment',
        'concecretion': 'Consecration & Dedication',
        'uncategorized': 'General Prayers'
    };

    if (!prayer) return null;

    const categoryDisplay = categoryDisplayNames[prayer.prayer_category] || prayer.prayer_category;
    const prayerTitle = `Prayer for ${categoryDisplay}`;

    // Template styles
    const templates = {
        'Heavenly Blue': {
            bg: 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-blue-100',
            scripture: 'text-blue-50',
            downloadBg: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #22d3ee 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#dbeafe'
        },
        'Golden Dawn': {
            bg: 'bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-300',
            border: 'border-transparent',
            text: 'text-gray-900',
            accent: 'text-amber-900',
            scripture: 'text-orange-900',
            downloadBg: 'linear-gradient(135deg, #fbbf24 0%, #fb923c 50%, #fde047 100%)',
            downloadText: '#1f2937',
            downloadAccent: '#78350f'
        },
        'Royal Purple': {
            bg: 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-purple-100',
            scripture: 'text-pink-100',
            downloadBg: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #ec4899 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#f3e8ff'
        },
        'Forest Green': {
            bg: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-400',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-emerald-100',
            scripture: 'text-teal-50',
            downloadBg: 'linear-gradient(135deg, #059669 0%, #22c55e 50%, #2dd4bf 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#d1fae5'
        },
        'Sunset Orange': {
            bg: 'bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-rose-100',
            scripture: 'text-orange-50',
            downloadBg: 'linear-gradient(135deg, #f43f5e 0%, #f97316 50%, #fbbf24 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#ffe4e6'
        },
        'Midnight Navy': {
            bg: 'bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-slate-300',
            scripture: 'text-blue-200',
            downloadBg: 'linear-gradient(135deg, #1e293b 0%, #1e3a8a 50%, #312e81 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#cbd5e1'
        },
        'Clean White': {
            bg: 'bg-white',
            border: 'border-gray-200',
            text: 'text-gray-900',
            accent: 'text-gray-600',
            scripture: 'text-gray-700',
            downloadBg: '#ffffff',
            downloadText: '#111827',
            downloadAccent: '#4b5563'
        },
        'Ocean Deep': {
            bg: 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-cyan-100',
            scripture: 'text-blue-100',
            downloadBg: 'linear-gradient(135deg, #0891b2 0%, #2563eb 50%, #4f46e5 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#cffafe'
        },
        'Warm Coral': {
            bg: 'bg-gradient-to-br from-pink-400 via-rose-400 to-red-400',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-pink-100',
            scripture: 'text-rose-50',
            downloadBg: 'linear-gradient(135deg, #f472b6 0%, #fb7185 50%, #f87171 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#fce7f3'
        }
    };

    const currentTemplate = templates[selectedTemplate];

    // Generate share text
    const shareText = `🙏 ${prayerTitle}\n\n"${prayer.prayer_scripture}"\n\n${prayer.prayer}\n\n- ${prayer.prayer_scripture}`;

    // Download function
    const downloadAsImage = async () => {
        setIsGenerating(true);
        try {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions (Instagram square format)
            const width = 1080;
            const height = 1080;
            canvas.width = width;
            canvas.height = height;

            // Set background
            if (selectedTemplate === 'Heavenly Blue') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#2563eb');
                gradient.addColorStop(0.5, '#3b82f6');
                gradient.addColorStop(1, '#22d3ee');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Golden Dawn') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#fbbf24');
                gradient.addColorStop(0.5, '#fb923c');
                gradient.addColorStop(1, '#fde047');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Royal Purple') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#9333ea');
                gradient.addColorStop(0.5, '#a855f7');
                gradient.addColorStop(1, '#ec4899');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Forest Green') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#059669');
                gradient.addColorStop(0.5, '#22c55e');
                gradient.addColorStop(1, '#2dd4bf');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Sunset Orange') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#f43f5e');
                gradient.addColorStop(0.5, '#f97316');
                gradient.addColorStop(1, '#fbbf24');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Midnight Navy') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#1e293b');
                gradient.addColorStop(0.5, '#1e3a8a');
                gradient.addColorStop(1, '#312e81');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Ocean Deep') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#0891b2');
                gradient.addColorStop(0.5, '#2563eb');
                gradient.addColorStop(1, '#4f46e5');
                ctx.fillStyle = gradient;
            } else if (selectedTemplate === 'Warm Coral') {
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#f472b6');
                gradient.addColorStop(0.5, '#fb7185');
                gradient.addColorStop(1, '#f87171');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = currentTemplate.downloadBg;
            }
            ctx.fillRect(0, 0, width, height);

            // Set text properties
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';

            // Title
            ctx.fillStyle = currentTemplate.downloadText;
            ctx.font = 'bold 48px Arial, sans-serif';
            const titleLines = wrapText(ctx, prayerTitle, width - 120, 48);
            let yPos = 80;
            titleLines.forEach(line => {
                ctx.fillText(line, 60, yPos);
                yPos += 60;
            });

            // Scripture reference
            yPos += 20;
            ctx.fillStyle = currentTemplate.downloadAccent;
            ctx.font = 'italic 32px Arial, sans-serif';
            ctx.fillText(`"${prayer.prayer_scripture}"`, 60, yPos);
            yPos += 80;

            // Prayer text
            ctx.fillStyle = currentTemplate.downloadText;
            ctx.font = '36px Arial, sans-serif';
            const prayerLines = wrapText(ctx, prayer.prayer, width - 120, 36);
            prayerLines.forEach(line => {
                if (yPos < height - 150) { // Leave space for attribution
                    ctx.fillText(line, 60, yPos);
                    yPos += 50;
                }
            });

            // Attribution at bottom
            ctx.fillStyle = currentTemplate.downloadAccent;
            ctx.font = 'bold 32px Arial, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`- ${prayer.prayer_scripture}`, width - 60, height - 80);

            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `prayer-${categoryDisplay.toLowerCase().replace(/\s+/g, '-')}-${selectedTemplate.toLowerCase().replace(/\s+/g, '-')}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/png');

        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error generating image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper function to wrap text
    const wrapText = (ctx, text, maxWidth, lineHeight) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // Social sharing functions
    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToTwitter = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
    };

    const shareToInstagram = () => {
        navigator.clipboard.writeText(shareText);
        alert('Prayer copied to clipboard! You can now paste it on Instagram.');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            alert('Prayer copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy to clipboard. Please try again.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Share Prayer</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Prayer Title */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{prayerTitle}</h3>
                        <p className="text-sm text-gray-600 italic">&quot;{prayer.prayer_scripture}&quot;</p>
                    </div>

                    {/* Template Selection */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Choose a Template</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.keys(templates).map((template) => (
                                <button
                                    key={template}
                                    onClick={() => setSelectedTemplate(template)}
                                    className={`p-3 rounded-lg border-2 transition-all ${selectedTemplate === template
                                        ? 'border-[#0284C7] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-full h-20 rounded ${templates[template].bg} ${templates[template].border} border mb-2 flex items-center justify-center`}>
                                        <span className={`text-2xl font-semibold ${templates[template].text}`}>
                                            Aa
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 block text-center">{template}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Prayer Preview */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                        <div ref={previewRef} className={`p-6 rounded-lg border-2 ${currentTemplate.bg} ${currentTemplate.border}`}>
                            <div className="space-y-4">
                                <div>
                                    <h3 className={`text-lg font-bold ${currentTemplate.text}`}>
                                        {prayerTitle}
                                    </h3>
                                    <p className={`text-sm ${currentTemplate.accent} italic`}>
                                        &quot;{prayer.prayer_scripture}&quot;
                                    </p>
                                </div>

                                <div>
                                    <p className={`${currentTemplate.text} leading-relaxed`}>
                                        {prayer.prayer}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className={`${currentTemplate.scripture} font-semibold`}>
                                        - {prayer.prayer_scripture}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Download Section */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Download</h4>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={downloadAsImage}
                                disabled={isGenerating}
                                className="flex items-center justify-center gap-2 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download as Image (PNG)
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Share Buttons */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Share via Social Media</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={shareToFacebook}
                                className="flex items-center justify-center gap-2 p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                                Facebook
                            </button>

                            <button
                                onClick={shareToTwitter}
                                className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                                Twitter
                            </button>

                            <button
                                onClick={shareToInstagram}
                                className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#E4405F] via-[#F56040] to-[#FFDC80] text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <Instagram className="w-5 h-5" />
                                Instagram
                            </button>

                            <button
                                onClick={shareToWhatsApp}
                                className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};