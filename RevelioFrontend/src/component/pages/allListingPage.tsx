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
            const response = await axios.delete(`http://localhost:5000/api/v1/products/${id}`, { withCredentials: true })
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
            const response = await axios.get('http://localhost:5000/api/v1/products', { withCredentials: true })
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
        getAllProducts()
    }, [])
    return (
        <div>
            <div className="px-7">
                <div className="pb-4">
                    <Heading heading="All Listings" />
                    <Border />
                </div>
                <div>
                    <div className="text-[0.5rem] border-b-[1px] border-b-gray-400 flex justify-between text-gray-500">
                        <p>Name</p>
                        <div className="flex gap-3">
                            <p>CopyURL</p>
                            <p>Edit</p>
                            <p>Delete</p>
                        </div>
                    </div>
                    <div className="pb-32">
                        {
                            products.length ? products.map((item, idx) => <ProductCard key={idx} deleteProduct={deleteProduct} item={item} />) : <p className="text-center text-high-light-color font-semibold text-sm pt-10">No product found</p>
                        }
                    </div>
                </div>
            </div>
            <Footer absoute />
        </div>
    )
}

export default AllListingPage;