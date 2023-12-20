import { useNavigate } from "react-router-dom";
import { Border, Footer, Heading } from "../commons";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { reviloActions } from "../../features/slice";
import { toast } from "react-toastify";

const Listing = () => {
    const userId = useSelector((state: RootState) => state.userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v1/users/showMe`, { withCredentials: true });
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
    },[])
    const logoutUser = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/api/v1/auth/logout', { withCredentials: true })
            if (response.status === 200) {
                dispatch(reviloActions.resetUser())
                navigate('/')
            }
        } catch (error) {
            toast("Can't logout please try again.")
        }
    }
    return (
        <div>
            <div className="px-7">
                <div>
                    <Heading heading="Listings" />
                    <Border />
                </div>
                <div className="mt-12 flex items-center justify-evenly gap-4">
                    <div className="bg-[#D9D9D9] border-[1px] border-gray-400 text-sm text-gray-500 w-[9.5rem] rounded-lg h-14 flex items-center justify-center cursor-pointer" onClick={() => navigate('/key-information')}>
                        + add a new listing
                    </div>
                    <div className="bg-[#D9D9D9] border-[1px] border-gray-400 text-sm text-gray-500 w-[9.5rem] h-14 flex items-center justify-center rounded-lg cursor-pointer" onClick={() => navigate('/all-listing')}>
                        see all listings
                    </div>
                </div>
                <button type="button" className="bg-main-color text-sm text-white w-full h-14 flex items-center justify-center rounded-lg cursor-pointer mt-4" onClick={logoutUser}>Logout</button>
            </div>
            <Footer absoute />
        </div>
    )
}

export default Listing;