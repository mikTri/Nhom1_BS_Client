import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const CartBar = ({ isVisible, onToggleVisibility, cartItems }) => {
  // Check if there are items in the cart
  const hasItems = cartItems && cartItems.length > 0;

  // Calculate total price
  const totalPrice = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleCart = () => {
    onToggleVisibility && onToggleVisibility(); // Call the provided toggle function
  };

  return (
    <aside className={`cart-bar ${!isVisible ? "hidden" : ""}`}>
      {isVisible && (
        <>
          <h2>Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="item-details">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>Số lượng: {item.quantity}</span>
                  </div>
                </div>
                <span className="item-price">VND {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p>Tổng tiền:</p>
            <span>VND {totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-buttons"> {/* Wrap buttons in a container */}
            <Link to="/Payment">
              <Button variant="contained" className="btn-blue w-100 btn-lg btn-big">
                Thanh toán
              </Button>
            </Link>
            <Link to="/Cart"> {/* Link to the Cart page path */}
              <Button variant="contained" className="btn-outline btn-light w-100 btn-lg btn-big">
                Xem giỏ hàng
              </Button>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
};

export default CartBar;