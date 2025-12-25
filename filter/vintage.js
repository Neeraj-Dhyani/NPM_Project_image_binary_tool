/**
 * Convert image pixels to grayscale (in-place)
 * @param {Uint8ClampedArray} pixels
 */
export function vintage(pixels){

     for(let i=0; i<pixels.length; i++){
            let r = pixels[i]
            let g = pixels[i+1]
            let b = pixels[i+2]

            pixels[i]     = (0.393 * r) + (0.769 * g) + (0.189 * b);
            pixels[i + 1] = (0.349 * r) + (0.686 * g) + (0.168 * b);
            pixels[i + 2] = (0.272 * r) + (0.534 * g) + (0.131 * b);

        }

}