import React, { useState } from "react";
import Cart from "../../assets/images/cart.png"
import CartBar from './CartBar'; // Assuming CartBar.jsx is in the same directory


const cartItems = [
    // ... your sample cart items here
];

function ToggleableCartBar({ cartItems }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleCartVisibility = () => {
        setIsVisible(!isVisible);
    };

    const numberOfItems = cartItems.length; // Calculate the number of items

    return (
        <div>
            <button onClick={toggleCartVisibility}>
                <span className="cart-badge">{numberOfItems} </span>
                <img src={Cart} alt="Cart Icon" className="cart-badge-icon" />
            </button>
            {isVisible && <CartBar isVisible={isVisible} onToggleVisibility={toggleCartVisibility} cartItems={cartItems} />}
        </div>
    );
}

export default ToggleableCartBar;