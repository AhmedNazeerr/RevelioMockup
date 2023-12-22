import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Border, Footer, Heading } from "../commons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { reviloActions } from "../../features/slice";
import { useEffect } from "react";
import axios from "axios";

const PricePage = () => {
    const updateImagesArray = useSelector((state: RootState) => state.updateImagesArray)
    const keyInfo = useSelector((state: RootState) => state.keyInfo)
    const specification = useSelector((state: RootState) => state.specification)
    const serviceHistory = useSelector((state: RootState) => state.serviceHistory)
    const aboutCar = useSelector((state: RootState) => state.aboutCar)
    const dispatch = useDispatch()
    const price = useSelector((state: RootState) => state.price)
    const validation = Yup.object({
        asking_price: Yup.number()
            .required('please enter the asking price properlly.')
            .moreThan(0, 'asking price can not be zero'),
        cap_clean: Yup.number()
            .required('please enter the cap clean properlly.')
            .moreThan(0, 'cap clean can not be zero'),
        autorader_retail: Yup.string()
            .required('please fill the above field.'),
    })
    const userId = useSelector((state: RootState) => state.userId)
    const navigate = useNavigate()
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
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !keyInfo.images.length || !specification.length || !serviceHistory.length || !aboutCar.length) {
            navigate('/car-listing')
        }
    }

    const checkForUpdateData = () => {
        if (!keyInfo.make || !keyInfo.model || !keyInfo.variant || !keyInfo.registration || !keyInfo.mileage || !keyInfo.owners || !updateImagesArray.length || !specification.length || !serviceHistory.length || !aboutCar.length) {
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
                    <Heading heading="Prices" />
                    <Border />
                </div>
                <div className="py-6">
                    <p className="text-[0.875rem]">
                        step 5 of 7
                    </p>
                    <div className="bg-[#D9D9D9] w-full rounded-full h-5 mt-2">
                        <div className="bg-high-light-color w-[70%] h-full rounded-full px-2 font-semibold text-[0.75rem] text-white flex items-center justify-end">
                            <p>70%</p>
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        asking_price: price.asking_price,
                        cap_clean: price.cap_clean,
                        autorader_retail: price.autorader_retail,
                    }}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        navigate('/preparation')
                        dispatch(reviloActions.setPrice(values))
                    }}
                >
                    {({ ...keyInfoForm }) => (
                        <Form>
                            <div className="pb-4">
                                <label className="text-[1.25rem] font-bold">Asking Price</label>
                                <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="enter here..." {...keyInfoForm.getFieldProps('asking_price')} />
                                {keyInfoForm.touched.asking_price && keyInfoForm.errors.asking_price ? (
                                    <div className="text-[0.45rem] text-red-600">{keyInfoForm.errors.asking_price}</div>
                                ) : null}
                            </div>
                            <div className="pb-4">
                                <label className="text-[1.25rem] font-bold">Cap Clean</label>
                                <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="enter here..." {...keyInfoForm.getFieldProps('cap_clean')} />
                                {keyInfoForm.touched.cap_clean && keyInfoForm.errors.cap_clean ? (
                                    <div className="text-[0.45rem] text-red-600">{keyInfoForm.errors.cap_clean}</div>
                                ) : null}
                            </div>
                            <div className="pb-3">
                                <label className="text-[1.25rem] font-bold">Autorader Retail</label>
                                <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="enter here..." {...keyInfoForm.getFieldProps('autorader_retail')} />
                                {keyInfoForm.touched.autorader_retail && keyInfoForm.errors.autorader_retail ? (
                                    <div className="text-[0.45rem] text-red-600">{keyInfoForm.errors.autorader_retail}</div>
                                ) : null}
                            </div>
                            <button type="button" className="bg-high-light-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4" onClick={() => navigate('/service-history')}>Previous</button>
                            <br />
                            <button type="submit" className="bg-main-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-2">Next</button>
                        </Form>)}
                </Formik>
            </div>
            <Footer isShow />
        </div>
    )
}

export default PricePage;