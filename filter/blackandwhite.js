/**
 * Convert image pixels to grayscale (in-place)
 * @param {Uint8ClampedArray} pixels
 */
export function BW(pixels){
     for(let i=0; i<=pixels.height; i+=4){
            let r = pixels[i]
            let g = pixels[i+1]
            let b = pixels[i+2]
        
            let average = (r+g+b)/3

            pixels[i] = average
            pixels[i+1] = average
            pixels[i+2] = average

        }
} 