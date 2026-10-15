# Demo luyện thi WeWIN

Web độc lập dùng HTML/CSS/JavaScript, chạy trên máy tính, điện thoại và hosting tĩnh cPanel. Nội dung online: Starters Test 01-10, mỗi đề Reading 20 câu và Listening 20 câu.

## Mở demo

Chạy một HTTP server từ thư mục này. Ví dụ: `python -m http.server 8765 --bind 127.0.0.1`, rồi mở `http://127.0.0.1:8765/`. JavaScript sử dụng ES modules nên cần HTTP server, không mở bằng file://.

## Cấu trúc

- `index.html`, `styles.css`, `app.mjs`: giao diện và thao tác.
- `exam.mjs`: chọn đề và bộ chấm độc lập; `exams.mjs`: 10 đề và 400 câu, đáp án, đường dẫn ảnh/audio.
- `assets/shared/`: ảnh imagegen đã duyệt từ bộ PDF mới; các vùng atlas được hiển thị đúng tỷ lệ bằng SVG.
- `assets/tests/01` đến `10`: tranh nối tên đã bỏ đường nối ví dụ trên giấy và MP3 người dùng cung cấp.
- `tools/`: công cụ chuẩn bị ảnh và kiểm tra bộ chấm. Không cần đưa thư mục này lên hosting.

## Đưa lên cPanel sau khi duyệt

Tạo một thư mục riêng, ví dụ `public_html/luyen-thi-demo/`. Upload `index.html`, `styles.css`, `app.mjs`, `exam.mjs`, `exams.mjs` và thư mục `assets/`. Mở `/luyen-thi-demo/` để kiểm tra. Thêm một mục menu “Luyện thi” trong WordPress trỏ tới URL này nếu muốn hiển thị demo trên website. Không chép đè file của WordPress.

URL từng đề: `?screen=intro&test=starters-02`; màn làm bài: `?screen=exam&test=starters-10&skill=listening&part=0`. Mỗi đề lưu bài trong một khóa sessionStorage riêng; mở lại đề có bài dở sẽ tiếp tục, đề đã nộp sẽ hiện kết quả. Làm lại chỉ thay bài của đề đang chọn.

Đây là demo chấm trên trình duyệt. Câu trả lời và kết quả lưu trong `sessionStorage` của tab; không có tài khoản, lịch sử trên máy chủ hoặc chống xem đáp án. Bản sản phẩm thật cần lưu/chấm trên máy chủ và quản lý quyền truy cập nếu dùng cho kiểm tra có giám sát.

Reading giữ các Part 1, 2, 4, 5 của đề gốc, đánh lại thành Part 1–4; bỏ phần sắp chữ viết từ. Mỗi câu đúng 1 điểm. Điểm tổng /40, không quy đổi thành khiên Cambridge.

Audio được cập nhật ngày 15/10/2026 từ thư mục `STARTERS_10_Practice_Tests_AUDIO/Individual_Parts` do người dùng cung cấp. Cả 10 đề đều có 4 file MP3 riêng, tổng 40 file, gắn đúng Test và Part. Chuyển Part sẽ dừng bản đang nghe và mở audio của Part mới từ đầu. Mã phiên bản audio mới giúp trình duyệt tải đúng bộ file đã thay. Các bài Movers/Flyers chỉ hiển thị trạng thái sắp có.

Khi chạy lại công cụ chuẩn bị ảnh, các MP3 đang dùng được giữ nguyên. Để chủ động thay bộ audio, chạy `python tools/prepare_assets.py --audio-dir "<thư mục Individual_Parts>"`. Bản upload cPanel tự chứa các MP3 trong `assets/`, không phụ thuộc đường dẫn thư mục nguồn trên máy tính.

## Chỉnh nhận diện

Màu xanh, navy, vàng và font được khai trong khối `:root` ở đầu `styles.css`. Logo nằm tại `assets/logo.png`. Demo chỉ có chế độ sáng.

## Kiểm tra

`node tools/test-scoring.mjs` kiểm tra hồi quy Test 01. `node tools/test-ten-tests.mjs` kiểm tra cả 10 đề/400 câu, đáp án riêng, trường hợp đúng/sai/bỏ trống, biến thể tên/số và ảnh/audio. `tools/prepare_ten_tests.py` nhập câu hỏi và đáp án từ PDF gốc, lấy ảnh mới đã duyệt và sao chép MP3. Bộ này cần các thư mục nguồn bên ngoài web; hosting chỉ cần các file chạy và tài nguyên đã xuất.


Chức năng tải PDF đã được gỡ. PDF không nằm trong dữ liệu đề, thư mục xuất bản hoặc gói upload; công cụ chuẩn bị đề không sao chép PDF lên web. Các PDF nguồn để biên soạn đề được giữ ngoài thư mục web.
