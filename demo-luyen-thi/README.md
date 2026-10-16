# Demo luyện thi WeWIN

## Movers Mock 06-15

Đã thêm 10 đề A1 Movers từ `WeWIN_Movers_10_New_Tests_06_15_Full_Pack`. Trang chọn đề có bộ lọc Movers. Mỗi đề có 5 phần Listening /25 và 5 phần Reading có đáp án xác định /29. Reading & Writing Part 6 gồm 6 câu cần giáo viên xem, được lưu riêng và không chấm bằng cách so khớp câu mẫu. Sau khi nộp, phần này hiển thị câu đã viết cùng ví dụ tham khảo. Điểm tự động tổng /54, không phải /60 của bài giấy có giáo viên chấm.

Audio Movers được cập nhật ngày 16/10/2026: 50 MP3 cho Mock 06–15, mỗi đề 5 Part riêng. Có phát/dừng, tua và nghe từ đầu; chuyển Part sẽ dừng bản cũ và mở phần mới. Các MP3 được kiểm tra thời lượng và SHA-256 với nguồn do người dùng cung cấp. Bản này không có chấm Speaking và không tải PDF.

`bootstrap.mjs` chọn giao diện Starters hoặc Movers theo `test` trong URL. `movers.mjs` chứa dữ liệu 10 đề; `movers-app.mjs` hiển thị trang đề gốc, ô trả lời và kết quả. `assets/movers/06` đến `15` chứa hình trang đề, không chứa PDF hay Teacher Guide. `tools/prepare_movers.py` nhập dữ liệu từ bộ đề và đáp án gốc; `node tools/test-movers.mjs` kiểm tra 540 câu có đáp án, 60 câu viết giáo viên, ảnh và 50 file audio theo Part.

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

Audio được cập nhật ngày 15/10/2026 từ thư mục `STARTERS_10_Practice_Tests_AUDIO/Individual_Parts` do người dùng cung cấp. Cả 10 đề đều có 4 file MP3 riêng, tổng 40 file, gắn đúng Test và Part. Chuyển Part sẽ dừng bản đang nghe và mở audio của Part mới từ đầu. Mã phiên bản audio mới giúp trình duyệt tải đúng bộ file đã thay. Movers có bộ 50 audio riêng; Flyers có bộ 50 audio riêng.

Khi chạy lại công cụ chuẩn bị ảnh, các MP3 đang dùng được giữ nguyên. Để chủ động thay bộ audio, chạy `python tools/prepare_assets.py --audio-dir "<thư mục Individual_Parts>"`. Bản upload cPanel tự chứa các MP3 trong `assets/`, không phụ thuộc đường dẫn thư mục nguồn trên máy tính.

## Chỉnh nhận diện

Màu xanh, navy, vàng và font được khai trong khối `:root` ở đầu `styles.css`. Logo nằm tại `assets/logo.png`. Demo chỉ có chế độ sáng.

## Kiểm tra

`node tools/test-scoring.mjs` kiểm tra hồi quy Test 01. `node tools/test-ten-tests.mjs` kiểm tra cả 10 đề/400 câu, đáp án riêng, trường hợp đúng/sai/bỏ trống, biến thể tên/số và ảnh/audio. `tools/prepare_ten_tests.py` nhập câu hỏi và đáp án từ PDF gốc, lấy ảnh mới đã duyệt và sao chép MP3. Bộ này cần các thư mục nguồn bên ngoài web; hosting chỉ cần các file chạy và tài nguyên đã xuất.


Chức năng tải PDF đã được gỡ. PDF không nằm trong dữ liệu đề, thư mục xuất bản hoặc gói upload; công cụ chuẩn bị đề không sao chép PDF lên web. Các PDF nguồn để biên soạn đề được giữ ngoài thư mục web.


## Flyers Mock 06–15

Đã nhập 10 đề từ WeWIN_Flyers_10_Tests_06_15.pdf và đáp án từ WeWIN_Flyers_10_Tests_Keys.pdf. Mỗi đề có 43 câu Reading chấm tự động, 25 câu Listening, 1 bài viết truyện Part 7 lưu riêng cho giáo viên nhận xét. Tổng điểm tự động /68, không cộng bài viết và không quy đổi khiên Cambridge. Biến thể đáp án có dấu / trong keys được chấp nhận. Các câu mở vẫn có thể có cách diễn đạt đúng khác ngoài đáp án gợi ý; giáo viên có thể đối chiếu. Không có chấm Speaking hoặc tải PDF.

50 MP3 riêng cho Mock 06–15 / Part 1–5 được kiểm tra thời lượng và SHA-256 với thư mục nguồn ngày 16/10/2026. tools/prepare_flyers.py nhập đề, ảnh trang đầy đủ và audio; node tools/test-flyers.mjs kiểm tra 680 câu có đáp án, 10 bài viết, ảnh và MP3. bootstrap.mjs chọn giao diện theo test; movers-app.mjs dùng chung cho Movers và Flyers, điểm số lấy theo dữ liệu đề. flyers.mjs chứa bộ Flyers, assets/flyers chứa ảnh và audio. PDF đề và Teacher Keys không đưa lên hosting.


## Đăng ký trước khi luyện thi

Google Form đích: https://docs.google.com/forms/d/e/1FAIpQLSc5bUxbhReVstusCwfhTlXFX5mV-L_35JWzI7EO8LtzFIZkBg/viewform

Form WeWIN xuất hiện ngay khi mở web, hai bước, nền bài luyện làm mờ và không thể thao tác. Giữ nguyên 8 trường và 3 trường bắt buộc (điện thoại, cấp học, mục tiêu). Chỉ mở giao diện sau khi máy chủ đọc được xác nhận Google đã nhận câu trả lời và kiểm tra lại cookie. Khi lỗi giữ nội dung trong bộ nhớ màn hình; không ghi số điện thoại hay câu trả lời vào localStorage, URL hoặc log.

api/lead.mjs dùng Vercel Node.js Function, phụ thuộc lead-server.mjs và lead-fields.mjs. LEAD_GATE_SECRET cần đặt dưới dạng secret trong môi trường Production. Không đưa giá trị secret vào mã nguồn. Xác nhận đăng ký dùng cookie ký HMAC, HttpOnly, SameSite=Lax, Secure trên HTTPS; hiệu lực 30 ngày trên cùng trình duyệt để tránh phụ huynh phải gửi lại khi đổi đề. Đây là cổng thu lead của giao diện web luyện tập hiện tại, không phải hệ thống xác thực tài khoản hay bảo vệ bản quyền các tài nguyên tĩnh.

node tools/test-lead.mjs kiểm thử dữ liệu bắt buộc, ánh xạ entry Google Form, lỗi mạng, trang CAPTCHA không được coi là thành công, chữ ký và hết hạn cookie. Kiểm thử không gửi lead giả lên Google. Chạy bản xem trước có phản hồi mô phỏng bằng node tools/dev-server.mjs --mock-leads tại cổng 8766. Không dùng phản hồi mô phỏng trên hosting. Khi chuyển bản tĩnh sang cPanel cần có endpoint máy chủ tương đương; không tải cookie secret về phía trình duyệt.
