export function encodeImageData(imageData, width, height){
        const Binary = []
        for(let y=0; y<height; y++){
            let row = []
            for(let x =0; x<width; x++){
                const i = (y * SIZE + x) * 4;
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
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