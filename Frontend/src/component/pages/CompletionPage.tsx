import { useNavigate } from "react-router-dom";
import { Border, Footer, Heading } from "../commons";
import { useDispatch, useSelector } from "react-redux";
import { reviloActions } from "../../features/slice";
import { useEffect } from "react";
import { RootState } from "../../features/store";
import axios from "axios";
import { uploadImg } from "../../features/firebase";
import { toast } from "react-toastify";

const CompletionPage = () => {
    const updateImagesArray = useSelector((state: RootState) => state.updateImagesArray)
    const id = useSelector((state: RootState) => state.id)
    const images: string[] = [];
    const keyInfo = useSelector((state: RootState) => state.keyInfo)
    const specification = useSelector((state: RootState) => state.specification)
    const serviceHistory = useSelector((state: RootState) => state.serviceHistory)
    const aboutCar = useSelector((state: RootState) => state.aboutCar)
    const price = useSelector((state: RootState) => state.price)
    const preparation = useSelector((state: RootState) => state.preparation)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const uploadImages = async () => {
        try {
            for (let i = 0; i < keyInfo.images.length; i++) {
                if (keyInfo.images[i] !== null) {
                    const response = await uploadImg(keyInfo.images[i])
                    if (response) {
                        images.push(response)
                    }
                }
            }
            if (images.length === keyInfo.images.length) {
                uploadDataToServer()
            }
        } catch (error) {
            toast('Problem in uploading product please try again.')
            dispatch(reviloActions.showLoaderToogler())
            dispatch(reviloActions.showUploadMessageToogler())
            dispatch(reviloActions.reset())
            navigate('/car-listing')
        }
    }
    const uploadDataToServer = async () => {
        try {
            const data = {
                make: keyInfo.make,
                model: keyInfo.model,
                variant: keyInfo.variant,
                miles: keyInfo.miles,
                registration: keyInfo.registration,
                mileage: keyInfo.mileage,
                numberOfOwners: keyInfo.owners,
                specification: specification,
                serviceHistory: serviceHistory,
                askingPrice: price.asking_price,
                capClean: price.cap_clean,
                autoTraderDetail: price.autorader_retail,
                images: images,
                about: aboutCar,
                preparation: preparation
            }
            const response = await axios.post('http://149.100.156.7:5000/api/v1/products', data, { withCredentials: true })
            if (response) {
                dispatch(reviloActions.showLoaderToogler())
                dispatch(reviloActions.showUploadMessageToogler())
                dispatch(reviloActions.reset())
                toast('You car is added.')
                navigate('/all-listing')
            }
        } catch (error) {
            toast('Problem in uploading product please try again.')
            dispatch(reviloActions.showLoaderToogler())
            dispatch(reviloActions.showUploadMessageToogler())
            dispatch(reviloActions.reset())
            navigate('/car-listing')
        }
    }
    const uploadUpdatedImages = async () => {
        try {
            for (let i = 0; i < keyInfo.images.length; i++) {
                if (keyInfo.images[i] !== null) {
                    const response = await uploadImg(keyInfo.images[i])
                    if (response) {
                        images.push(response)
                    }
                }
            }
            if (images.length === keyInfo.images.length) {
                updateDataToServerWthNewImages()
            }
        } catch (error) {
            toast('Problem in updating product please try again.')
            dispatch(reviloActions.showLoaderToogler())
            dispatch(reviloActions.showUploadMessageToogler())
            dispatch(reviloActions.reset())
            navigate('/car-listing')
        }
    }
    const updateDataToServerWthPreviousImages = async () => {
        try {
            const data = {
                make: keyInfo.make,
                model: keyInfo.model,
                variant: keyInfo.variant,
                registration: keyInfo.registration,
                miles: keyInfo.miles,
                mileage: keyInfo.mileage,
                numberOfOwners: keyInfo.owners,
                specification: specification,
                serviceHistory: serviceHistory,
                askingPrice: price.asking_price,
                capClean: price.cap_clean,
                autoTraderDetail: price.autorader_retail,
                images: updateImagesArray,
                about: aboutCar,
                preparation: preparation
            }
            const response = await axios.patch(`http://149.100.156.7:5000/api/v1/products/${id}`, data, { withCredentials: true })
            if (response) {
                dispatch(reviloActions.showLoaderToogler())
                dispatch(reviloActions.showUploadMessageToogler())
                dispatch(reviloActions.reset())
                toast('Your car info is updated.')
                navigate('/all-listing')
            }
        } catch (error) {
            toast('Problem in updating product please try again.')
            dispatch(reviloActions.showLoaderToogler())
            dispatch(reviloActions.showUploadMessageToogler())
            dispatch(reviloActions.reset())
            navigate('/car-listing')
        }
    }
    const updateDataToServerWthNewImages = async () => {
        try {
            const data = {
                make: keyInfo.make,
                model: keyInfo.model,
                variant: keyInfo.variant,
                registration: keyInfo.registration,
                mileage: keyInfo.mileage,
                numberOfOwners: keyInfo.owners,
                specification: specification,
                serviceHistory: serviceHistory,
                askingPrice: price.asking_price,
                capClean: price.cap_clean,
                autoTraderDetail: price.autorader_retail,
                images: images,
                about: aboutCar,
                preparation: preparation
            }
            const response = await axios.patch(`http://149.100.156.7:5000/api/v1/products/${id}`, data, { withCredentials: true })
            if (response) {
                dispatch(reviloActions.showLoaderToogler())
                dispatch(reviloActions.showUploadMessageToogler())
                dispatch(reviloActions.reset())
                toast('Your car info is updated.')
                navigate('/all-listing')
            }
        } catch (error) {
            toast('Problem in updating product please try again.')
            dispatch(reviloActions.showLoaderToogler())
            dispatch(reviloActions.showUploadMessageToogler())
            dispatch(reviloActions.reset())
            navigate('/car-listing')
        }
    }
    const handler = () => {
        dispatch(reviloActions.showLoaderToogler())
        dispatch(reviloActions.showUploadMessageToogler())
        uploadImages()
    }
    const updateHanlder = () => {
        dispatch(reviloActions.showLoaderToogler())
        dispatch(reviloActions.showUploadMessageToogler())
        if (keyInfo.images.length) {
            uploadUpdatedImages()
        } else {
            updateDataToServerWthPreviousImages()
        }
    }
    const userId = useSelector((state: RootState) => state.userId)
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://149.100.156.7:5000/api/v1/users/showMe`, { withCredentials: true });
            dispatch(reviloActions.setUser(data.user.userId));
        } catch (error) {
            dispatch(reviloActions.resetUser())
            navigate('/')
        }
    };
    const checkForData = () => {
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !keyInfo.images.length || !specification.length || !serviceHistory.length || !price.asking_price || !price.cap_clean || !price.autorader_retail || !aboutCar.length || !preparation.length) {
            navigate('/car-listing')
        }
    }
    const checkForUpdateData = () => {
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !updateImagesArray.length || !specification.length || !serviceHistory.length || !price.asking_price || !price.cap_clean || !price.autorader_retail || !aboutCar.length || !preparation.length) {
            navigate('/car-listing')
        }
    }
    useEffect(() => {
        if (!userId) {
            fetchUser()
        }
        if (!updateImagesArray.length) {
            checkForData()
        } else {
            checkForUpdateData()
        }
    }, [])
    return (
        <div className="flex flex-col justify-between min-h-screen gap-8">
            <div className="px-7 pt-28">
                <div>
                    <Heading heading="Completion" />
                    <Border />
                </div>
                <div className="py-6">
                    <p className="text-[0.875rem]">
                    step 7 of 7
                    </p>
                    <div className="bg-[#D9D9D9] w-full rounded-full h-5 mt-2">
                        <div className="bg-high-light-color w-[100%] h-full rounded-full px-2 font-semibold text-[0.75rem] text-white flex items-center justify-end">
                            <p>100%</p>
                        </div>
                    </div>
                </div>
                <p className="text-[0.875rem] font-bold text-center pb-6 cursor-pointer" onClick={() => navigate('/key-information')}>Review the Information and Publish!</p>
                <div className="flex justify-center">
                    {id.length > 0 ? <button type="button" className="bg-main-color text-white py-2 rounded-full text-xs font-bold w-24" onClick={updateHanlder}>Update</button> : <button type="button" className="bg-main-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32" onClick={handler}>Publish</button>}
                </div>
            </div>
            <Footer isShow />
        </div>
    )
}

export default CompletionPage;