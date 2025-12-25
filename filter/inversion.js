 /**
 * Convert image pixels to grayscale (in-place)
 * @param {Uint8ClampedArray} pixels
 */
 export function inversion(pixels){
     for (let i = pixels.length - 4; i >= 0; i -= 4) {
            let r = pixels[i];
            let g = pixels[i + 1];
            let b = pixels[i + 2];

            pixels[i] = 255- r ;
            pixels[i + 1] =  255- g;
            pixels[i + 2] = 255- b ; 
        }
}