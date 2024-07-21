import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// để khởi tạo và render ứng dụng React trong chế độ đồng thời (concurrent mode), một tính năng mà React cung cấp để làm cho ứng dụng có thể phản hồi nhanh hơn và tối ưu hóa hiệu suất

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
            <React.StrictMode>
              <App />
            </React.StrictMode>
          );

          
//<React.StrictMode> là một component bao bọc để kích hoạt chế độ kiểm tra nghiêm ngặt trong quá trình phát triển. Nó giúp phát hiện và cảnh báo về những điều không nên sử dụng trong React như các lifecycle method cũ hay thay đổi state không an toàn
