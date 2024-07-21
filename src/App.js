// CSS
import './App.css';
import './responsive.css';
import "bootstrap/dist/css/bootstrap.min.css";


// 
import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios';

// Pages
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ToggleableCartBar from './Components/ToggleableCartBar';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import MyAccount from './Pages/MyAccount';
import Contact from './Pages/Contact';
import PaymentMethodPolicy from './Pages/PaymentMethodPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import DeliveryPolicy from './Pages/DeliveryPolicy';
import AboutUs from './Pages/AboutUs';
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetail";
import Payment from "./Pages/Payment";
import Cart from './Pages/Cart';



import { Snackbar, Alert } from '@mui/material';
import { fetchDataFromApi, postData } from "./utils/api";



const MyContext = createContext();        //để chia sẻ dữ liệu toàn cầu trong toàn bộ ứng dụng React

function App() {

  // COUNTRIES: lấy danh sách các quốc gia
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  // HEADER & FOOTER: trạng thái hiện thị hay không
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isCartShow, setCartShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const [isOpenProductModal, setisOpenProductModal] = useState(false);
  const [productData, setProductData] = useState([]);

  //ALERT: hiển thị thông báo
  const [alertBox, setAlertBox] = useState({
    msg: '',
    error: false,
    open: false
  })

  //USER: cập nhật thông tin user đăng nhập 
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: ""
  })
  const [Items, setCartList] = useState([]);


  //COUNTRIES: gọi hàm getCountry một lần sau khi component được render lần đầu tiên 
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");





  }, []);


  //LOGIN: kiểm tra và xử lý trạng thái đăng nhập của user dựa trên dữ liệu trong localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");                  //Lấy giá trị của token từ localStorage
    if (token !== "" && token !== undefined && token !== null) {  //nếu token <> null && <> rỗng && được xác định thì isLogin=true
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));  //gán giá trị user cho userData
      setUser(userData);
      const fetchBooks = async () => {
        try {
          fetchDataFromApi(`/api/cart?userId=${userData.userId}`).then((response) =>{
              console.log('cart');
              console.log(response);
              setCartList(response);})
        } catch (error) {
          console.error('Error fetching books:', error);
          // Handle error gracefully, e.g., display an error message
        }
      };
  
      fetchBooks();
      const intervalId = setInterval(fetchBooks, 2000);

  // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    } else {                                                      //ngược lại
      setIsLogin(false);
    }
  }, [isLogin]);                                                  //useEffect sẽ chạy lại mỗi khi isLogin thay đổi


  //COUNTRIES: lấy dữ liệu từ API (thư viện Axios để gửi yêu cầu HTTP GET đến một URL)
  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data) //phản hồi từ server chứa dữ liệu trong trường data, và dữ liệu quốc gia được trả về nằm trong mảng data
      // console.log(res.data.data[0].country)
    })
  }

  //ALERT: xử lý đóng AlertBox khi user thực hiện một hành động cụ thể
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }   //clickaway: người dùng đã nhấp chuột ra ngoài vùng cảnh báo và không muốn làm gì thêm
    setAlertBox({ open: false });             //ẩn đi hộp cảnh báo trên giao diện
  };



  const openProductDetailsModal = (id, status) => {
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setProductData(res);
      setisOpenProductModal(status);
    })
  }



  //values: để truyền các giá trị và hàm setter
  const values = {
    countryList,
    setSelectedCountry,
    selectedCountry,

    isHeaderFooterShow,
    setIsHeaderFooterShow,


    isCartShow,
    setCartShow,

    isLogin,
    setIsLogin,

    user,
    setUser,

    alertBox,
    setAlertBox,


    isOpenProductModal,
    setisOpenProductModal,

    openProductDetailsModal

  }


  return (
    // BrowserRouter là một thành phần cung cấp bởi react-router-dom, để bọc các thành phần của ứng dụng React và cung cấp định tuyến (routing) cho các trang và thành phần của ứng dụng. 
    // Nó sử dụng HTML5 history API (History của trình duyệt) để xử lý các thay đổi URL mà không làm tải lại toàn bộ trang.
    <BrowserRouter>
      <MyContext.Provider value={values}>     {/* <MyContext.Provider> bạn cung cấp là để cung cấp giá trị của values cho MyContext.  */}

        {/* ALERT: Hiển thị dòng thông báo trên giao diện */}
        <Snackbar open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
          className="snackbar"
        >
          <Alert onClose={handleClose}
            severity={alertBox.error === false ? "success" : 'error'}   //thông báo thành công hay thất bại
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>


        {/* HEADER: chỉ hiển thị <Header/> khi isHeaderFooterShow=true */}
        {
          isHeaderFooterShow === true && <Header />
        }
        {/* <Header/> */}
        {
          isCartShow === true && <ToggleableCartBar cartItems= {Items} />
        }

        {/* ROUTES: các đường dẫn */}
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          <Route exact={true} path="/my-account" element={<MyAccount />} />
          <Route exact={true} path="/contact" element={<Contact />} />
          <Route exact={true} path="/payment-method-policy" element={<PaymentMethodPolicy />} />
          <Route exact={true} path="/refund-policy" element={<RefundPolicy />} />
          <Route exact={true} path="/delivery-policy" element={<DeliveryPolicy />} />
          <Route exact={true} path="/about-us" element={<AboutUs />} />
          <Route exact={true} path="/product-listing" element={<ProductListing />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route exact={true} path="/Payment" element={<Payment />} />
          <Route exact={true} path="/Cart" element={<Cart />} />


        </Routes>


        {/* FOOTER: chỉ hiển thị <Footer /> khi isHeaderFooterShow=true*/}
        {
          isHeaderFooterShow === true && <Footer />
        }
        {/* <Footer /> */}

      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext }
