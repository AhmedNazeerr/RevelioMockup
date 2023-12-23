import { useEffect, useState } from "react";
import { Border, Footer, Heading } from "../commons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { reviloActions } from "../../features/slice";
import axios from "axios";

const PreparationPage = () => {
    const updateImagesArray = useSelector((state: RootState) => state.updateImagesArray)
    const keyInfo = useSelector((state: RootState) => state.keyInfo)
    const specification = useSelector((state: RootState) => state.specification)
    const serviceHistory = useSelector((state: RootState) => state.serviceHistory)
    const aboutCar = useSelector((state: RootState) => state.aboutCar)
    const price = useSelector((state: RootState) => state.price)
    const dispatch = useDispatch()
    const preparation = useSelector((state:RootState) => state.preparation)
    const userId = useSelector((state: RootState) => state.userId)
    const [content, setContent] = useState(preparation)
    const [showError, setShowError] = useState(false)
    const [containsUnorderedList, setContainsUnorderedList] = useState(false)
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline',],
            [{ 'list': 'bullet' }],    
        ],
    };
    const navigate = useNavigate()
    const navigateToNext = () => {
        if (!content.length) {
            setShowError(true)
        } else if (containsUnorderedList) {
            dispatch(reviloActions.setPreparation(content))
            setShowError(false)
            navigate('/completion')
        }
    }
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/api/v1/users/showMe`);
            dispatch(reviloActions.setUser(data.user.userId));
        } catch (error) {
            dispatch(reviloActions.resetUser())
            navigate('/')
        }
    };
    const checkForData = () => {
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !keyInfo.images.length || !specification.length || !serviceHistory.length || !price.asking_price || !price.cap_clean || !price.autorader_retail || !aboutCar.length) {
            navigate('/car-listing')
        }
    }
    const checkForUpdateData = () => {
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !updateImagesArray.length || !specification.length || !serviceHistory.length || !price.asking_price || !price.cap_clean || !price.autorader_retail || !aboutCar.length) {
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
    useEffect(() => {
        if (content.includes('<ul>') && content.includes('</ul>')) {
            setContainsUnorderedList(true);
        } else {
            setContainsUnorderedList(false);
        }
    }, [content])
    return (
        <div className="flex flex-col justify-between min-h-screen gap-8">
            <div className="px-7 pt-28">
                <div>
                    <Heading heading="Preparation" />
                    <Border />
                </div>
                <div className="py-6">
                    <p className="text-[0.875rem]">
                    step 6 of 7
                    </p>
                    <div className="bg-[#D9D9D9] w-full rounded-full h-5 mt-2">
                        <div className="bg-high-light-color w-[82%] h-full rounded-full px-2 font-semibold text-[0.75rem] text-white flex items-center justify-end">
                            <p>82%</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-[1.25rem] font-bold pb-1">Enter your preparations below</p>
                    <div className="text-[0.65rem]">
                        <ReactQuill value={content} onChange={setContent} modules={modules} />
                    </div>
                    {
                        showError && <p className="text-[0.45rem] text-red-600 pt-0.5">please fill some the specification.</p>
                    }
                    {
                        !containsUnorderedList && <p className="text-[0.45rem] text-red-600 pt-0.5">please enter the list of specification.</p>
                    }
                </div>
                <button type="button" className="bg-high-light-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4" onClick={() => navigate('/price')}>Previous</button>
                <br />
                <button type="button" className="bg-main-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-2" onClick={navigateToNext}>Next</button>
            </div>
            <Footer isShow />
        </div>
    )
}

export default PreparationPage;