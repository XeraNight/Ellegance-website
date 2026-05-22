const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const epkDir = path.resolve(__dirname, "../public/epk");

const files = [
  "corners-minimal-white.svg",
  "corners-gold-deco.svg",
  "story-border-overlay.svg",
  "badge-ellegance.svg",
  "badge-idem-pre-zlato.svg",
  "badge-budem-tam.svg"
];

async function render() {
  console.log("Starting EPK high-res PNG generation from SVG templates...");
  
  if (!fs.existsSync(epkDir)) {
    console.error(`EPK directory does not exist: ${epkDir}`);
    process.exit(1);
  }

  for (const file of files) {
    const svgPath = path.join(epkDir, file);
    const pngPath = path.join(epkDir, file.replace(".svg", ".png"));
    
    if (!fs.existsSync(svgPath)) {
      console.warn(`Warning: SVG template not found: ${svgPath}`);
      continue;
    }

    console.log(`- Converting: ${file} -> ${file.replace(".svg", ".png")}`);
    
    // Using high density (600 DPI) to render vector paths with absolute precision
    // Resizing to max 2400px (fitting inside maintaining aspect ratio)
    await sharp(svgPath, { density: 600 })
      .resize(2400, 2400, {
        fit: "inside",
        withoutEnlargement: false
      })
      .png({ compressionLevel: 9, quality: 100 })
      .toFile(pngPath);

    console.log(`  ✓ Done! Saved transparent high-res PNG to ${pngPath}`);
  }
  
  console.log("EPK PNG assets successfully updated!");
}

render().catch((err) => {
  console.error("Error rendering EPK assets:", err);
  process.exit(1);
});
