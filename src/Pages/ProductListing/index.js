import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const ProductListing = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState("four");
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterId, setFilterId] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const openDropdown = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchProductsData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchDataFromApi("/api/books");
                setProductsData(response.books);
            } catch (error) {
                console.error("Error fetching products data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsData();
    }, []);

    return (
        <>
          <section className="product_Listing_Page">
            <div className="container">
              <div className="productListing d-flex">    
                <div className="content_right">    
                  {/* hiển thị sách (Displaying books) */}
                  <div className="productListing">
                    {isLoading === true ? (
                      <div className="loading d-flex align-items-center justify-content-center">
                        <CircularProgress color="inherit" />
                      </div>
                    ) : (
                      <div className="productGrid">
                        {productsData.map((product) => (
                          <ProductItem key={product._id} props={product._id} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {context.windowWidth < 992 && (
            <>
              {context.isOpenNav === false && (
                <div className="fixedBtn row">
                  <div className="col">
                    <Button className="btn-blue bg-red btn-lg btn-big">
                      <FaFilter />
                      {isOpenFilter === true ? "Close Filters" : "Open Filters"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      );
    };
    
    export default ProductListing;