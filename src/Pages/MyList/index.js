import { useContext, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import ProductItem from "../../Components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

const MyList = () => {
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenFilter, setIsOpenFilter] = useState(false);


    const context = useContext(MyContext);

    useEffect(() => {
        const fetchProductsData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchDataFromApi(`/api/my-list/?userId=${context.user?.userId}`);
                setProductsData(response);
            } catch (error) {
                console.error("Error fetching products data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsData();
    }, [context.user]);

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
                          <ProductItem key={product.productId} props={product.productId} />
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
    
    export default MyList;