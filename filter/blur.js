/**
 * Gaussian blur (separable, high quality)
 * @param {Uint8ClampedArray} pixels
 * @param {number} width
 * @param {number} height
 * @param {number} radius
 */
export function gaussianBlur(pixels, width, height, radius = 5) {
    const kernel = createGaussianKernel(radius);
    const temp = new Float32Array(pixels.length);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let r = 0, g = 0, b = 0, a = 0;

            for (let k = -radius; k <= radius; k++) {
                const px = Math.min(width - 1, Math.max(0, x + k));
                const i = (y * width + px) * 4;
                const w = kernel[k + radius];

                r += pixels[i] * w;
                g += pixels[i + 1] * w;
                b += pixels[i + 2] * w;
                a += pixels[i + 3] * w;
            }

            const idx = (y * width + x) * 4;
            temp[idx]     = r;
            temp[idx + 1] = g;
            temp[idx + 2] = b;
            temp[idx + 3] = a;
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            let r = 0, g = 0, b = 0, a = 0;

            for (let k = -radius; k <= radius; k++) {
                const py = Math.min(height - 1, Math.max(0, y + k));
                const i = (py * width + x) * 4;
                const w = kernel[k + radius];

                r += temp[i] * w;
                g += temp[i + 1] * w;
                b += temp[i + 2] * w;
                a += temp[i + 3] * w;
            }

            const idx = (y * width + x) * 4;
            pixels[idx]     = r;
            pixels[idx + 1] = g;
            pixels[idx + 2] = b;
            pixels[idx + 3] = a;
        }
    }
}
