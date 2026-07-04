import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(process.cwd(), 'src/assets/images');

async function convertImages() {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const inputPath = path.join(directoryPath, file);
        const outputFilename = file.substring(0, file.lastIndexOf('.')) + '.webp';
        const outputPath = path.join(directoryPath, outputFilename);

        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`Converted: ${file} -> ${outputFilename}`);
        
        // Remove the original file to save space
        fs.unlinkSync(inputPath);
      }
    }
    console.log('All images converted to WebP successfully.');
  } catch (err) {
    console.error('Error converting images:', err);
  }
}

convertImages();
