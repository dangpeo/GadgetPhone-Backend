# GadgetPhone Backend API

This folder contains the backend API for the Project GadgetPhone, built with Node.js and Express.

## Cấu trúc thư mục
- `index.js`: Điểm khởi đầu của server Express.
- Thêm các route, controller, model vào các file/thư mục riêng nếu cần mở rộng.

## Khởi động API
1. Cài đặt dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Chạy server ở chế độ phát triển (tự động reload):
   ```sh
   npm run dev
   ```
3. Truy cập API tại: http://localhost:3001/

## Gợi ý mở rộng
- Tạo các thư mục `routes/`, `controllers/`, `models/` để tổ chức mã nguồn rõ ràng hơn.
- Sử dụng các middleware cho xác thực, logging, xử lý lỗi.

## Ví dụ route
```js
app.get('/api/products', (req, res) => {
  // Trả về danh sách sản phẩm
});
```
