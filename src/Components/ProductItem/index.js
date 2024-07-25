import { useContext, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosImages } from "react-icons/io";
import { TfiFullscreen } from "react-icons/tfi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { fetchDataFromApi, postData, deleteData } from '../../utils/api';
import { MyContext } from '../../App';

const ProductItem = ({ props }) => {

    const [product, setProduct] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);
    const context = useContext(MyContext);

    const sliderRef = useRef();

    const [PostForm, setPost] = useState({
        productTitle: '',
        image: '',
        rating: '',
        price: '',
        productId: '',
        userId: '',
    });

    const handlesetPost = async (product, userId) => {
        try {
            setPost({
                ...PostForm,
                productTitle: product.title,
                rating: product.rating,
                image: product.cover,
                price: product.discountPrice,
                productId: product._id,
                userId: userId,
            });
        } catch (error) {
            console.error('Error handle item to Mylist:', error);
            // Handle error gracefully
        }
    }

    const handleAddToMyList = async (product, userId) => {
        if (!isAddedToMyList) {
            setPost({
                productId: product._id,
                userId: userId,
                productTitle: product.title,
                image: product.cover,
                price: product.discountPrice,
                rating: product.rating
            });

            postData('/api/my-list/add', PostForm)
                .then(response => {
                    console.log('Item added to MyList:', response);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Thêm sản phẩm yêu thích thành công!"
                    });
                    setIsAddedToMyList(!isAddedToMyList)
                })
                .catch(error => {
                    console.error('Error adding item to MyList:', error);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Thêm sản phẩm yêu thích thất bại!"
                    });
                });
        }
        else {
            const responsefetch = await fetchDataFromApi(`/api/my-list/?userId=${context.user?.userId}&productId=${props}`);
            console.log('res')
            console.log(responsefetch)
            const DelId = responsefetch[0].id;
            console.log(DelId)
            deleteData('/api/my-list/' + DelId)
                .then(response => {
                    console.log('Item removed from MyList:', response);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Xoá sản phẩm yêu thích thành công!"
                    });
                    setIsAddedToMyList(!isAddedToMyList)
                })
                .catch(error => {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Xóa sản phẩm yêu thích thất bại!"
                    });
                    console.error('Error removing item from MyList:', error);
                });
        }
    }

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

        const fetchProductMyListstate = async () => {
            try {
                const response = await fetchDataFromApi(`/api/my-list/?userId=${context.user?.userId}&productId=${props}`);
                if (response.length > 0) { setIsAddedToMyList(true) }
            } catch (error) {
                console.error("Error fetching product MyList state:", error);
            }
        }
        fetchProductMyListstate();
    }, [props, isAddedToMyList]);


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


                    {/* thêm vào MyList */}
                    <div className="actions">
                        <Button ><TfiFullscreen /></Button>
                        <Tooltip onMouseEnter={() => handlesetPost(product, context.user?.userId)} title={`${isAddedToMyList === true ? 'Đã thêm vào danh sách yêu thích' : 'Thêm vào danh sách của tôi'}`} placement="bottom">
                            <Button onClick={() => handleAddToMyList(product, context.user?.userId)} className={isAddedToMyList === true ? 'active' : ``} >
                                {
                                    isAddedToMyList === true ?
                                        <FaHeart style={{ fontSize: '20px' }} /> :
                                        <IoMdHeartEmpty style={{ fontSize: '20px' }} />
                                }
                            </Button>
                        </Tooltip>
                    </div>

                </div>


                {/* giá bán */}
                <div className="info">

                    <Link to={`/product/${product._id}`}><h4>{product?.title?.length > 60 ? `${product?.title?.slice(0, 60)}...` : product?.title}</h4></Link> {/* Use product.title for dynamic title */}
                    <span className="text-success d-block">{product.author}</span>


                    <Rating className="mt-2 mb-2" name="read-only" value={product.rating || 0} readOnly size="small" precision={0.5} />

                    {/* <div className="d-flex"> */}
                    <div className="newPrice text-danger ml-2">{product.discountPrice || product.basePrice} VND </div> {/* Display either discountPrice or basePrice */}
                    {product.discountPrice && (
                        <div className="oldPrice">{product.basePrice} VND</div>
                    )}
                    {/* </div> */}
                </div>

            </div>




            {/*<ProductModal/> */}
        </>
    )
}

export default ProductItem