import paymentIcon from '../../assets/images/paymentIcon.png';

const PaymentMethodPolicy = () => {
    return (
        <section className="PaymentMethodPolicy" id="PaymentMethodPolicy">
            {/* <div className="container"> */}
            <div className="main-container col1-layout">
                <div className="main main-page-text ">
                    <div className="page-empty-banner">
                        <div className="col-main">
                            <p className="p_level_one">I.&nbsp;PHƯƠNG THỨC THANH TOÁN</p>
                            <p className="p_level_two"> A.&nbsp;THANH TOÁN BẰNG VÍ ZALOPAY; THẺ QUỐC TẾ VISA, MASTER, JBC; ATM NỘI ĐỊA/INTERNET BANKING THÔNG QUA ZALOPAY</p>
                            <p><span><strong>BƯỚC 1</strong>: Chọn phương thức <strong>Thanh toán bằng thẻ ATM nội địa/ Internet Banking/ Visa/Master/JCB/ ZaloPay</strong></span></p>
                            <p><span>&nbsp;<img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto' }} src={paymentIcon} alt="" /></span></p>
                            <p><span><strong>BƯỚC 2</strong>:&nbsp;Sau khi thực hiện&nbsp;<strong>Xác nhận đơn hàng</strong>&nbsp;bạn sẽ được chuyển tự động đến trang thanh toán của ZaloPay.</span></p>
                            
                            <p className='img-position'> <span><img src={paymentIcon} alt="" /></span></p>

                            <p><span><strong>BƯỚC 3</strong>: Chọn 01 trong 03 loại thẻ để tiến hành thanh toán như sau:</span></p>
                            <ul>
                                <li><span>Thanh toán bằng<strong> Ví ZaloPay:</strong></span>
                                    <ul>
                                        <li>
                                            <span>Bạn có thể tải và đăng ký tài khoản ZaloPay với tài khoản Zalo&nbsp;  
                                                <span> 
                                                    <a href="https://zalopay.vn/"><span className='underline-decoration link'>tại đây</span></a>
                                                </span>&nbsp;để thực hiện thanh toán.
                                            </span>
                                            <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                        </li>
                                        
                                        <li>
                                            <p><span>Mở ứng dụng ZaloPay trên điện thoại để quét mã QR để thực hiện thanh toán theo hướng dẫn</span></p>
                                            <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                        </li>
                                        <br/>
                                        <ul className="col-xs-12">
                                            <li>Scan mã QR hiển thị trên website để thực hiện thanh toán.</li>
                                            <li>Chọn Xác Nhận Thanh Toán</li>
                                            <li>Thanh toán thành công</li>
                                        </ul>

                                    </ul>
                                </li>
                                <br/>

                                <li>
                                    <span>Thanh toán bằng<strong> Thẻ VISA, Master, JCB</strong></span>
                                    <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                    <ul>
                                        <li>
                                            <p>&nbsp;Điền thông tin theo hướng dẫn :</p>
                                            <ul>
                                                <li><span>Số thẻ</span></li>
                                                <li><span>Tên chủ thẻ</span></li>
                                                <li><span>Ngày hết hạn</span></li>
                                                <li><span>Mã CVV/CVC2</span></li>
                                            </ul>
                                        </li>
                                        <br/>
                                        <li>
                                            <p><span>Chọn ô <strong>Thanh Toán</strong> để hoàn tất việc thanh toán.</span></p>
                                            <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                        </li>
                                    </ul>
                                </li>
                                <br/>
                                <p><span>&nbsp;</span></p>
                                <ul>
                                    <li><span>Thanh toán bằng<strong> Thẻ ATM nội địa&nbsp;</strong></span></li>
                                    <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                    <li>
                                        <span>&nbsp;Điền thông tin theo hướng dẫn :</span>
                                        <ul>
                                            <li><span>Số thẻ</span></li>
                                            <li><span>Tên chủ thẻ</span></li>
                                            <li><span>Ngày hết hạn</span></li>
                                        </ul>
                                    </li>
                                    <br/>
                                    <li>
                                        <span>Chọn ô <strong>Thanh Toán</strong> để hoàn tất việc thanh toán.</span>
                                        <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                    </li>
                                </ul>
                                <br/>

                                <p><span>&nbsp;</span></p>
                                <p className="p_level_two">B. THANH TOÁN CHUYỂN KHOẢN QUA NGÂN HÀNG</p>
                                <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                <p className="indented-paragraph"><span>Sau khi hoàn tất đặt hàng tại bước xác nhận đơn hàng, bạn vui lòng chuyển tiền vào tài khoản của chúng tôi theo thông tin sau:</span></p>
                                <p className='bank-info'>
                                    <span>Ngân hàng: <strong>ABC - CN Thành phố Hồ Chí Minh</strong></span><br/>
                                    <span>Tên tài khoản: <strong>Công ty CP Sách - BOOKSTORE</strong></span><br/>
                                    <span>Số tài khoản: <strong>100000000000</strong></span>
                                </p>
                                
                                <p>
                                    <br/>
                                    <span> <strong>Chú ý:</strong></span>
                                </p>

                                <ul>
                                    <li>
                                        <div>
                                            <span>
                                                Khi chuyển tiền, vui lòng ghi rõ Mã số đơn hàng mà bạn thanh toán vào
                                                phần ghi chú của lệnh chuyển khoản. Sau đó email cho chúng tôi theo địa chỉ&nbsp; 
                                                <a className='mail-to' href="mailto:nhom1uit@gmail.com">nhom1uit@gmail.com</a>
                                                &nbsp;để thông báo việc chuyển tiền và số tài khoản của bạn để tiện trong việc 
                                                kiểm tra đồng thời tiến hành giao hàng sớm cho bạn.
                                            </span>
                                        </div>
                                    </li>
                                    
                                    <li>
                                        <div><span>Hoặc bạn có thể điện thoại cho chúng tôi theo số (08)3838 8832 nếu cần sự hổ trợ</span></div>
                                    </li>
                                    
                                    <li><div><span>Bạn vui lòng thanh toán phí chuyển khoản</span></div></li>
                                    
                                </ul>
                                <br/>

                                <p className="p_level_two">C. THANH TOÁN BẰNG TIỀN MẶT KHI NHẬN HÀNG (COD)</p>
                                <p className='img-position'><span><img src={paymentIcon} alt="" /></span></p>
                                {/* <p style={{ textAlign: 'center' }}><span><img style="display: block; margin-left: auto; margin-right: auto; box-shadow: none;" src={paymentIcon} alt="" /></span></p> */}
                                <p><span><strong>1. Đối với TP.HCM (ngoại trừ: Bình Chánh, Hóc Môn, Củ Chi, Cần Giờ )</strong></span></p>
                                <p>
                                    <span>
                                        - Nhân viên giao hàng sẽ liên lạc trước với bạn để thông báo giao hàng.Trường hợp bạn đi vắng vui lòng
                                        ủy thác cho người khác thanh toán và nhận thay. Bạn vui lòng ký nhận hàng và
                                        thanh toán tiền theo giá trị ghi trên phiếu giao hàng và hóa đơn VAT đính kèm.
                                        <strong><em><span> Bạn không phải trả thêm một khoản phí nào khác</span></em></strong>
                                    </span>
                                </p>
                                
                                <p>
                                    <span>
                                        <strong>2. Đối với các Huyện Bình Chánh, Hóc Môn, Củ Chi, Cần Giờ và các tỉnh thành khác </strong>
                                        <em><span>(với điều kiện địa chỉ thanh toán cũng là địa chỉ giao hàng):</span></em>
                                    </span>
                                </p>
                                
                                <p>
                                    <span>
                                        - Nhân viên bưu điện địa phương sẽ đến địa chỉ bạn đăng ký để thu tiền và giao hàng.
                                        <span> Trường hợp bạn đi vắng vui lòng ủy thác cho người khác thanh toán và nhận hàng thay.</span> 
                                        <span> Trường hợp không có người nhận, bưu điện sẽ để lại lời nhắn mời bạn đến bưu điện để nhận hàng.</span>
                                    </span>
                                </p>
                            </ul>
                        </div>
                        <br/>
                        
                        <div id="gtgt_page" className="col-main">
                            <p className="p_level_one">II.&nbsp;HƯỚNG DẪN ĐĂNG KÝ THÔNG TIN XUẤT HÓA ĐƠN</p>
                            <p className="p_level_two">A.&nbsp;Hướng dẫn đăng ký thông tin xuất hóa đơn: </p>
                            <p className="p_level_three indented-paragraph">Khi thực hiện các thao tác đặt hàng, nếu Quý khách có nhu cầu xuất hoá đơn Giá trị gia tăng cho đơn hàng, vui lòng điền thông tin tại <b>Thông tin khác</b>&nbsp;và chọn ô Xuất hóa đơn GTGT (ảnh dưới), hệ thống sẽ xuất hóa đơn theo thông tin Quý khách đã nhập.</p>
                            <p className='img-position'><img src={paymentIcon} alt=''/>.</p>
                            <p className="p_level_three indented-paragraph">Từ ngày 01/11/2020, Hóa đơn Giá trị gia tăng do Công ty BookStore cung cấp&nbsp;sẽ được xuất dưới dạng Hóa đơn Điện tử theo đúng nội dung bán hàng và gửi đến Quý khách ngay sau khi đơn hàng được đóng gói thành công và giao đến Quý khách. <i><b>Công ty BookStore không giải quyết việc xuất lại hóa đơn cho các trường hợp Quý khách không đăng ký thông tin.</b></i></p>
                            
                            <p className="p_level_three indented-paragraph" style={{margin: '8px 0'}}>Có 2 hình thức nhận hóa đơn điện tử:</p>

                            <p className="p_level_three left-align" >1. Nhận qua email đã khai báo trong phần Thông tin khác</p>
                            <p className="p_level_three left-align" >2. Link hóa đơn điện tử và mã tra cứu hiển thị trong bill thông tin đơn hàng (đính kèm trong hộp hàng)</p>
                            
                            <br/>
                            <p className="p_level_two">B.&nbsp;Thông tin chung về hóa đơn điện tử (HĐĐT):</p>

                            <p className="p_level_two">1.&nbsp;Hóa đơn điện tử là gì?</p>
                            <p className="p_level_three indented-paragraph">Hoá đơn điện tử là 1 trong 3 hình thức Hóa đơn. Thay vì Hóa đơn tạo lập trên giấy, HĐĐT được tạo lập trên thiết bị điện tử theo đúng quy định của Bộ Tài Chính và Cơ Quan Thuế (dựa trên nghị định số 51/2010/NĐCP-ngày 14/05/2010 của Chính Phủ quy định về hóa đơn bán hàng, cung ứng dịch vụ).</p>
                           
                            <p className="p_level_two">2.&nbsp;HĐĐT có giá trị pháp lý như thế nào?</p>
                            <p className="p_level_three indented-paragraph">Hóa đơn được phát hành sẽ có giá trị về mặt pháp lý như hóa đơn giấy và được Bộ Tài Chính cũng như Tổng Cục Thuế chấp nhận đồng thời đáp ứng đầy đủ luật giao dịch điện tử nên có thể thực hiện báo cáo thuế bình thường.</p>
                            
                            <p className="p_level_two">3.&nbsp;Quyết định sử dụng hóa đơn điện tử và Thông báo phát hành hóa đơn điện tử của Công ty BookStore</p>
                            <p className="p_level_three">
                                <a className='file-link' target="_blank" href="#">Tệp 1</a>
                                <a className='file-link' target="_blank" href="#">Tệp 2</a>
                                <a className='file-link' target="_blank" href="#">Tệp 3</a>
                            </p>
                            
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>     
        </section>


    )
}

export default PaymentMethodPolicy;