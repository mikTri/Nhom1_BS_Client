
const DeliveryPolicy = () =>{
    return(
        <section className="DeliveryPolicy">
            <div className="main-container col1-layout">
                <div className="main">
                    <div className="page-empty-banner col-lg-12 col-md-12 col-sm-12">
                        <div className="col-main">

                            {/* title */}
                            <p className='text-align-center'>
                                <span className="delivery-policy-title">
                                    <span><strong>CHÍNH SÁCH VẬN CHUYỂN/ĐÓNG GÓI</strong></span>
                                </span>
                                <br/>
                                <span><em>(Áp dụng cho toàn bộ đơn hàng của Quý khách tại <a href="/" className='link'>BookStore.com</a>)</em></span>
                            </p>
                            
                            <br/>
                            <br/>


                            <strong>1. Chính sách vận chuyển:</strong>
                            <p className='indented-paragraph'><strong>BookStore.com</strong> cung cấp dịch vụ giao hàng toàn quốc, gửi hàng tận nơi đến địa chỉ cung cấp của Quý khách. Thời gian giao hàng dự kiến phụ thuộc vào kho có hàng và địa chỉ nhận hàng của Quý khách.</p>
                            <p className='indented-paragraph'>Với đa phần đơn hàng, BookStore.com cần vài giờ làm việc để kiểm tra thông tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng, <strong>BookStore.com</strong> sẽ nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn hàng có sản phẩm sắp phát hành, BookStore.com sẽ ưu tiên giao những sản phẩm có hàng trước cho Quý khách hàng.</p>
                            <br/>

                            {/* table */}
                            <p><strong>Bảng thời gian dự kiến như sau:</strong></p>

                            <table className="table1">
                                <tbody>
                                    <tr>
                                        <td><p>Tuyến</p></td>
                                        <td><p>Khu vực</p></td>
                                        <td><p>Thời gian dự kiến</p></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Hồ Chí Minh – Hồ Chí Minh</p>
                                            <p>Hà Nội – Hà Nội</p>
                                        </td>
                                        <td>
                                            <p>Nội Thành</p>
                                            <p>Ngoại Thành</p>
                                        </td>
                                        <td><p>1 – 2 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">
                                            <p>Hồ Chí Minh – Miền Nam</p>
                                            <p>Hà Nội – Miền Bắc</p>
                                        </td>
                                        <td><p>Trung tâm Tỉnh, Thành phố, Thị xã</p></td>
                                        <td><p>2 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Huyện, xã</p></td>
                                        <td><p>2 – 3 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">
                                            <p>Hồ Chí Minh – Miền Trung</p>
                                            <p>Hà Nội – Miền Trung</p>
                                        </td>
                                        <td>
                                            <p>Trung tâm Tỉnh, Thành phố, Thị xã</p>
                                        </td>
                                        <td><p>3 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Huyện, xã</p></td>
                                        <td><p>3 – 4 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td rowSpan="2">
                                            <p>Hồ Chí Minh – Miền Bắc</p>
                                            <p>Hà Nội – Miền Nam</p>
                                        </td>
                                        <td><p>Trung tâm Tỉnh, Thành phố, Thị xã</p></td>
                                        <td><p>4 ngày</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Huyện, xã</p></td>
                                        <td><p>4 – 5 ngày</p></td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* note */}
                            <br/>
                            <p><em><strong>*Lưu ý: </strong></em></p>
                            <ul>
                                <li>
                                    <p><em>Trong một số trường hợp, hàng nằm không có sẵn tại kho gần nhất, thời gian giao hàng có thể chậm hơn so với dự kiến do điều hàng. Các phí vận chuyển phát sinh, </em><em><strong>BookStore.com</strong></em><em> sẽ hỗ trợ hoàn toàn.</em></p>
                                </li>
                                <li>
                                    <p><em>Ngày làm việc là từ thứ hai đến thứ sau, không tính thứ bảy, chủ nhật và ngày nghỉ lễ, tết, nghỉ bù, và không bao gồm các tuyến </em><em>huyện đảo xa.</em></p>
                                </li>
                            </ul>
                        </div>


                        {/*  */}
                        <div className="col-main">&nbsp;</div>
                        <div className="col-main"><strong>2. Bảng giá dịch vụ vận chuyển hàng hóa</strong><strong>:</strong></div>
                        <div className="col-main"><br/>


                        {/* table */}
                        <table className="table2"> 
                            <tbody> 
                                <tr> 
                                    <td className="col1-payment-method"><strong>Khu vực giao</strong></td> 
                                    <td className="col2-payment-method"><strong>Phí vận chuyển (đã bao gồm VAT)</strong></td> 
                                </tr> 
                                <tr> 
                                    <td>Nội Thành Hồ Chí Minh, Hà Nội</td> 
                                    <td> 
                                        <p>20.000 đồng</p> 
                                        <p>Quý khách kiểm tra phí vận chuyển tại bước “Thanh toán”.</p> 
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td>Các khu vực còn lại</td> 
                                    <td>
                                        <p>32.000 đồng</p> 
                                        <p>Quý khách kiểm tra phí vận chuyển tại bước “Thanh toán”.</p>
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td>Đối với đơn hàng chứa sản phẩm: Tập học sinh và/hoặc Sách giáo khoa và/hoặc các sản phẩm giấy Photocopy.</td> 
                                    <td> 
                                        <p>- Nội tỉnh TP Hồ Chí Minh, TP Hà Nội: 20.000  đồng/2 kg, trên 2 kg cộng thêm 7.000đ/kg.</p>
                                        <p>- Các khu vực còn lại (trừ nội tỉnh TP Hồ Chí Minh, TP Hà Nội): 32.000 đồng/2kg, trên 2 ký cộng thêm 7.000 đồng/kg</p> 
                                        <p>Quý khách kiểm tra phí vận chuyển tại bước “Thanh toán”.</p> 
                                    </td> 
                                </tr> 
                            </tbody> 
                        </table>


                        {/*  */}
                        <p>&nbsp;</p>
                        <p><strong>3. Một số lưu ý khi nhận hàng:</strong></p>
                        
                        <ul>
                            <li>
                                <p>Trước khi tiến hành giao hàng cho Quý khách, bưu tá của Đối tác vận chuyển sẽ liên hệ qua số điện thoại của Quý khách trước khoảng 3 đến 5 phút để xác nhận giao hàng.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Nếu Quý khách không thể có mặt trong đợt nhận hàng thứ nhất, <strong>BookStore.com</strong> sẽ cố gắng liên lạc lại thêm ít nhất 2 lần nữa (trong 02 ca giao hàng khác nhau) để sắp xếp thời gian giao hàng, Quý khách vui lòng để ý điện thoại để liên hệ được với bưu tá giao hàng.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Nếu qua 3 lần liên hệ giao hàng, <strong>BookStore.com</strong> vẫn không thể liên lạc được với Quý khách để giao hàng, BookStore.com sẽ thông báo cho Quý khách về việc hủy đơn hàng. Trong trường hợp Quý khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ trừ lại chi phí vận chuyển phát sinh từ việc giao hàng nhưng Quý khách không nhận hàng.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Trong trường hợp Quý khách không đồng ý nhận hàng với xuất phát nguyên nhân từ hàng hóa của <strong>BookStore.com</strong> không đảm bảo, không đúng như mô tả, giao trễ so với cam kết,... Đơn hàng của Quý khách sẽ được hoàn lại cho chúng tôi và được hủy trên hệ thống <strong>BookStore.com</strong>. Nếu Quý khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ là toàn bộ số tiền đã thanh toán cho đơn hàng (bao gồm phí vận chuyển).</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Trong trường hợp đơn hàng đang giao đến Quý khách có ngoại quan bên ngoài hộp hàng hóa có dấu hiệu bị rách, móp, ướt, thủng, mất niêm phong,…Quý khách vui lòng kiểm tra kỹ chất lượng sản phẩm bên trong trước khi nhận hàng. Quý khách hoàn toàn có quyền từ chối nhận hàng và báo về cho chúng tôi qua hotline 19009000 để được hỗ trợ giao lại đơn hàng mới hoặc hủy đơn hàng, hoàn tiền.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Trong trường hợp Quý khách không có nhu cầu nhận hàng, Quý khách có thể báo với bên vận chuyển và/hoặc CSKH (qua Hotline 19009000) về việc này. Đơn hàng của Quý khách sẽ được hoàn lại cho chúng tôi và được hủy trên hệ thống. Trong trường hợp Quý khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ trừ lại chi phí vận chuyển phát sinh từ việc giao hàng nhưng Quý khách không nhận.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p><strong>BookStore.com</strong> sẽ thông báo ngay đến Quý khách nếu có sự chậm chễ về thời gian giao hàng so với thời gian dự kiến ở trên. Trong phạm vi pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm cho bất cứ tổn thất nào, các khoản nợ, thiệt hại hoặc chi phí phát sinh từ việc giao hàng trễ. Trường hợp phát sinh chậm trễ trong việc giao hàng, nếu Quý khách không còn nhu cầu nhận hàng, <strong>BookStore.com</strong> cam kết sẽ hỗ trợ Quý khách hủy đơn hàng, nếu Quý khách đã thanh toán trước cho đơn hàng, Quý khách sẽ nhận lại tiền vào tài khoản trong vòng 5 - 7 ngày làm việc, phụ thuộc vào tiến độ xử lý của ngân hàng. Số tiền Quý khách nhận lại sẽ là toàn bộ số tiền đã thanh toán cho đơn hàng (bao gồm phí vận chuyển).</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Sản phẩm được đóng gói theo tiêu chuẩn đóng gói của <strong>BookStore.com</strong>, nếu Quý khách có nhu cầu đóng gói đặc biệt khác, vui lòng báo trước cho chúng tôi khi đặt hàng hàng và cho phép chúng tôi được tính thêm phí cho nhu cầu đặc biệt này.</p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>Mọi thông tin về việc thay đổi sản phẩm hay hủy bỏ đơn hàng, đề nghị Quý khách thông báo sớm để <strong>BookStore.com</strong> có thể điều chỉnh lại đơn hàng. Quý khách có thể liên hệ với chúng tôi qua số điện thoại hotline: 19009000 hoặc qua địa chỉ email <a href="mailto:nhom1uit@gmail.com" className='link'>nhom1uit@gmail.com</a>.</p>
                            </li>
                        </ul>
                        <p>&nbsp;</p>


                        {/*  */}
                        <strong>4. Tra cứu thông tin vận chuyển đơn hàng</strong><strong>:</strong><strong><br/></strong>
                        <p className="indented-paragraph"><strong>BookStore.com</strong> sử dụng dịch vụ giao hàng của các Đối tác vận chuyển để thực hiện giao đơn hàng đến Quý khách.</p>
                        <p className="indented-paragraph">Quý khách hoàn toàn có thể tự tra cứu thông tin lộ trình vận chuyển Đơn hàng bằng 02 cách sau đây:</p>
                        <ul>
                            <li>
                                <p>Quý khách tự truy cập trang web tra cứu thông tin của các Đối tác vận chuyển, nhập mã vận đơn để tiến hành tra cứu.</p>
                            </li>
                            <li>
                                <p>Quý khách liên hệ với bộ phận chăm sóc khách hàng của <strong>BookStore.com</strong> qua hotline 19009000 để được hỗ trợ tra cứu tình hình vận chuyển đơn hàng.</p>
                            </li>
                        </ul>
                        
                        <p className="indented-paragraph"><strong>BookStore.com</strong> cung cấp địa chỉ website của các Đối tác vận chuyển để Quý khách tra cứu tình hình vận chuyển đơn hàng:</p>
                        <ul>
                            <li>
                                <p><strong>Công ty Cổ phần chuyển phát nhanh Snappy</strong></p>
                            </li>
                            <li>
                                <p><strong>Tổng công ty Bưu Điện Việt Nam – Vietnam Post</strong></p>
                            </li>
                            <li>
                                <p><strong>Công ty Cổ phần Dịch Vụ Tức Thời – Ahamove</strong></p>
                            </li>
                            <li>
                                <p><strong>Công Ty TNHH Nin Sing Logistics (NINJA VAN)</strong></p>
                            </li>
                        </ul>
                        
                        <p className="indented-paragraph"><em>Chính sách sẽ được áp dụng và có hiệu lực từ ngày <strong>17/05/2024</strong></em></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    )
}

export default DeliveryPolicy;