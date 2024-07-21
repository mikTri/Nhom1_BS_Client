import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/bookStoreLogo.png';
import SearchBox from '../Header/SearchBox';
import Navigation from '../Header/Navigation';

import { MyContext } from '../../App';

import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";



const Header = () => {

    const context = useContext(MyContext);                          //để chia sẻ dữ liệu toàn cầu trong toàn bộ ứng dụng React
    const headerRef = useRef();                                     //là hook để tạo ra tham chiếu mà không cần render (cụ thể, tham chiếu đến phần tử DOM của header)

    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);                 //state để quản lý header đóng hay mở (null: đóng)
    const open = Boolean(anchorEl);

    //SEARCH: các hàm quản lý đóng mở thanh tìm kiếm
    const openSearch = () => { setIsOpenSearch(!isOpenSearch); }    //Nếu thanh tìm kiếm hiện đang mở (isOpenSearch=true), hàm sẽ đóng hộp tìm kiếm (setIsOpenSearch(false)), và ngược lại
    const closeSearch = () => { setIsOpenSearch(false); }

    //NAVIGATION BAR: quản lý đóng mở thanh điều hướng 
    //luôn mở
    const openNav = () => {
        // setIsOpenNav(!isOpenNav);
        setIsOpenNav(true);
        context.setIsOpenNav(true)
    }
    //luôn đóng
    const closeNav = () => {
        setIsOpenNav(false);
        context.setIsOpenNav(false)
    }

    //DROPDOWN menu: quản lý trạng thái của dropdowwn menu 
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); //bắt sự kiện click tại một vị trí 
    };
    const handleClose = () => {
        setAnchorEl(null);  //đóng menu
    };


    //LOGOUT: 
    const logout = () => {
        setAnchorEl(null);                      //đóng header
        localStorage.clear();                   //xóa localStorage
        context.setIsLogin(false);              //mặc định Login = false
        window.location.href = "/"              //sau khi đăng xuất thì điều hướng đến trang Home
        // window.location.href = "/signIn"    //sau khi đăng xuất thì điều hướng đến trang signIn
    }


    // thêm event listener cho sự kiện cuộn cửa sổ (scroll event)
    useEffect(() => {
        const handleScroll = () => {
            let position = window.scrollY;                      //Lấy vị trí cuộn hiện tại của trang
            if (headerRef.current) {                            // Kiểm tra xem headerRef đã được thiết lập chưa
                if (position > 100) {                           // Nếu vị trí cuộn lớn hơn 100, thêm class 'fixed' vào header
                    headerRef.current.classList.add('fixed');
                } else {                                        // và ngược lại
                    headerRef.current.classList.remove('fixed');
                }
            }
        };
        // Đăng ký sự kiện scroll và gọi hàm handleScroll khi sự kiện xảy ra
        window.addEventListener('scroll', handleScroll);

        // Cleanup function (để đảm bảo event listener được loại bỏ khi Header component unmount)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Tham số thứ hai là một mảng rỗng, chỉ chạy effect này một lần sau khi component mount


    return (
        <>
            <div className="headerWrapper">
                {/* HEADER */}

                {/* thêm ref={headerRef} để đảm bảo headerRef.current luôn tham chiếu đúng đến phần tử header */}
                <header ref={headerRef} className="header">
                    {/* SLOGAN on top */}
                    <div className="top-strip bg-blue">
                        <div className="container">
                            <p className="mb-0 mt-0 text-center">BookStore - Người bạn của tri thức</p>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">

                            {/* LOGO */}
                            <div className="logoWrapper d-flex align-items-center col-sm-2">
                                <Link to={'/'}><img src={Logo} alt='Logo image' /></Link>
                            </div>

                            <div className='col-sm-10 d-flex align-items-center part2'>

                                {/* SEARCH BOX */}
                                <div className={`headerSearchWrapper ${isOpenSearch === true && 'open'}`}>
                                    <div className=' d-flex align-items-center'>
                                        <span className="closeSearch mr-3" onClick={() => setIsOpenSearch(false)}><FaAngleLeft /></span>
                                        <SearchBox closeSearch={closeSearch} />
                                    </div>
                                </div>


                                <div className='d-flex align-items-center part3 ml-20'>

                                    {/* SEARCHl: điều kiện để hiển thị thanh search */}
                                    {
                                        context.windowWidth < 992 && <Button className="circle ml-3 toggleNav" onClick={openSearch} title='Tìm kiếm'><IoIosSearch /></Button>
                                    }


                                    {/* LOGIN */}
                                    {
                                        context.isLogin !== true ?                                                                      //if
                                            <Link to="/signIn"><Button className='btn-blue btn-lg btn-round'>Đăng nhập</Button></Link> :     //then
                                            <div className="myAccWrapper">                                                                  {/*else*/}

                                                <Button className="myAcc d-flex align-items-center" onClick={handleClick}>
                                                    {/* hiển thị tên user */}
                                                    <div className="userImg">
                                                        <span className="rounded-circle"> {context.user?.name?.charAt(0)} </span>
                                                    </div>
                                                    {/* hiển thị email user */}
                                                    <div className="userInfo">
                                                        <h4>{context.user?.name}</h4>
                                                        <p className="mb-0">{context.user?.email}</p>
                                                    </div>
                                                </Button>

                                                <Menu anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    {/* my account */}

                                                    <MenuItem onClick={handleClose}>
                                                        <Link to="/my-account" className='link'>
                                                            <ListItemIcon><FaUserAlt fontSize="small" /></ListItemIcon>
                                                            Tài khoản của tôi
                                                        </Link>
                                                    </MenuItem>

                                                    <MenuItem onClick={handleClose}>
                                                        <Link to="/orders" className='link'>
                                                            <ListItemIcon><FaClipboardCheck fontSize="small" /></ListItemIcon>
                                                            Đơn hàng của tôi
                                                        </Link>
                                                    </MenuItem>

                                                    {/* <MenuItem onClick={handleClose}>
                                                        <Link to="/my-list" className='link'>
                                                            <ListItemIcon><FaHeart fontSize="small" /></ListItemIcon>
                                                            Danh sách của tôi
                                                        </Link>
                                                    </MenuItem> */}

                                                    {/* logout */}
                                                    <MenuItem onClick={logout}>
                                                        <ListItemIcon><RiLogoutCircleRFill fontSize="small" /></ListItemIcon>
                                                        Đăng xuất
                                                    </MenuItem>

                                                </Menu>

                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NAVIGATION: kiểm tra nếu context.categoryData không phải là mảng rỗng, thì sẽ render component Navigation */}
                    {/* <Navigation/> */}
                    {
                        context.categoryData?.length !== 0 && <Navigation navData={context.categoryData} isOpenNav={isOpenNav} closeNav={closeNav} />
                    }

                </header>


                

            </div>

        </>

    )
}

export default Header;