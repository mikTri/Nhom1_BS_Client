import React, { useContext, useState, useEffect } from "react";
import Countdown from 'react-countdown';
import { fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from "../../App"; // Assuming MyContext controls header/footer visibility
import { Link } from 'react-router-dom';

const FlashSaleSidebar = () => {
  const [items, setItems] = useState([]);
  const context = useContext(MyContext);

  useEffect(() => {
    // Shuffle items on component mount
    const fetchBooks = async () => {
      try {
        fetchDataFromApi("/api/books/get/count").then((res) => {
          console.log("********res: " + res.booksCount);
        }
      );

        fetchDataFromApi('/api/books/flash-sale-books').then((response) => {
          console.log(response);
          console.group(response.books);
          setItems(response.books);
        });
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error gracefully, e.g., display an error message
      }
    };
    setItems(items.sort(() => Math.random() - 0.5));

    fetchBooks(); // Fetch books on component mount
  }, []);

  const [PostForm, setPost] = useState({
    productId: '',
    userId: '',
    productTitle: '',
    image: '',
    price: '',
    quantity: '',
    subTotal: '',
  });

  const handlesetPost = async (product, userId) => {
    try {
      setPost({
        ...PostForm,
        productId: product._id,
        userId: userId,
        productTitle: product.title,
        image: product.cover,
        price: product.discountPrice,
        quantity: 1,
        subTotal: product.discountPrice,
      });
    }catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error gracefully
    }}

    const handleAddToCart = async (product, userId) => {
      try {
        console.log('Add');
        setPost({
          productId: product._id,
          userId: userId,
          productTitle: product.title,
          image: product.cover,
          price: product.discountPrice,
          quantity: 1,
          subTotal: product.discountPrice,
        });
        console.log(PostForm); // Now PostForm has updated values
    
        postData('/api/cart/add', PostForm)
          .then(response => {
            console.log('Item added to cart:', response);
            // Handle successful addition
          })
          .catch(error => {
            console.error('Error adding item to cart:', error);
            // Handle error gracefully
          });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        // Handle error gracefully
      }
    };
  

  const randomItems = items.slice(0, 5); // Pick 5 items

  const completionCallback = () => {
    // Optional actions when countdown finishes (e.g., fetch new items)
    console.log('Countdown finished!');
  };

  return (
    <div className="flashsalesidebar">
      <h2>Flash Sale</h2>
      <div className="flashsalesidebar__countdown">
        <span>Kết thúc trong: </span>
        <Countdown
          date={Date.now() + 2 * 60 * 60 * 1000} // Set your desired duration (2 hours in milliseconds)
          completionCallback={completionCallback}
          renderer={(props) => (
            <span>{props.hours}:{props.minutes}:{props.seconds}</span>
          )}
        />
      </div>
      <ul className="flashsalesidebar__items">
        {randomItems.map((item) => (
          <li key={item.id}   onMouseEnter={() => handlesetPost(item, context.user?.userId)}>
            <Link to={`/product-details/${item.id}`}>
            <img src={item.cover} alt={item.title} />
            <p>{item.title}</p>            </Link>
            <div className="price">
              <span className="original">{item.basePrice}</span>
              <span className="sale">{item.discountPrice}</span>
            </div>
            <button className="Add-Btn" onClick={() => handleAddToCart(item, context.user?.userId)}>+</button>
          </li>
        ))}
      </ul>
      <a href="#" className="flashsalesidebar__view-all">Xem tất cả</a>
    </div>
  );
};

export default FlashSaleSidebar;
