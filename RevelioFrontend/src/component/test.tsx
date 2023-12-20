import { useState } from "react";
import { uploadImg } from "../features/firebase";

const Test = () => {
    const [images, setImages] = useState<File[]>([])
    // const [imagesArray, setImagesArray] = useState<string[]>([])
    const uploadImages = async () => {
        try {
            for(let i = 0; i < images.length; i++) {
                if (images[i] !== null) {
                    const response = await uploadImg(images[i])
                    console.log(response)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handler = () => {
        uploadImages()
    }
    return (
        <>
            <input type="file" multiple accept="image/*" onChange={(event) => {
                const files = event.target.files;
                const fileArray = [];
                for (let i = 0; i < files!.length; i++) {
                    fileArray.push(files![i]);
                }
                setImages(fileArray);
            }} />
            <button type="button" onClick={handler} >Upload</button>
        </>
    )
}

export default Test;