import { useParams } from "react-router-dom";
import { Footer, LoadingScreen } from "../commons";
import { HeroSection, ImageSection, InfoSection, KeyInfo, Preparation, ServiceHistory, Specification } from "../generals";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reviloActions } from "../../features/slice";
import { toast } from "react-toastify";
import { RootState } from "../../features/store";

interface productInterface {
    make: string,
    model: string,
    variant: string,
    registration: string,
    miles: number,
    mileage: number,
    numberOfOwners: number,
    specification: string,
    serviceHistory: string,
    askingPrice: number,
    capClean: number,
    autoTraderDetail: string,
    images: string[],
    about: string,
    preparation: string
}

const ProductPage: React.FC = () => {
    const showLoader = useSelector((state: RootState) => state.showLoader)
    const [openModel, setOpenModel] = useState(false);
    const openModelToogler = () => {
        setOpenModel(!openModel)
    }
    const dispatch = useDispatch()
    const { id } = useParams()
    const [product, setProduct] = useState<productInterface>()
    const getProduct = async () => {
        dispatch(reviloActions.showLoaderToogler())
        try {
            const response = await axios.get(`/api/v1/products/${id}`)
            if (response.status === 200) {
                setProduct(response.data.product)
            }
        } catch (error) {
            toast("No such product is available.")
        }
        dispatch(reviloActions.showLoaderToogler())
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <div className="relative flex flex-col justify-between h-screen">
            {openModel ? <div className="w-full h-full z-30 absolute -top-8 pt-28">
                <div className="w-full text-right text-[1.5rem] pr-2 pt-1">
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={openModelToogler}></i>
                </div>
                <div>
                    {
                        product?.images.map((image, idx) => <img src={image} className="w-full object-contain" key={idx} alt="product" />)
                    }
                </div>
            </div> : (
                product && Object.keys(product).length !== 0 ?
                    <div className="text-[0.75rem] pt-28">
                        {product?.make && <HeroSection make={product.make} model={product.model} varient={product.variant} askingPrice={product.askingPrice} capClean={product.capClean} autoTraderDetail={product.autoTraderDetail} />}
                        {product && <ImageSection images={product.images} openModelToogler={openModelToogler} />}
                        {product && <KeyInfo miles={product.miles} mileage={product.mileage} registration={product.registration} numberOfOwners={product.numberOfOwners} />}
                        {product && <InfoSection about={product.about} />}
                        {product && <Specification specification={product.specification} />}
                        {product && <ServiceHistory serviceHistory={product.serviceHistory} />}
                        {product && <Preparation preparation={product.preparation} />}
                        {product && <Footer isShow />}
                    </div> : showLoader && <LoadingScreen />
            )}
        </div>
    )
}

export default ProductPage;