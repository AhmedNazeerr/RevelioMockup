import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { Border, Footer, Heading } from "../commons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { reviloActions } from "../../features/slice";
import axios from "axios";

const KeyInfoPage = () => {
    const updateImageArray = useSelector((state: RootState) => state.updateImagesArray)
    const userId = useSelector((state: RootState) => state.userId)
    const keyInfo = useSelector((state: RootState) => state.keyInfo)
    const dispatch = useDispatch()
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
    useEffect(() => {
        if (!userId) {
            fetchUser()
        }
    }, [])
    const imageUploadRef = useRef<HTMLInputElement>(null);
    const imageUploadHandler = () => {
        if (imageUploadRef.current) {
            imageUploadRef.current.click()
        }
    }
    const validation = Yup.object().shape({
        images: Yup.array()
            .of(
                Yup.mixed()
                    .test(
                        'fileSize',
                        'Each file must be no larger than 1 MB',
                        value => !value || (value && (value as File).size <= 1 * 1024 * 1024)
                    )
                    .test(
                        'imageResolution',
                        'Image resolution must be 1200x1000 or less',
                        value => {
                            if (!value) return true;

                            return new Promise((resolve) => {
                                const img = new Image();
                                img.onload = () => {
                                    const valid = img.width <= 1200 && img.height <= 1000;
                                    resolve(valid);
                                };
                                img.onerror = () => {
                                    resolve(false);
                                };
                                img.src = URL.createObjectURL(value as Blob);
                            });
                        }
                    )
                    .required("At least four files are required.")
            )
            .required("At least four files are required.")
            .max(4, "Cannot upload more than 4 images.")
            .min(4, "At least four files are required."),
        make: Yup.string()
            .required('please fill the above field.'),
        model: Yup.string()
            .required('please fill the above field.'),
        registration_year: Yup.number()
            .required('please fill the above field.'),
        variant: Yup.string()
            .required('please fill the above field.'),
        registration: Yup.string()
            .required('please fill the above field.'),
        mileage: Yup.number()
            .required('please fill the above field.')
            .moreThan(0, 'mileage can not be zero'),
        owners: Yup.number()
            .required('please fill the above field.')
            .moreThan(0, 'owners can not be zero'),
    })
    const updateValidation = Yup.object().shape({
        images: Yup.array()
            .of(
                Yup.mixed()
                    .test(
                        'fileSize',
                        'Each file must be no larger than 1 MB',
                        value => !value || (value && (value as File).size <= 1 * 1024 * 1024)
                    )
                    .test(
                        'imageResolution',
                        'Image resolution must be 1200x1000 or less',
                        value => {
                            if (!value) return true;

                            return new Promise((resolve) => {
                                const img = new Image();
                                img.onload = () => {
                                    const valid = img.width <= 1200 && img.height <= 1000;
                                    resolve(valid);
                                };
                                img.onerror = () => {
                                    resolve(false);
                                };
                                img.src = URL.createObjectURL(value as Blob);
                            });
                        }
                    )
            )
            .max(4, "Cannot upload more than 4 images."),
        make: Yup.string()
            .required('please fill the above field.'),
        model: Yup.string()
            .required('please fill the above field.'),
        registration_year: Yup.number()
            .required('please fill the above field.'),
        variant: Yup.string()
            .required('please fill the above field.'),
        registration: Yup.string()
            .required('please fill the above field.'),
        mileage: Yup.number()
            .required('please fill the above field.')
            .moreThan(0, 'mileage can not be zero'),
        owners: Yup.number()
            .required('please fill the above field.')
            .moreThan(0, 'owners can not be zero'),
    })
    return (
        <div className="flex flex-col gap-8">
            <div className="px-7 pt-28">
                <div>
                    <Heading heading="Key Information" />
                    <Border />
                </div>
                <div className="py-6">
                    <p className="text-[0.875rem]">
                        step 1 of 7
                    </p>
                    <div className="bg-[#D9D9D9] w-full rounded-full h-5 mt-2">
                        <div className="bg-high-light-color w-[14%] h-full rounded-full px-2 font-semibold text-[0.75rem] text-white flex items-center justify-end">
                            <p>14%</p>
                        </div>
                    </div>
                </div>
                {
                    updateImageArray.length === 0 ? <Formik
                        initialValues={{
                            make: keyInfo.make,
                            model: keyInfo.model,
                            registration_year: keyInfo.miles,
                            variant: keyInfo.variant,
                            registration: keyInfo.registration,
                            mileage: keyInfo.mileage,
                            owners: keyInfo.owners,
                            images: keyInfo.images,
                        }}
                        validationSchema={validation}
                        onSubmit={(values) => {
                            dispatch(reviloActions.setKeyInfo(values))
                            navigate('/about-car')
                        }}
                    >
                        {({ setFieldValue, ...keyInfoForm }) => (
                            <Form>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Make</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('make')} />
                                    {keyInfoForm.touched.make && keyInfoForm.errors.make ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.make}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Model</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('model')} />
                                    {keyInfoForm.touched.model && keyInfoForm.errors.model ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.model}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Variant</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('variant')} />
                                    {keyInfoForm.touched.variant && keyInfoForm.errors.variant ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.variant}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Registration</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('registration')} />
                                    {keyInfoForm.touched.registration && keyInfoForm.errors.registration ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.registration}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Registration Year</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('registration_year')} />
                                    {keyInfoForm.touched.registration_year && keyInfoForm.errors.registration_year ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.registration_year}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Mileage</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('mileage')} />
                                    {keyInfoForm.touched.mileage && keyInfoForm.errors.mileage ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.mileage}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Number of Owners</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('owners')} />
                                    {keyInfoForm.touched.owners && keyInfoForm.errors.owners ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.owners}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Images</label>
                                    <input
                                        type="text"
                                        className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none cursor-pointer"
                                        placeholder="+ Add files"
                                        readOnly
                                        onClick={imageUploadHandler}
                                    />
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        ref={imageUploadRef}
                                        accept="image/jpeg,image/png,image/bmp,image/webp"
                                        onChange={(event) => {
                                            const files = event.currentTarget.files;
                                            const fileArray = [];
                                            for (let i = 0; i < files!.length; i++) {
                                                fileArray.push(files![i]);
                                            }
                                            setFieldValue("images", fileArray);
                                        }}
                                    />
                                    {keyInfoForm.touched.images && keyInfoForm.errors.images ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.images}</div>
                                    ) : null}
                                </div>
                                <button type="button" className="bg-high-light-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4 mr-4" onClick={() => {
                                    navigate('/car-listing')
                                    dispatch(reviloActions.reset())
                                }}>Back</button>
                                <button type="submit" className="bg-main-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4">Continue</button>
                            </Form>)}
                    </Formik> : <Formik
                        initialValues={{
                            make: keyInfo.make,
                            model: keyInfo.model,
                            registration_year: keyInfo.miles,
                            variant: keyInfo.variant,
                            registration: keyInfo.registration,
                            mileage: keyInfo.mileage,
                            owners: keyInfo.owners,
                            images: keyInfo.images,
                        }}
                        validationSchema={updateValidation}
                        onSubmit={(values) => {
                            dispatch(reviloActions.setKeyInfo(values))
                            navigate('/about-car')
                        }}
                    >
                        {({ setFieldValue, ...keyInfoForm }) => (
                            <Form>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Make</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('make')} />
                                    {keyInfoForm.touched.make && keyInfoForm.errors.make ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.make}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Model</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('model')} />
                                    {keyInfoForm.touched.model && keyInfoForm.errors.model ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.model}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Variant</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('variant')} />
                                    {keyInfoForm.touched.variant && keyInfoForm.errors.variant ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.variant}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Registration</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('registration')} />
                                    {keyInfoForm.touched.registration && keyInfoForm.errors.registration ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.registration}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Registration Year</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('registration_year')} />
                                    {keyInfoForm.touched.registration_year && keyInfoForm.errors.registration_year ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.registration_year}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Mileage</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('mileage')} />
                                    {keyInfoForm.touched.mileage && keyInfoForm.errors.mileage ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.mileage}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Number of Owners</label>
                                    <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('owners')} />
                                    {keyInfoForm.touched.owners && keyInfoForm.errors.owners ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.owners}</div>
                                    ) : null}
                                </div>
                                <div className="pb-4">
                                    <label className="text-[0.875rem] font-bold">Images</label>
                                    <input
                                        type="text"
                                        className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none cursor-pointer"
                                        placeholder="+ Add files"
                                        readOnly
                                        onClick={imageUploadHandler}
                                    />
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        ref={imageUploadRef}
                                        accept="image/jpeg,image/png,image/bmp,image/webp"
                                        onChange={(event) => {
                                            const files = event.currentTarget.files;
                                            const fileArray = [];
                                            for (let i = 0; i < files!.length; i++) {
                                                fileArray.push(files![i]);
                                            }
                                            setFieldValue("images", fileArray);
                                        }}
                                    />
                                    {keyInfoForm.touched.images && keyInfoForm.errors.images ? (
                                        <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.images}</div>
                                    ) : null}
                                </div>
                                <button type="button" className="bg-high-light-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4 mr-4" onClick={() => {
                                    navigate('/car-listing')
                                    dispatch(reviloActions.reset())
                                }}>Back</button>
                                <button type="submit" className="bg-main-color text-white py-2 rounded-full text-[1.25rem] font-bold w-32 mt-4">Continue</button>
                            </Form>)}
                    </Formik>
                }
            </div>
            <Footer isShow />
        </div>
    )
}

export default KeyInfoPage;