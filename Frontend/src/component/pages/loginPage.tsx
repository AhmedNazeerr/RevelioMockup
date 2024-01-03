import axios from "axios";
import { Border, Footer, Heading } from "../commons";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { reviloActions } from "../../features/slice";
import { useEffect } from "react";
import { RootState } from "../../features/store";
import { toast } from "react-toastify";

const LoginPage = () => {
    const userId = useSelector((state: RootState) => state.userId)
    const dispatch = useDispatch()
    const validation = Yup.object({
        email: Yup.string()
            .email('invalid email address')
            .required('please fill the above field.'),
        password: Yup.string()
            .required('please fill the above field.'),
    })
    const loginUser = async (values: { email: string, password: string }) => {
        dispatch(reviloActions.showLoaderToogler())
        try {
            const { email, password } = values
            const response = await axios.post('/api/v1/auth/login', { email: email, password: password })
            if (response.status === 200) {
                dispatch(reviloActions.setUser(response.data.user.userId))
                navigate('/car-listing')
            }
        } catch (error) {
            toast("Invalid User.");
        }
        dispatch(reviloActions.showLoaderToogler())
    }
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`/api/v1/users/showMe`);
            dispatch(reviloActions.setUser(data.user.userId));
            navigate('/car-listing')
        } catch (error) {
            dispatch(reviloActions.resetUser())
            navigate('/')
        }
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) {
            navigate('/car-listing')
        } else {
            fetchUser()
        }
    },[])
    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="px-7 pt-28">
                <div>
                    <Heading heading="Login" />
                    <Border />
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={validation}
                    onSubmit={(values, { resetForm }) => {
                        loginUser(values)
                        resetForm()
                    }}
                >
                    {({ ...keyInfoForm }) => (
                        <Form>
                            <div className="pt-4 pb-4">
                                <label className="text-[1.25] font-bold">Email</label>
                                <input type="text" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Enter here..." {...keyInfoForm.getFieldProps('email')} />
                                {keyInfoForm.touched.email && keyInfoForm.errors.email ? (
                                    <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="pb-4">
                                <label className="text-[1.25] font-bold">Password</label>
                                <input type="password" className="bg-[#D9D9D9] w-full text-[0.625rem] p-2 border-[0.5px] border-gray-400 outline-none" placeholder="Pnter here..." {...keyInfoForm.getFieldProps('password')} />
                                {keyInfoForm.touched.password && keyInfoForm.errors.password ? (
                                    <div className="text-[0.45rem] text-red-600 pt-0.5">{keyInfoForm.errors.password}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="bg-main-color text-white py-2 rounded-full text-[1.25] font-bold w-24 mt-2">Login</button>
                        </Form>)}
                </Formik>
            </div>
            <Footer isShow />
        </div>
    )
}

export default LoginPage;