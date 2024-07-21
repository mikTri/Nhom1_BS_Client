import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { fetchDataFromApi } from '../../utils/api';
import { Link } from 'react-router-dom';

const FlashSale = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Shuffle items on component mount
    const fetchBooks = async () => {
      try {
        // fetchDataFromApi('/api/books').then((response) =>{
        fetchDataFromApi('/api/books/flash-sale-books').then((response) =>{
        console.log(response);
        console.group(response.books);
        setItems(response.books);})
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error gracefully, e.g., display an error message
      }
    };
    setItems(items.sort(() => Math.random() - 0.5));   

  fetchBooks(); // Fetch books on component mount
  },[]);

  const randomItems = items.slice(0, 5); // Pick 5 items

  const completionCallback = () => {
    // Optional actions when countdown finishes (e.g., fetch new items)
    console.log('Countdown finished!');
  };

  return (
    <div className="flashsale">  {/* Main container class remains the same */}
      <h2 className="flashsale__title">Flash Sale</h2>  {/* Title class updated */}
      <div className="flashsale-countdown">  {/* Countdown class updated */}
        <span>Kết thúc trong: </span>
        <Countdown
          date={Date.now() + 2 * 60 * 60 * 1000} // Set your desired duration (2 hours in milliseconds)
          completionCallback={completionCallback}
          renderer={(props) => (
            <span>{props.hours}:{props.minutes}:{props.seconds}</span>
          )}
        />
      </div>
      <div className="flashsale__items">  {/* Items container class updated */}
          {randomItems.map((item) => (
            <li key={item.id}>               
            <Link to={`/product-details/${item.id}`}>
              <img src={item.cover} alt={item.title}/>
              {/* <p className='title-container'>{item.title}</p> */}
              <p className='title-container'>{item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}</p>
              <div className="price">
                <span className="original">{item.basePrice}</span>
                <span className="sale">{item.discountPrice}</span>
              </div>
              </Link>
            </li>
          ))}
      </div>
      <a href="#" className="flashsale__view-all">Xem tất cả</a>  {/* View all button class updated */}
    </div>
  );
};

export default FlashSale;