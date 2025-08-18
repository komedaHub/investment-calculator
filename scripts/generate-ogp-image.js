const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// OGP画像用のSVG（1200x630px）
const ogpSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景グラデーション -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- メインアイコン -->
  <g transform="translate(100, 150)">
    <rect width="120" height="120" rx="20" fill="#ffffff"/>
    <rect x="15" y="15" width="90" height="90" rx="10" fill="#f8fafc"/>
    <rect x="22.5" y="22.5" width="75" height="22.5" rx="3.75" fill="#1e40af"/>
    <circle cx="33.75" cy="63.75" r="5.625" fill="#2563eb"/>
    <circle cx="60" cy="63.75" r="5.625" fill="#2563eb"/>
    <circle cx="86.25" cy="63.75" r="5.625" fill="#2563eb"/>
    <circle cx="33.75" cy="82.5" r="5.625" fill="#2563eb"/>
    <circle cx="60" cy="82.5" r="5.625" fill="#2563eb"/>
    <rect x="78.75" y="75" width="15" height="15" rx="3.75" fill="#10b981"/>
  </g>
  
  <!-- タイトル -->
  <text x="280" y="220" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">
    投資かんたん計算
  </text>
  
  <!-- サブタイトル -->
  <text x="280" y="280" font-family="Arial, sans-serif" font-size="32" fill="#e2e8f0">
    投資・資産運用計算ツール
  </text>
  
  <!-- 特徴 -->
  <g transform="translate(280, 320)">
    <text y="40" font-family="Arial, sans-serif" font-size="28" fill="#f1f5f9">✓ 複利計算機</text>
    <text y="85" font-family="Arial, sans-serif" font-size="28" fill="#f1f5f9">✓ つみたてNISA・iDeCo対応</text>
    <text y="130" font-family="Arial, sans-serif" font-size="28" fill="#f1f5f9">✓ 無料で使える実用ツール</text>
  </g>
  
  <!-- URL -->
  <text x="280" y="580" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8">
    example.com
  </text>
</svg>`;

async function generateOgpImage() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  try {
    // OGP画像生成（1200x630px）
    await sharp(Buffer.from(ogpSvg))
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    
    console.log('Generated og-image.png (1200x630)');
    
    // Twitter Card用画像生成（1200x600px）
    const twitterCardSvg = ogpSvg.replace('height="630"', 'height="600"').replace('viewBox="0 0 1200 630"', 'viewBox="0 0 1200 600"');
    
    await sharp(Buffer.from(twitterCardSvg))
      .resize(1200, 600)
      .png()
      .toFile(path.join(publicDir, 'twitter-card.png'));
    
    console.log('Generated twitter-card.png (1200x600)');
    
  } catch (error) {
    console.error('Error generating OGP images:', error);
  }
}

generateOgpImage();