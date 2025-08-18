const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <rect x="4" y="4" width="24" height="24" rx="3" fill="#ffffff"/>
  <rect x="6" y="6" width="20" height="6" rx="1" fill="#1e40af"/>
  <circle cx="9" cy="17" r="1.5" fill="#2563eb"/>
  <circle cx="16" cy="17" r="1.5" fill="#2563eb"/>
  <circle cx="23" cy="17" r="1.5" fill="#2563eb"/>
  <circle cx="9" cy="22" r="1.5" fill="#2563eb"/>
  <circle cx="16" cy="22" r="1.5" fill="#2563eb"/>
  <rect x="21" y="20" width="4" height="4" rx="1" fill="#10b981"/>
</svg>`;

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Generate different sized favicons
  const sizes = [16, 32, 192, 512];
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
    
    console.log(`Generated favicon-${size}x${size}.png`);
  }
  
  // Generate standard favicon.ico (32x32)
  await sharp(Buffer.from(svgIcon))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  
  console.log('Generated favicon.png');
  
  // Create apple-touch-icon
  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  
  console.log('Generated apple-touch-icon.png');
}

generateFavicons().catch(console.error);