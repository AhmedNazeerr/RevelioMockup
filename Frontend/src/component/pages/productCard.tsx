import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { reviloActions } from '../../features/slice';
import { toast } from 'react-toastify';
const ProductCard: React.FC<{ item: { make: string, model: string, variant: string, images: string[], _id: string }, deleteProduct: (id: string) => void }> = ({ item, deleteProduct }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const copyToClipboard = async (text: string) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                toast('Copied to clipboard');
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                toast('Copied to clipboard');
            }
        } catch (err) {
            console.error('Failed to copy text to clipboard:', err);
            toast('Failed to copy text to clipboard');
        }
    };
    const updateProduct = async () => {
        try {
            const response = await axios.get(`http://149.100.156.7:5000/api/v1/products/${item._id}`)
            if (response.status === 200) {
                dispatch(reviloActions.set(response.data.product))
                navigate('/key-information')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="text-[0.8rem] border-b-[1px] border-b-gray-400 flex justify-between items-center py-0.5">
            <div className="flex items-start w-48 gap-0.5 cursor-pointer text-[1rem]" onClick={() => navigate(`/car-display/${item._id}`)}>
                <img src={item.images[0]} loading="lazy" alt="img" className="w-14 h-9 object-contain" />
                <div className='flex gap-x-1 text-left flex-wrap'>
                    {item.make && <p>{item.make}</p>}
                    {item.model && <p>{item.model}</p>}
                    {item.variant && <p>{item.variant}</p>}
                </div>
            </div>
            <div className="text-gray-500 text-[0.8rem] flex gap-10 pr-2.5">
                <i className="fa-regular fa-copy pr-1 cursor-pointer" onClick={() => copyToClipboard(`http://localhost:5173/car-display/${item._id}`)}></i>
                <i className="fa-solid fa-pen cursor-pointer" onClick={updateProduct}></i>
                <i className="fa-regular fa-trash-can cursor-pointer" onClick={() => deleteProduct(item._id)}></i>
            </div>
        </div>
    )
}

export default ProductCard;