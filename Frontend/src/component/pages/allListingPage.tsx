import { Border, Footer, Heading } from "../commons";
import { ProductCard } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "../../features/store";
import axios from "axios";
import { reviloActions } from "../../features/slice";
import { toast } from "react-toastify";

const AllListingPage = () => {
    const userId = useSelector((state: RootState) => state.userId)
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const deleteProduct = async (id: string) => {
        dispatch(reviloActions.showLoaderToogler())
        try {
            const response = await axios.delete(`http://149.100.156.7:5000/api/v1/products/${id}`, { withCredentials: true })
            if (response.status === 200) {
                toast('Product is deleted.')
                getAllProducts()
            }
        } catch (error) {
            toast("Can't delete product please try again.")
        }
        dispatch(reviloActions.showLoaderToogler())
    }
    const getAllProducts = async () => {
        dispatch(reviloActions.showLoaderToogler())
        try {
            const response = await axios.get('http://149.100.156.7:5000/api/v1/products', { withCredentials: true })
            if (response) {
                setProducts(response.data.products)
            }
        } catch (error) {
            toast("Can't fetch products please try again.")
        }
        dispatch(reviloActions.showLoaderToogler())
    }
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
        getAllProducts()
    }, [])

    useEffect(() => {
        if (!userId) {
            fetchUser()
        }
    }, [])
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="px-7 pt-28">
                <div className="pb-4 flex items-center justify-between">
                    <div>
                        <Heading heading="All Listings" />
                        <Border />
                    </div>
                    <div className="flex cursor-pointer py-1.5 px-3 rounded items-center gap-1 text-xs bg-main-color text-white" onClick={() => navigate('/car-listing')}>
                        <i className="fa-solid fa-arrow-left"></i>
                        <p>Main Menu</p>
                    </div>
                </div>
                <div>
                    <div className="text-[0.875rem] border-b-[1px] border-b-gray-400 flex justify-between text-black font-semibold">
                        <p>Name</p>
                        <div className="flex gap-3">
                            <p>CopyURL</p>
                            <p>Edit</p>
                            <p>Trash</p>
                        </div>
                    </div>
                    <div className="pb-5">
                        {
                            products.length > 0 && products.map((item, idx) => <ProductCard key={idx} deleteProduct={deleteProduct} item={item} />)
                        }
                    </div>
                </div>
            </div>
            <Footer isShow />
        </div>
    )
}

export default AllListingPage;