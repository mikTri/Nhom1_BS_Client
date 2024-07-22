import { useContext, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosImages } from "react-icons/io";
import { TfiFullscreen } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";

import { fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';

import img from "../../assets/images/no-user.jpg";


const ProductItem = ({ props }) => {

    const [product, setProduct] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);
  
    const context = useContext(MyContext);
  
    const sliderRef = useRef();

    var settings = {
        dots: true,
        infinite: true,
        loop: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: 100
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchDataFromApi(`/api/books/get-single-book/${props}`);
            console.log(response);
            setProduct(response);
            setIsLoading(false);
        }
        fetchData();
    }, [props]);


    return (
        <>
            <div className='productItem'>
                <div className="img_rapper">

                    {/* Link tới chi tiết sản phẩm */}
                    <Link to={`/product-details/${product._id}`}> {/* Use product._id for dynamic routing */}

                        {/* hình ảnh */}
                        <div className='productItemSliderWrapper'>
                            {
                                product.cover && !isLoading ? ( // Check for cover existence and loading state
                                    <Slider {...settings} ref={sliderRef} className='productItemSlider'>
                                        {
                                            <div className='slick-slide'>
                                                <img src={product.cover} className="w-100" alt="" />
                                            </div>
                                        }
                                    </Slider>
                                ) : (
                                    <Skeleton variant="rectangular" width={300} height={400}><IoIosImages /></Skeleton>
                                )
                            }
                        </div>


                    </Link>

                    {/* discount */}
                    {product.discountPercent && (
                        <span className="badge badge-primary">{product.discountPercent}%</span>
                    )}


                    {/* thêm vào giỏ hàng */}
                    <div className="actions">
                        <Button ><TfiFullscreen /></Button>

                        <Button className={isAddedToMyList === true ? 'active' : ``} >
                            {
                                isAddedToMyList === true ?
                                    <FaHeart style={{ fontSize: '20px' }} /> :
                                    <IoMdHeartEmpty style={{ fontSize: '20px' }} />
                            }
                        </Button>

                    </div>

                </div>


                {/* giá bán */}
                <div className="info">
                    <Link to={`/product/${product._id}`}><h4>{product.title}</h4></Link> {/* Use product.title for dynamic title */}
                    <span className="text-success d-block">{product.author}</span>


                    <Rating className="mt-2 mb-2" name="read-only" value={product.rating || 0} readOnly size="small" precision={0.5} />

                    <div className="d-flex">
                        <span className="newPrice text-danger ml-2">{product.discountPrice || product.basePrice}VND </span> {/* Display either discountPrice or basePrice */}
                        {product.discountPrice && (
                            <span className="oldPrice">{product.basePrice}VND</span>
                        )}
                    </div>
                </div>

            </div>




            {/*<ProductModal/> */}
        </>
    )
}

export default ProductItem