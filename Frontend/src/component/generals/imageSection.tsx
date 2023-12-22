import React, { useEffect, useRef, useState } from "react";

const ImageSection: React.FC<{ images: string[], openModelToogler: () => void }> = ({ images, openModelToogler }) => {
    const imagesArray = [...images]
    const [counter, setCounter] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);
    const increaseCounter = () => {
        const imageCounter = counter;
        if (imageCounter === images.length - 1) {
            setCounter(0)
        } else {
            setCounter(imageCounter + 1)
        }
    }
    const decreaseCounter = () => {
        const imageCounter = counter;
        if (imageCounter === 0) {
            setCounter(images.length - 1)
        } else {
            setCounter(imageCounter - 1)
        }
    }
    const scrollImage = () => {
        if (imageRef.current) {
            imageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }
    }
    useEffect(() => {
        scrollImage()
    }, [counter])
    return (
        <div className="relative">
            <div className="py-10">
                {
                    images.length > 0 && <>
                        <div className="relative">
                            <div className="absolute text-2xl flex w-full top-[42%] justify-between px-1">
                                <div className="w-8 h-8 border-[1px] border-black bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={decreaseCounter}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                </div>
                                <div className="w-8 h-8 border-[1px] border-black bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={increaseCounter}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                            <div className="flex overflow-hidden w-4/5 mx-auto relative z-10">
                                {
                                    imagesArray.length > 0 && imagesArray.map((image, idx) => <img onClick={openModelToogler} ref={idx === counter ? imageRef : null} src={image} key={idx} alt="product" className="flex-none cursor-pointer object-contain w-full h-52" />)
                                }
                            </div>
                        </div>
                        <div className="flex overflow-hidden w-4/5 mx-auto pt-1">
                            <img src={imagesArray[1]} className="w-1/3 h-16 object-contain" alt="product1" />
                            <img src={imagesArray[2]} className="w-1/3 h-16 object-contain" alt="produc2" />
                            <img src={imagesArray[3]} className="w-1/3 h-16 object-contain" alt="product3" />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ImageSection;