import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";


const Navigation = () =>{

    return (
        <nav>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-10 navPart2 d-flex align-items-center'>
                        <ul className='list list-inline ml-auto'>
                            
                            <li className='list-inline-item'><Link to="/"><Button>Trang chủ</Button></Link></li>
                            <li className='list-inline-item'><Link to="/about-us"><Button>Về chúng tôi</Button></Link></li>
                            
                            <li className='list-inline-item'>
                                <Link to="/product-listing"><Button>Danh mục sách </Button></Link>
                            </li>
                            
                            {/* <li className='list-inline-item'><Link to="/"><Button>Hỏi đáp</Button></Link></li> */}
                            <li className='list-inline-item'><Link to="/payment-method-policy"><Button>Hướng dẫn</Button></Link></li>
                            <li className='list-inline-item'><Link to="/contact"><Button>Liên hệ</Button></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation;

