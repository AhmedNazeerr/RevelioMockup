import { useSelector } from 'react-redux';
import loader from '../../assets/loader.gif'
import { RootState } from '../../features/store';

const LoadingScreen = () => {
    const showUploadMessage = useSelector((state: RootState) => state.showUploadMessage)
    return (
        <>
            <div className="w-full h-full bg-[#0000002e] absolute top-0 right-0 flex flex-col items-center justify-center">
                <img src={loader} alt="loading..." loading="eager" className="w-14 h-14" />
                {showUploadMessage && <div className='mt-10 font-medium text-center text-[1.125rem] text-high-light-color'>
                    <p className='drop-shadow-xl'>Product is uploading</p>
                    <p className='drop-shadow-xl'>Please wait</p>
                </div>}
            </div>
        </>
    )
}

export default LoadingScreen;