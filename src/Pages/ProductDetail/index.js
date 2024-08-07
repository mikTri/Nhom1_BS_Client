import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { MdOutlineCompareArrows } from "react-icons/md";

import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";

import { fetchDataFromApi, postData, deleteData } from "../../utils/api";
import { MyContext } from "../../App";

// import ProductZoom from "../../Components/ProductZoom";
import QuantityBox from "../../Components/QuantityBox";
// import RelatedProducts from "./RelatedProducts";
import img from "../../assets/images/no-user.jpg";

const ProductDetails = () => {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddedToMyList, setIsAddedToMyList] = useState(false);
    const { id } = useParams(); // Get product id from URL parameter
    const context = useContext(MyContext);

    const [PostForm, setPost] = useState({
        productId: '',
        userId: '',
        productTitle: '',
        image: '',
        price: '',
        quantity: 1,
        subTotal: '',
    });

    const [PostForm2, setPost2] = useState({
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
                productId: product._id,
                userId: userId,
                productTitle: product.title,
                image: product.cover,
                price: product.discountPrice,
                quantity: 1,
                subTotal: product.discountPrice,
            });
        } catch (error) {
            console.error('Error handle item to cart:', error);
            // Handle error gracefully
        }
    }

    const handlesetPost2 = async (product, userId) => {
        try {
            setPost2({
                ...PostForm2,
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

    const handleAddToCart = async (product, userId) => {
        try {
            console.log(product._id);
            console.log(userId);

            // Update PostForm state
            setPost({
                productId: product._id,
                userId: userId,
                productTitle: product.title,
                image: product.cover,
                price: product.discountPrice,
                quantity: 1,
                subTotal: product.discountPrice,
            });

            postData('/api/cart/add', PostForm)
                .then(response => {
                    console.log('Item added to cart:', response);
                    context.setCartChange(true);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Thêm sản phẩm thành công!"
                    });
                })
                .catch(error => {
                    console.error('Error adding item to cart:', error);
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Thêm sản phẩm thất bại!"
                    });
                });
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleAddToMyList = async (product, userId) => {
        if (!isAddedToMyList) {
            setPost2({
                productId: product._id,
                userId: userId,
                productTitle: product.title,
                image: product.cover,
                price: product.discountPrice,
                rating: product.rating
            });

            postData('/api/my-list/add', PostForm2)
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
            const responsefetch = await fetchDataFromApi(`/api/my-list/?userId=${context.user?.userId}&productId=${id}`);
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

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchDataFromApi(`/api/books/get-single-book/${id}`);
                console.log(response);
                setProductData(response);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductData();

        const fetchProductMyListstate = async () => {
            try {
                const response = await fetchDataFromApi(`/api/my-list/?userId=${context.user?.userId}&productId=${id}`);
                if (response.length > 0) { setIsAddedToMyList(true) }
            } catch (error) {
                console.error("Error fetching product MyList state:", error);
            }
        }
        fetchProductMyListstate();

    }, [context.user,isAddedToMyList]);




    // thu gọn cột Mô tả sách:
    const [expandedRows, setExpandedRows] = useState({});
    const toggleRowExpansion = (id) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };
    const renderDescription = (description, id) => {
        const isExpanded = expandedRows[id];
        const shortDescription = description.length > 500 ? `${description.substring(0, 500)}...` : description;
        return (
            <div>
                {isExpanded ? description : shortDescription}
                {description.length > 500 && (
                    <Button color="primary" onClick={() => toggleRowExpansion(id)}>
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </Button>
                )}
            </div>
        );
    };



    return (
        <div className="product-details-container">
            <div className="row">
                {/* Image section */}
                <div className="col-md-4 pl-5 part1">
                    {isLoading ? (
                        <img src={img} alt="Loading..." />
                    ) : productData ? (
                        <img src={productData.cover} alt="Product" />
                    ) : null}
                </div>


                {/* Product information section */}
                <div className="col-md-7 pl-5 pr-5 part2">
                    {isLoading ? (
                        <CircularProgress />
                    ) : productData ? (
                        <li onMouseEnter={() => handlesetPost(productData, context.user?.userId)}>
                            <h2 >{productData.title}</h2>
                            <ul className="list list-inline d-flex align-items-center">
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="mr-5">Tác giả: </span>&nbsp;
                                        <strong><span>{productData.author}</span></strong>

                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="cursor ml-3"> | Thể loại: </span> &nbsp;
                                        <strong><span>{productData.genres}</span></strong>

                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="cursor ml-3"> | NXB: </span> &nbsp;
                                        <strong><span>{productData.publisher || "ABC"}</span></strong>

                                    </div>
                                </li>
                                <li className="list-inline-item">
                                    <div className="d-flex align-items-center">
                                        <span className="cursor ml-3"> | Đánh giá: </span> &nbsp;
                                        <Rating name="read-only" value={productData.rating} precision={0.5} readOnly size="small" />
                                    </div>
                                </li>
                            </ul>

                            <div className="d-flex info mb-3">
                                <span className="newPrice">VND {productData.basePrice}</span>
                            </div>

                            {/* <p className="mt-3">Nội dung: {productData.description}</p> */}
                            <div className="mt-3"><strong>Nội dung:</strong> {renderDescription(productData.description, productData._id)}</div>


                            <div className="d-flex align-items-center mt-3 actions_">
                                {/* Quantity selection */}
                                <div>
                                    <QuantityBox />
                                </div>

                                {/* Add to cart button */}
                                <div className="d-flex align-items-center btnActions">
                                    <Button className="btn-blue btn-big" onClick={() => handleAddToCart(productData, context.user?.userId)}>
                                        <BsCartFill /> &nbsp;
                                        Thêm vào giỏ hàng
                                    </Button>

                                    {/* Add to wishlist button */}
                                    <Tooltip className="btn-blue" onMouseEnter={() => handlesetPost2(productData, context.user?.userId)} title={`${isAddedToMyList === true ? 'Added to Wishlist' : 'Thêm vào danh sách của tôi'}`} placement="top">
                                        <Button className="btn-blue" onClick={() => handleAddToMyList(productData, context.user?.userId)}>
                                            {isAddedToMyList ? <FaHeart /> : <FaRegHeart />}
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </li>
                    ) : (
                        <p>Không tìm thấy sản phẩm.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;