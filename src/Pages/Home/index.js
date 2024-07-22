import HomeBanner from "../../Components/HomeBanner";
import { useContext,useState,useEffect } from "react";
import ToggleableCartBar    from "../../Components/ToggleableCartBar";
import Leaderboard from "../../Components/Leaderboard";
import FlashSale from "../../Components/FlashSale";
import { MyContext } from '../../App';

import BookPreview from "../../Components/BookPreview";

import banner1 from "../../assets/images/banner1.png"

import Button from '@mui/material/Button';

import { TfiAngleDoubleRight } from "react-icons/tfi";

import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

import { fetchDataFromApi } from '../../utils/api';

import book from '../../assets/images/book.png';
import { Rating } from "@mui/material";

const Home = ()=>{

    var productSliderOptions = {
        items: 1,
        nav: true,
        rewind: true,
        autoplay: true
      };
      const context = useContext(MyContext);                          //để chia sẻ dữ liệu toàn cầu trong toàn bộ ứng dụng React

      const [bookList, setBookList] = useState([]); // Initialize bookList state
      const [Items, setCartList] = useState([]);

      useEffect(() => {
        const fetchBooks = async () => {
          try {
            // fetchDataFromApi('/api/books').then((response) =>{
            fetchDataFromApi('/api/books/random-books').then((response) =>{
            console.log(response);
            console.group(response.books);
            setBookList(response.books);})

          } catch (error) {
            console.error('Error fetching books:', error);
          }
        };
    
        fetchBooks(); // Fetch books on component mount
      }, []); // Empty dependency array ensures fetching only once
    
    return (
      <>
        <HomeBanner />

        <FlashSale />
        
        <BookPreview bookList={bookList}/>
        
        <Leaderboard />
        
      </>
    )
}

export default Home;