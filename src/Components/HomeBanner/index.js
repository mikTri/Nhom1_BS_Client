import React from "react";
import Slider from "react-slick";
import slideBanner1 from '../../assets/images/slideBanner1.png';
import slideBanner2 from '../../assets/images/slideBanner2.png';
import { useWindowSize } from '@react-hook/window-size';

const HomeBanner = () => {
  const [width] = useWindowSize(); // Get the window width

  const getSliderSettings = () => {
    if (width < 768) {
      return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
      };
    } else {
      return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    }
  };

  return (
    <div className="homeBannerSection">
      <Slider {...getSliderSettings()}>
        <div className="item">
          <img src={slideBanner1} alt="banner1" className="w-100"/>
        </div>
        <div className="item">
          <img src={slideBanner2} alt="banner2" className="w-100"/>
        </div>
      </Slider>
    </div>
  );
};

export default HomeBanner;



// import React from "react";
// import Slider from "react-slick";
// import slideBanner1 from '../../assets/images/slideBanner1.png';
// import slideBanner2 from '../../assets/images/slideBanner2.png';

// const HomeBanner = () => {

//     var settings = {
//         dots: true,           // Hiển thị các dấu chấm điều hướng
//         infinite: true,       // Lặp lại carousel khi đến slide cuối cùng
//         speed: 500,           // Tốc độ chuyển slide (ms)
//         slidesToShow: 1,      // Hiển thị một slide tại một thời điểm
//         slidesToScroll: 1,    // Cuộn một slide mỗi lần
//         arrows: true,         // Hiển thị mũi tên điều hướng
//         autoplay: true,       // Tự động cuộn slide
//         autoplaySpeed: 2000   // Tốc độ tự động cuộn (ms)
//       };

//     return (
//         <div className="homeBannerSection">
//             <Slider {...settings}>
//                 <div className="item">
//                     <img src={slideBanner1} alt="banner1" className="w-100"/>
//                 </div>
//                 <div className="item">
//                     <img src={slideBanner2} alt="banner2" className="w-100"/>
//                 </div>
//             </Slider>
//         </div>
//     )
// }
// export default HomeBanner;