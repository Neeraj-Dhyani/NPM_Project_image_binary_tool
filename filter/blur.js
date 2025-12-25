/**
 * Convert image pixels to grayscale (in-place)
 * @param {Uint8ClampedArray} pixels
 */
export function bLur(pixels){
    let copy = new Uint8ClampedArray(pixels)
            for(let y = 1; y<=canvas.height; y++){
                for(let x = 1; x<=canvas.width; x++){
                let r = 0, g = 0, b = 0;
                let count = 0
                for(let ky = -10; ky<=10; ky++){
                    for(let kx = -10; kx<=10; kx++){
                        let py = y + ky
                        let px = x + kx
                        let index = (py * canvas.width + px) * 4
                        r += copy[index]
                        g += copy[index+1]
                        b += copy[index+2]
                        count += 1
                    }
                }
                let i =  (y * canvas.width + x)*4
                pixels[i] = r/count
                pixels[i+1] = g/count
                pixels[i+2] = b/count
            }
        }
}