
export function decodeImageData(binary){
        const height = binary.length 
        const width = binary[0].length
        const imageData  = new Uint8ClampedArray(width*height*4)
        for(let y=0; y; y++){
            if (binary[y].length !== width) {
                throw new Error("Invalid binary matrix: inconsistent row width");
            }
            for(let x=0; x<SIZE; x++){
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