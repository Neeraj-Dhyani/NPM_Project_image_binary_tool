/**
 *  Decode a 2D RGBA matrix into pixel data
 * @param {number[][][]} binary - 2D array of RGBA pixels
 * @returns {{ data: Uint8ClampedArray, width: number, height: number }}
 */
export function decodeImageData(binary){
        const height = binary.length 
        const width = binary[0].length
        const imageData  = new Uint8ClampedArray(width*height*4)
        for(let y=0; y<height; y++){
            if (binary[y].length !== width) {
                throw new Error("Invalid binary matrix: inconsistent row width");
            }
            for(let x=0; x<width; x++){
                const i = (y*width+x)*4
                const [r, g, b, alpha] = binary[y][x] 
                imageData[i] = r
                imageData[i+1] = g
                imageData[i+2] = b
                imageData[i+3] = alpha
            }
        }
        return({
            data:imageData,
            width,
            height
        })
    
}