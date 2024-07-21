import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { TbClock12 } from "react-icons/tb";
import { BiSolidDiscount } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { MyContext } from '../../App';
import newsLetterImg from '../../assets/images/newsletter.png';
import { postData } from '../../utils/api';


const Footer = ()=>{

    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(MyContext);

    const [formFields, setFormFields] = useState({
        email: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prevFields => ({
            ...prevFields,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("formFields.email: " + formFields.email);

        if (!formFields.email) {
            context.setAlertBox({ open: true, error: true, msg: "Vui lòng điền email của bạn." });
            return;
        }
    
        try {
            // Sign up the user
            const res = await postData('/api/news', formFields);
    
            if (!res.error) {
                setIsLoading(true);
                context.setAlertBox({ open: true, msg: 'Email của bạn đã đăng ký thành công!', error: false });
                setTimeout(() => { setIsLoading(false); }, 2000);
            } else {
                setIsLoading(false);
                context.setAlertBox({ open: true, error: true, msg: res.msg });
            }
        } catch (error) {
            context.setAlertBox({ open: true, error: true, msg: 'Đã xảy ra lỗi khi đăng ký' });
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };


    return (
        <>
            {/* SUBSCRITION */}
            <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                <div className="container">                    
                    <div className="row">

                        <div className="col-md-6">
                            <p className="text-white mb-1">Giảm giá 20% cho đơn hàng đầu tiên</p>
                            <h3 className="text-white">Theo dõi bản tin của chúng tôi</h3>
                            <p className="text-light">Hãy tham gia đăng ký email của chúng tôi để nhận thông tin cập nhật về <b>các chương trình khuyến mãi</b>.</p>
                            
                            {/* EMAIL BOX */}
                            <form className="mt-4" onSubmit={handleSubmit} >
                                <IoMailOutline />
                                <input type="text" name="email" placeholder="Email của bạn" value={formFields.email} onChange={handleChange} />
                                <Button type="submit" disabled={isLoading}>Đăng ký</Button>
                            </form>

                        </div>

                        {/* NEWLETTER IMAGE */}
                        <div className="col-md-6">
                            <img src={newsLetterImg} alt='news letter image'/>
                        </div>

                    </div>
                </div>
            </section>


            {/* FOOTER */}
            <footer className="site-footer">

                {/* PROMOTIONS */}
                <div className="container">
                    <div className="topInfo row">

                        <div className="col d-flex align-items-center">
                            <span className='icon'><FaBook /></span>
                            <span className="ml-2">Mỗi ngày một quyển sách</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span className='icon'><TbTruckDelivery /></span>
                            <span className="ml-2">Miễn phí vẫn chuyển cho hóa đơn trên VND 300.000</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span className='icon'><TbClock12 /></span>
                            <span className="ml-2">Có hẹn lúc 12:00</span>
                        </div>

                        <div className="col d-flex align-items-center">
                            <span className='icon'><BiSolidDiscount /></span>
                            <span className="ml-2">Sách cũ chỉ 30% giá</span>
                        </div>
                    </div>
                    <hr></hr> 
                </div>

                
                {/* ABOUT + POLICIES + CONTACT */}
                <div className="container">
                    <div className="row">

                        <div className="col-sm-12 col-md-6">
                            <h6>Về chúng tôi</h6>
                            <p className="text-justify">
                                BookStore là cửa hàng đưa bạn đến suối nguồn của tri thức. Chúng tôi liên tục cập nhật những cuốn sách hay nhất, mới nhất và chất lượng nhất. Chúng tôi rất hân hạnh được cùng bạn đồng hành trên con đường đi tìm những giá trị cho cuộc sống.&nbsp;
                                <a href='/about-us'><em>(thêm thông tin chi tiết)</em></a>
                            </p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Chính sách mua hàng</h6>
                            <ul className="footer-links">
                                {/* <li><a href="#">Hình thức đặt hàng</a></li> */}
                                <li><a href="/payment-method-policy">Phương thức thanh toán</a></li>
                                <li><a href="/delivery-policy">Phương thức vận chuyển</a></li>
                                <li><a href="/refund-policy">Chính sách đổi trả</a></li>
                                {/* <li><a href="#">Hướng dẫn sử dụng</a></li> */}
                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Hotline liên hệ</h6>
                            <p><FaPhoneAlt/> 1900 9000 <i>(Hỏi đáp thắc mắc 24/24)</i></p>
                        </div>

                    </div>
                    <hr></hr>
                </div>


                {/* COPYRIGHT + SOCIAL MEDIA */}
                <div className="container">
                    <div className="row">

                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by <a href="#">Nhom01</a>.</p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li>
                                    <a className="facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaSquareFacebook /> {/*target="_blank" và rel="noopener noreferrer" được sử dụng để mở liên kết trong một tab mới và bảo vệ an ninh của user*/}
                                        <span className="sr-only">Facebook</span>
                                    </a>
                                </li>

                                <li>
                                    <a className="twitter" href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitterSquare />
                                        <span className="sr-only">Twitter</span>
                                    </a>
                                </li>

                                <li>
                                    <a className="linkedin" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><GrLinkedin />
                                        <span className="sr-only">LinkedIn</span>
                                    </a>
                                </li>  

                            </ul>
                        </div>

                    </div>

                </div>

            </footer>
        </>
    )
}

export default Footer;