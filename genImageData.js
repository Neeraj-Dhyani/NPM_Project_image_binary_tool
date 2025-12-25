export function ImageDataGenerate (file, canvas, ctx){
    return new Promise((resolve)=>{
     const image_icon = new Image()

        image_icon.onload = ()=>{
            SIZE = image_icon.width
            canvas.width = image_icon.width;
            canvas.height = image_icon.height;
            ctx.fillStyle = "white"
            ctx.clearRect(0, 0, SIZE, SIZE)
            ctx.drawImage(image_icon, 0, 0, SIZE, SIZE) 
            resolve({
                width:image_icon.width,
                height:image_icon.height
            })

        }
        image_icon.src = URL.createObjectURL(file)
    })

}