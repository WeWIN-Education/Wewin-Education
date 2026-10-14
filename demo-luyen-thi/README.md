# Demo luyện thi WeWIN

Demo độc lập dùng HTML/CSS/JavaScript, chạy trên máy tính, điện thoại và hosting tĩnh cPanel. Nội dung: Starters Test 01, Reading 20 câu và Listening 20 câu. Không có Speaking hoặc bài viết tự do.

## Mở demo

Chạy một HTTP server từ thư mục này. Ví dụ: `python -m http.server 8765 --bind 127.0.0.1`, rồi mở `http://127.0.0.1:8765/`. JavaScript sử dụng ES modules nên cần HTTP server, không mở bằng file://.

## Cấu trúc

- `index.html`, `styles.css`, `app.mjs`: giao diện và thao tác.
- `exam.mjs`: câu hỏi, đáp án và bộ chấm độc lập.
- `assets/`: ảnh render từ PDF gốc, logo và bốn audio MP3 của Test 01.
- `tools/`: công cụ chuẩn bị ảnh và kiểm tra bộ chấm. Không cần đưa thư mục này lên hosting.

## Đưa lên cPanel sau khi duyệt

Tạo một thư mục riêng, ví dụ `public_html/luyen-thi-demo/`. Upload `index.html`, `styles.css`, `app.mjs`, `exam.mjs` và thư mục `assets/`. Mở `/luyen-thi-demo/` để kiểm tra. Thêm một mục menu “Luyện thi” trong WordPress trỏ tới URL này nếu muốn hiển thị demo trên website. Không chép đè file của WordPress.

Đây là demo chấm trên trình duyệt. Câu trả lời và kết quả lưu trong `sessionStorage` của tab; không có tài khoản, lịch sử trên máy chủ hoặc chống xem đáp án. Bản sản phẩm thật cần lưu/chấm trên máy chủ và quản lý quyền truy cập nếu dùng cho kiểm tra có giám sát.

Reading giữ các Part 1, 2, 4, 5 của đề gốc, đánh lại thành Part 1–4; bỏ phần sắp chữ viết từ. Mỗi câu đúng 1 điểm. Điểm tổng /40, không quy đổi thành khiên Cambridge.

Audio Test 01 được cập nhật từ bộ MP3 `WEWIN_10_PRACTICE_TESTS_AUDIO` do người dùng cung cấp ngày 14/10/2026. Demo dùng bốn file trong `Individual_Parts`, tổng thời lượng khoảng 23 phút 10 giây. Các bài Movers/Flyers chỉ hiển thị trạng thái sắp có.

Khi chạy lại công cụ chuẩn bị ảnh, các MP3 đang dùng được giữ nguyên. Để chủ động thay bộ audio, chạy `python tools/prepare_assets.py --audio-dir "<thư mục Individual_Parts>"`. Bản upload cPanel tự chứa các MP3 trong `assets/`, không phụ thuộc đường dẫn thư mục nguồn trên máy tính.

## Chỉnh nhận diện

Màu xanh, navy, vàng và font được khai trong khối `:root` ở đầu `styles.css`. Logo nằm tại `assets/logo.png`. Demo chỉ có chế độ sáng.

## Kiểm tra

`node tools/test-scoring.mjs` kiểm tra điểm đúng, sai, bỏ trống, đáp án một từ/số và bài tô màu. Kiểm tra giao diện trực tiếp tại 375px, 768px và 1440px trước khi upload.
