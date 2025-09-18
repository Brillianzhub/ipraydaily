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
    const [selectedTemplate, setSelectedTemplate] = useState('Modern');
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
        'Minimalist': {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-800',
            accent: 'text-gray-600',
            scripture: 'text-gray-700',
            downloadBg: '#f9fafb',
            downloadText: '#1f2937',
            downloadAccent: '#4b5563'
        },
        'Nature': {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            accent: 'text-green-600',
            scripture: 'text-green-700',
            downloadBg: '#f0fdf4',
            downloadText: '#166534',
            downloadAccent: '#16a34a'
        },
        'Modern': {
            bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
            border: 'border-transparent',
            text: 'text-white',
            accent: 'text-purple-100',
            scripture: 'text-purple-100',
            downloadBg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            downloadText: '#ffffff',
            downloadAccent: '#e9d5ff'
        },
        'Classic': {
            bg: 'bg-slate-700',
            border: 'border-slate-600',
            text: 'text-white',
            accent: 'text-slate-300',
            scripture: 'text-slate-200',
            downloadBg: '#334155',
            downloadText: '#ffffff',
            downloadAccent: '#cbd5e1'
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
            if (selectedTemplate === 'Modern') {
                // Create gradient for Modern template
                const gradient = ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#8b5cf6');
                gradient.addColorStop(1, '#ec4899');
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
                a.download = `prayer-${categoryDisplay.toLowerCase().replace(/\s+/g, '-')}-${selectedTemplate.toLowerCase()}.png`;
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
                        <div className="grid grid-cols-2 gap-3">
                            {Object.keys(templates).map((template) => (
                                <button
                                    key={template}
                                    onClick={() => setSelectedTemplate(template)}
                                    className={`p-3 rounded-lg border-2 transition-all ${selectedTemplate === template
                                        ? 'border-[#0284C7] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-full h-16 rounded ${templates[template].bg} ${templates[template].border} border mb-2 flex items-center justify-center`}>
                                        <span className={`text-xs font-medium ${templates[template].text}`}>
                                            {template}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{template}</span>
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