/**
 * Convert image pixels to grayscale (in-place)
 * @param {Uint8ClampedArray} pixels
 * @param {number} width
 * @param {Object} options
 * @returns {string}
 */ 
 export function ASCII_generator(pixels, width, option={}){
    const ASCII_CHARS = option.char||["." , ",", ":", "-", "=", "+","*","#","%", "@"]
    const color = option.color??true
    let asciiHTML = ''
    const height = Math.floor(pixels.length / 4 / width);
    for(let y = 0; y<height; y++){
        for(x =0; x<width; x++){
            let i = (y*width+x)*4
            const r = pixels[i]
            const g = pixels[i+1]
            const b = pixels[i+2]

            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

            const charIndex = Math.floor(
                (brightness / 255) * (ASCII_CHARS.length - 1)
            );

            const char = ASCII_CHARS[charIndex]
            if(color){
                asciiHTML += `<span style="color:rgb(${r}, ${g}, ${b})">${char}</span>`
            }else{
                asciiHTML += char
            }
            
        }
        asciiHTML+='\n'
    }
    return asciiHTML
}