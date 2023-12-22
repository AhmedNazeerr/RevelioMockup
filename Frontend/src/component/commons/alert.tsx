import { ToastContainer } from "react-toastify";


const Alert: React.FC = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
        />
    )
}

export default Alert;