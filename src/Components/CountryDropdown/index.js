import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

import { MyContext } from '../../App';


//POPUP Transition: tạo hiệu ứng trược lên của bảng pop up
const Transition = React.forwardRef(function Transition(props, ref) {
                                                                    return <Slide direction="up" ref={ref} {...props} />;
                                                                    });


const CountryDropdown = () => {

    //hook useState để tạo biến trạng thái isOpenModal mà hàm cập nhật trạng thái setIsOpenModal
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);
    const [countryList, setCountryList] = useState([]);
    
    const context = useContext(MyContext);      //để chia sẻ dữ liệu toàn cầu trong toàn bộ ứng dụng React

    //SELECT COUNTRY: chọn country và các thao tác, cập nhật state selectedTab, isOpenModal và gán selectedCountry
    const selectCountry = (index, country) => {
                                            setSelectedTab(index);
                                            setIsOpenModal(false);
                                            context.setSelectedCountry(country);
                                            }
    
    //COUNTRY LIST: cập nhật countryList từ context vào state countryList của component khi component được render lần đầu tiên
    useEffect(() => {
        setCountryList(context.countryList);
    }, [])

    //COUNTRY SEARCH: filter theo keyword
    const filterList = (e) => {
                            const keyword = e.target.value.toLowerCase();
                            if (keyword !== "") {                           //hiển thị danh sách với các item có xuất hiện keyword
                                const list = countryList.filter((item) => {
                                                                        return item.country.toLowerCase().includes(keyword);
                                                                        });
                                setCountryList(list);
                            } 
                            else {
                                setCountryList(context.countryList);        //hiển thị theo danh sách ban đầu nếu keyword===""
                            }
                        }



    return (
        <>  
            {/* COUNTRY DROPDOWN button */}
            <Button className='countryDrop' 
                    title='chọn địa điểm'
                    onClick={() => {setIsOpenModal(true);
                                    setCountryList(context.countryList);
                                    }}
            >
                <div className='info d-flex flex-column'>
                    <span className='label'>Địa điểm</span>
                    
                    {/* show selected location */}
                    <span className='name'>
                        {context.selectedCountry && context.selectedCountry.length !== 0 ?      //nếu đã chọn 1 country cụ thể thì
                        (context.selectedCountry.length > 10 ? `${context.selectedCountry.substr(0, 10)}...` : context.selectedCountry) :   //nếu số ký tự country > 10 thì hiển thị 10 ký tự đầu tiên, else hiện đầy đủ
                        ('Địa điểm của bạn')                                                    //else nếu chưa chọn một địa điểm nào thì hiển thị dòng bên dưới
                        }
                    </span>
                    {/* <span className='name'>Thu Duc</span> */}
                </div>

                {/* icon dropdown */}
                <span className='ml-auto'><FaAngleDown /></span>
            </Button>


            {/* COUNTRY SELECTION BOX: hiện thị danh sách địa điểm để lựa chọn */}
            <Dialog open={isOpenModal} 
                    onClose={() => setIsOpenModal(false)} 
                    className='locationModal' 
                    TransitionComponent={Transition}
            >
                <h4 className='mb-0'>Vui lòng chọn địa điểm giao hàng</h4>
                <p>Nhập địa chỉ của bạn và chúng tôi sẽ khoanh vùng khu vực giao hàng đến bạn</p>
                
                {/* close icon */}
                <Button className='closeBtn' onClick={() => setIsOpenModal(false)} title='đóng'><IoCloseOutline /></Button>
                
                {/* searching countries */}
                <div className='headerSearch w-100'>
                    <input type='text' placeholder='Tìm kiếm địa chỉ của bạn...' onChange={filterList} />
                    <Button title='tìm kiếm'><IoIosSearch /></Button>
                </div>
                
                {/* searching list */}
                <ul className='countryList mt-3'>
                    {/* <li><Button onClick={() => selectCountry(0, "All")}>All</Button></li> */}
                    {
                        countryList?.length !== 0 && countryList?.map((item, index) => {    // countryList? Kiểm tra xem countryList có phần tử hay không trước khi tính length, và Sử dụng phương thức map() để duyệt qua từng phần tử trong countryList và trả về một danh sách các li
                            return (
                                <li key={index}>
                                    {/* Mỗi nút Button đại diện cho một quốc gia trong danh sách */}
                                    <Button onClick={() => selectCountry(index, item.country)}      //chọn quốc gia tại vị trí index và với tên quốc gia là item.country
                                            className={`${selectedTab === index ? 'active' : ''}`}  //kiểm tra selectedTab có bằng index hay không. Nếu có, thêm lớp active để đánh dấu nút này đang được chọn
                                            title='địa điểm của bạn'
                                    >
                                        {item.country}  {/* hiển thị tên quốc gia đã chọn */}
                                    </Button>
                                </li>
                            )
                        })
                    }

                    {/* <li><Button onClick={() => setIsOpenModal(false)}>Thủ Đức</Button></li>
                    <li><Button onClick={() => setIsOpenModal(false)}>Bình Thạnh</Button></li>
                    <li><Button onClick={() => setIsOpenModal(false)}>Tân Bình</Button></li>*/}
                </ul>
            </Dialog>
        </>
    )
}

export default CountryDropdown;


