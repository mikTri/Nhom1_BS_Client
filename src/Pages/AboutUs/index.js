
import Breadcrumb from '../../Components/Breadcrumb';

const AboutUs = () =>{

    const breadcrumbs = [
        { href: '#', label: 'Về chúng tôi' },
    ];
    
    return(


        <section className="AboutUs">
            {/* đường dẫn */}
            

            <div className="main-container col1-layout">
                <div className="main">
                    <div className="page-empty-banner col-lg-12 col-md-12 col-sm-12">
                        <div className="col-main">
                            
                            {/* title */}
                            <p className='text-align-center'>
                                <span className='aboutus-title'>
                                    <span><strong>GIỚI THIỆU VỀ BOOKSTORE</strong></span>
                                </span>

                                {/* <p><em>BookStore cùng bạn đến suối nguồn của tri thức.</em></p> */}
                            </p>
                            <br/>
                            <br/>

                            {/* paragraph */}
                            <div className='justify'></div>
                            <p className="caption">SỨ MỆNH CỦA BOOKSTORE: “CÙNG BẠN ĐI ĐẾN SUỐI NGUỒN CỦA TRI THỨC!”</p>
                            <br/>
                            <p><strong>Về hàng hóa </strong></p>
                            <p>BOOKSTORE chuyên kinh doanh:</p>
                            <p>Sách quốc văn, ngoại văn, văn hóa phẩm, văn phòng phẩm, dụng cụ học tập, quà lưu niệm, đồ chơi dành cho trẻ em…</p>
                            <p>Sách ngoại văn bao gồm: từ điển, giáo trình, tham khảo, truyện tranh thiếu nhi , sách học ngữ, từ vựng, ngữ pháp, luyện thi TOEFL, TOEIC, IELS…được nhập từ các NXB nước ngoài như<em>: </em>Cambridge, Mc Graw-Hill, Pearson Education, Oxford, Macmillan, Cengage Learning…</p>
                            <p>Văn phòng phẩm, dụng cụ học tập, đồ chơi dành cho trẻ em, hàng lưu niệm… đa dạng, phong phú, mẫu mã đẹp, chất lượng tốt, được cung ứng bởi các công ty, nhà cung cấp uy tín như: Thiên Long, XNK Bình Tây, Hạnh Thuận, Ngô Quang, Việt Văn, Trương Vui…</p>
                            <br/>

                            <p><strong></strong><strong>Hệ thống Nhà sách chuyên nghiệp</strong></p>
                            <p>Mạng lưới phát hành của BOOKSTORE rộng khắp trên toàn quốc</p>
                            <br/>

                            <p><strong>Kinh nghiệm hoạt động </strong></p>
                            <p>BOOKSTORE đã tích lũy được nhiều kinh nghiệm trong việc nghiên cứu thị trường, phân tích tài chính, định hướng phát triển, hoạch định chiến lược kinh doanh và khả năng tiếp thị giỏi… Đồng thời BOOKSTORE còn có nhiều kinh nghiệm trong việc tổ chức các cuộc Hội thảo, Triển lãm và giới thiệu sách quốc văn, ngoại văn với qui mô lớn, ấn tượng.</p>
                            <br/>

                            <p><strong></strong><strong>BOOKSTORE NHÀ PHÂN PHỐI SÁCH NGOẠI VĂN CHUYÊN NGHIỆP</strong></p>
                            <p>Dù là những bạn đọc nhỏ tuổi hay những bậc cao niên, dù là bạn đọc ở TP.HCM hay ở các tỉnh thành khác trên cả nước thì tên BOOKSTORE đã trở nên thân quen và tin cậy với họ.</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>          
    )
}

export default AboutUs;