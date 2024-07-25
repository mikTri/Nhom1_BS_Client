import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import Button from '@mui/material/Button';

const Contact = () => {
    const context = useContext(MyContext);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Get form data

    const name = formData.get('name');
    const email = formData.get('email');
    const title = formData.get('title');
    const content = formData.get('content');

    // Check for empty fields
    if (!name || !email || !title || !content) {
      setIsFormValid(false);
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng điền đầy đủ các trường!"
      });
      return;
    }

    setIsFormValid(true); // Assuming all fields are filled

    const PostForm = {
      name,
      email,
      title,
      content,
    };

    try {
      const response = await postData('/api/mailBox/', PostForm);
      console.log('Form submission response:', response);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Thành Công"
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Thất bại"
      });
    }
  };
    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="heading text-center">
                    <h2>Liên hệ <span>với chúng tôi </span></h2>
                    <p>BookStore luôn có đội ngũ hỗ trợ bạn 24/7 <br/>Hãy chia sẻ với chúng tôi những thắc mắc của bạn</p>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="title">
                            <h3>Chi tiết liên hệ</h3>
                            <p>Các hình thức liên lạc với chúng tôi</p>
                        </div>
                            
                        <div className="content">
                            <div className="info">
                                <i><FiPhoneCall /></i>
                                <h4 className="d-inline-block"><br/><span>1900 9000</span></h4>
                            </div>
                           
                            <div className="info">
                                <i><MdOutlineMailOutline /></i>
                                <h4 className="d-inline-block"><br/><span>example@info.com</span></h4>
                            </div>
                            
                            <div className="info">
                                <i><FaLocationDot /></i>
                                <h4 className="d-inline-block"><br/><span>ABC, Tp.Thủ Đức</span></h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 contactBox">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="Tên của bạn" name="name" required />
                            </div>

                            <div className="col-sm-6">
                                <input type="email" className="form-control" placeholder="Email" name="email" required />
                            </div>

                            <div className="col-sm-12">
                                <input type="text" className="form-control" placeholder="Tiêu đề" name="title" required />
                            </div>
                            </div>

                            <div className="form-group">
                            <textarea className="form-control" rows="5" id="comment" placeholder="Nội dung..." name="content" required></textarea>
                            </div>

                            <button className="btn btn-block" type="submit" >Gửi ngay!</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;