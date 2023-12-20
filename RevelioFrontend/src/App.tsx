import { useDispatch, useSelector } from "react-redux"
import { Alert, Header, LoadingScreen } from "./component/commons"
import { AboutCarPage, AllListingPage, CompletionPage, KeyInfoPage, Listing, LoginPage, PreparationPage, PricePage, ProductPage, ServiceHistoryPage, SpecificationPage } from "./component/pages"
import { RootState } from "./features/store"
import { Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios"
import { reviloActions } from "./features/slice"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.userId)
  const showLoader = useSelector((state: RootState) => state.showLoader)
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
  return (
    <>
      <div className="w-full relative shadow-xl md:max-w-sm min-h-screen mx-auto text-gray-900">
        <Alert />
        <Header />
        {showLoader && <LoadingScreen />}
        <div className="pt-8">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/car-listing" element={<Listing />} />
            <Route path="/all-listing" element={<AllListingPage />} />
            <Route path="/car-display/:id" element={<ProductPage />} />
            <Route path="/key-information" element={<KeyInfoPage />} />
            <Route path="/about-car" element={<AboutCarPage />} />
            <Route path="/specifications" element={<SpecificationPage />} />
            <Route path="/service-history" element={<ServiceHistoryPage />} />
            <Route path="/price" element={<PricePage />} />
            <Route path="/preparation" element={<PreparationPage />} />
            <Route path="/completion" element={<CompletionPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;