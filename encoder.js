
/**
 * @param {Uint8ClampedArray} imageData 
 * @param {number} width 
 * @param {number} height 
 * @returns {number[][][]}
 */

export function encodeImageData(imageData, width, height){
        const Binary = []
        const data = imageData
        for(let y=0; y<height; y++){
            let row = []
            for(let x =0; x<width; x++){
                const i = (y * width + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const alpha = data[i+3]
                if(alpha<50){
                     row.push([0,0,0,0]);
                }else{
                row.push([r,g,b,alpha])
                }

            }
            Binary.push(row)
        }
        return Binary
        
}