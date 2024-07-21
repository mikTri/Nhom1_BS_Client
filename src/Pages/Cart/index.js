import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from '@mui/material';
import { MyContext } from "../../App"; // Assuming MyContext controls header/footer visibility
import Logo from '../../assets/images/bookStoreLogo.png';
import '../../App.css';
import FlashSaleSidebar from "../../Components/FlashSaleSidebar";
import { fetchDataFromApi, deleteData, editData } from '../../utils/api';


const Cart = () => {
  // Check if there are items in the cart
  const context = useContext(MyContext);                          //để chia sẻ dữ liệu toàn cầu trong toàn bộ ứng dụng React

  const [cartItems, setCartList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log(`CartPage`);
          console.log(`/api/cart?userId=${context.user?.userId}`);
        fetchDataFromApi(`/api/cart?userId=${context.user?.userId}`).then((response) => {
          console.log(response);
          setCartList(response);
        })
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error gracefully, e.g., display an error message
      }
    };

    fetchBooks(); // Fetch books on component mount
  }); // Empty dependency array ensures fetching only once

  const handleItemQuantityChange = async (Selecteditem, delta) => {
    const editedItem = { ...Selecteditem, quantity: Selecteditem.quantity + delta };
    try {
      // Call the API to update the quantity on the server (adjusted for delta)
      console.log('/api/cart/' + Selecteditem.id, editedItem)
      await editData('/api/cart/' + Selecteditem.id, editedItem)
      const response = await fetchDataFromApi('/api/cart');
      setCartList(response);
    } catch (error) {
      console.error('Error updating carts:', error);
      // Handle error gracefully, e.g., display an error message
    }
  };

  const handleRemoveItem = async (Selecteditem) => {
    try {
      const response = await deleteData('/api/cart/' + Selecteditem.id);
    } catch (error) {
      console.error('Error removing item from cart (API call):', error);
      // Handle error gracefully, e.g., display an error message
    }
    const response = await fetchDataFromApi('/api/cart');
    setCartList(response);
  };

  const hasItems = cartItems && cartItems.length > 0;

  // Calculate total price
  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    
    <div className="Fullcartpage-container">
      <div className="cartpage-container" >
        <h1>Giỏ hàng của bạn</h1>
        {hasItems ? (
          <>
            <div className="cartpage-total-container">
              <p>Tổng tiền:</p>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <ul className="cartpage-items-list" style={{ overflowY: 'auto', maxHeight: '500px' }}> {/* Added styles for scrolling */}
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="item-details">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <div className="product-quantity-control">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleItemQuantityChange(item, -1)}
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                        <span className="quantity">{item.quantity}</span>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleItemQuantityChange(item, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <Button
                    variant="outlined"
                    size="small"
                    className="cartpage-remove-button"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Xóa
                  </Button>
                </li>
              ))}
            </ul>
            <div class="cartpage-button-container">
              <div class="button-wrapper btn-payment-wrapper">
                <Link to="/Payment">
                  <Button variant="contained" className="btn-cart-payment w-100 btn-big">
                    Thanh toán
                  </Button>
                </Link>
              </div>
              <div class="button-wrapper btn-continue-wrapper">
                <Link to="/Home">
                  <Button variant="contained" className="btn-cart-outline btn-big">
                    Mua thêm
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="cartpage-empty">Giỏ hàng của bạn hiện đang trống.</p>
        )}
      </div>
      <FlashSaleSidebar />
    </div>

  );
};

export default Cart;