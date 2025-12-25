# image-data-utils

Image Filters Package
A lightweight JavaScript library for applying various image filters and effects to canvas images. This package provides simple functions for image manipulation including blur, grayscale, inversion, vintage effects, ASCII art generation, and more.

Installation
bash
npm install [your-package-name]
Features
🎨 Multiple image filters (blur, grayscale, inversion, vintage)
🔤 ASCII art generation with color support
🖼️ Image data encoding/decoding utilities
🚀 Easy to use with HTML5 Canvas
⚡ In-place pixel manipulation for performance
Usage
Setup
First, import the functions you need:

javascript
import { 
  bLur, 
  BW, 
  ASCII_generator, 
  inversion, 
  vintage,
  ImageDataGenerate,
  encodeImageData,
  decodeImageData
} from '[your-package-name]';
Basic Example
javascript
// Setup canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load an image
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  
  // Generate image data
  const { width, height } = await ImageDataGenerate(file, canvas, ctx);
  
  // Get pixel data
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  
  // Apply a filter
  BW(pixels);
  
  // Put modified pixels back to canvas
  ctx.putImageData(imageData, 0, 0);
});
API Reference
bLur(pixels)
Applies a blur effect to the image using a 21x21 box blur kernel.

Parameters:

pixels (Uint8ClampedArray): The pixel data from canvas ImageData
Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
bLur(imageData.data);
ctx.putImageData(imageData, 0, 0);
BW(pixels)
Converts the image to grayscale using average method.

Parameters:

pixels (Uint8ClampedArray): The pixel data from canvas ImageData
Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
BW(imageData.data);
ctx.putImageData(imageData, 0, 0);
inversion(pixels)
Inverts all colors in the image (negative effect).

Parameters:

pixels (Uint8ClampedArray): The pixel data from canvas ImageData
Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
inversion(imageData.data);
ctx.putImageData(imageData, 0, 0);
vintage(pixels)
Applies a vintage/sepia tone effect to the image.

Parameters:

pixels (Uint8ClampedArray): The pixel data from canvas ImageData
Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
vintage(imageData.data);
ctx.putImageData(imageData, 0, 0);
ASCII_generator(pixels, width, options)
Converts an image to ASCII art.

Parameters:

pixels (Uint8ClampedArray): The pixel data from canvas ImageData
width (number): Width of the image
options (object): Optional configuration
char (array): Custom ASCII characters (default: [".", ",", ":", "-", "=", "+", "*", "#", "%", "@"])
color (boolean): Whether to use colored output (default: true)
Returns: String containing HTML with ASCII art

Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Basic usage with colors
const asciiArt = ASCII_generator(imageData.data, canvas.width);
document.getElementById('output').innerHTML = `<pre>${asciiArt}</pre>`;

// Custom characters without color
const customAscii = ASCII_generator(imageData.data, canvas.width, {
  char: [' ', '.', ':', '-', '=', '+', '*', '#', '@'],
  color: false
});
document.getElementById('output').innerHTML = `<pre>${customAscii}</pre>`;
ImageDataGenerate(file, canvas, ctx)
Loads an image file and draws it to a canvas.

Parameters:

file (File): Image file from input element
canvas (HTMLCanvasElement): Canvas element
ctx (CanvasRenderingContext2D): Canvas 2D context
Returns: Promise resolving to {width, height}

Example:

javascript
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const { width, height } = await ImageDataGenerate(file, canvas, ctx);
  console.log(`Image loaded: ${width}x${height}`);
});
encodeImageData(imageData, width, height)
Converts ImageData to a 2D array format for easier manipulation.

Parameters:

imageData (Uint8ClampedArray): Pixel data
width (number): Image width
height (number): Image height
Returns: 2D array where each element is [r, g, b, alpha]

Example:

javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const binaryMatrix = encodeImageData(
  imageData.data, 
  canvas.width, 
  canvas.height
);

// Now you can easily access pixels
const pixelColor = binaryMatrix[10][20]; // [r, g, b, alpha] at position (20, 10)
decodeImageData(binary)
Converts a 2D array format back to ImageData format.

Parameters:

binary (array): 2D array where each element is [r, g, b, alpha]
Returns: Object with {data, width, height}

Example:

javascript
// Create a 2D array (e.g., 100x100 red image)
const binary = Array(100).fill(0).map(() => 
  Array(100).fill(0).map(() => [255, 0, 0, 255])
);

// Convert to ImageData format
const { data, width, height } = decodeImageData(binary);

// Create ImageData and draw to canvas
const imageData = new ImageData(data, width, height);
ctx.putImageData(imageData, 0, 0);
Complete Example
html
<!DOCTYPE html>
<html>
<head>
  <title>Image Filters Demo</title>
  <style>
    canvas { border: 1px solid #ccc; }
    pre { font-family: monospace; line-height: 0.8; font-size: 8px; }
  </style>
</head>
<body>
  <input type="file" id="fileInput" accept="image/*">
  <div>
    <button onclick="applyGrayscale()">Grayscale</button>
    <button onclick="applyInvert()">Invert</button>
    <button onclick="applyVintage()">Vintage</button>
    <button onclick="applyBlur()">Blur</button>
    <button onclick="generateASCII()">ASCII Art</button>
  </div>
  <canvas id="canvas"></canvas>
  <div id="ascii-output"></div>

  <script type="module">
    import { 
      bLur, BW, ASCII_generator, inversion, vintage, ImageDataGenerate 
    } from '[your-package-name]';

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let originalImageData;

    document.getElementById('fileInput').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      await ImageDataGenerate(file, canvas, ctx);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    });

    window.applyGrayscale = () => {
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      BW(imageData.data);
      ctx.putImageData(imageData, 0, 0);
    };

    window.applyInvert = () => {
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      inversion(imageData.data);
      ctx.putImageData(imageData, 0, 0);
    };

    window.applyVintage = () => {
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      vintage(imageData.data);
      ctx.putImageData(imageData, 0, 0);
    };

    window.applyBlur = () => {
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      bLur(imageData.data);
      ctx.putImageData(imageData, 0, 0);
    };

    window.generateASCII = () => {
      const ascii = ASCII_generator(
        originalImageData.data, 
        originalImageData.width,
        { color: true }
      );
      document.getElementById('ascii-output').innerHTML = `<pre>${ascii}</pre>`;
    };
  </script>
</body>
</html>
Browser Compatibility
This package works in all modern browsers that support:

HTML5 Canvas
ES6 Modules
Uint8ClampedArray
License
MIT

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Author
[Neeraj Dhayni]

Repository
[GitHub Repository URL]



## Install
```bash
npm install image-data-utils
