import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from '@mui/material';
import { MyContext } from "../../App"; // Assuming MyContext controls header/footer visibility
import Logo from '../../assets/images/bookStoreLogo.png';
import '../../App.css';
import { fetchDataFromApi, postData } from "../../utils/api";

const Payment = () => {
    const context = useContext(MyContext); // Assuming MyContext controls header/footer visibility

    const [cartItems, setCartList] = useState([]);
  
    useEffect(() => {
        //context.setIsHeaderFooterShow(false); // Hide header and footer
        context.setCartShow(false);

      const fetchBooks = async () => {
        try {
          fetchDataFromApi(`/api/cart?userId=${context.user?.userId}`).then((response) => {
            setCartList(response);
          })
        } catch (error) {
          console.error('Error fetching books:', error);
          // Handle error gracefully, e.g., display an error message
        }
      };
  
      fetchBooks(); // Fetch books on component mount
    },[]); // Empty dependency array ensures fetching only once
    const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        amount: totalPrice,
        paymentId: '',
        email: context.user?.email,
        userid: context.user?.userId,
        products: cartItems,
    });

    const handleInputChange = (event) => {
        setPaymentDetails({
            ...paymentDetails,
            [event.target.name]: event.target.value,
        });
    };

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();
        // Use your payment processing library to handle payment with paymentDetails
        try {
            console.log(paymentDetails)
            postData('/api/orders/create', paymentDetails)
            .then((res) => {
                if (res.error !== true) {
                context.setAlertBox({
                    open: true,
                    error: false,
                    msg: "Đơn hàng đăng ký thành công!"
                });}})
        } catch (error) {
            console.error("Payment failed:", error);
            // Handle payment failure (e.g., display error message)
        }
    };

        return (
            <section className={`PM-section PM-paymentPage`}>
              <div className="PM-shape-bottom"></div>
          
              <div className="PM-container">
                <div className="PM-box card p-3 shadow border-0">
                  <div className="text-center">
                    <img src={Logo} alt="Logo" />
                  </div>
          
                  <h2 className="mb-3 d-flex align-items-center justify-content-center">Thanh toán (Payment)</h2> {/* English in parentheses */}
          
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="row">
                      {/* Billing Information */}
                      <div className="PM-col-md-6">
                        <div className="PM-form-group">
                          <TextField
                            label="Họ và Tên (Full Name)" // Vietnamese and English labels
                            name="name"
                            type="text"
                            required
                            variant="standard"
                            className="PM-textField-fullName w-100" // Unique class name
                            value={paymentDetails.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="PM-form-group">
                          <TextField
                            label="Số điện thoại (Phone Number)" // Vietnamese and English labels
                            name="phoneNumber"
                            type="tel" // Input type for phone number
                            required
                            variant="standard"
                            className="PM-textField-phoneNumber w-100" // Unique class name
                            value={paymentDetails.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="PM-form-group">
                          <TextField
                            label="Số Tài Khoản (Card Number)" // Vietnamese and English labels (optional)
                            name="paymentId"
                            type="text" // Use 'text' to allow various characters
                            required
                            variant="standard"
                            className="PM-textField-cardNumber w-100" // Unique class name
                            value={paymentDetails.paymentId}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
          
                      {/* Shipping Information */}
                      <div className="PM-col-md-12">
                        <div className="PM-form-group">
                          <TextField
                            label="Địa chỉ giao hàng (Shipping Address)" // Vietnamese and English labels
                            name="address"
                            type="text"
                            multiline
                            rows={4}
                            required
                            variant="standard"
                            className="PM-textField-shippingAddress w-100" // Unique class name
                            value={paymentDetails.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
          
                    <Button type="submit" className="btn-blue w-100 btn-lg btn-big">
                      Thanh toán (Pay Now)
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          );
};

export default Payment;