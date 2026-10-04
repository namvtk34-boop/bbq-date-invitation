# BBQ Date Invitation V2 💗

Website lời mời hẹn ăn thịt nướng. Khi bấm `終わりりり`, lựa chọn ngày/giờ được gửi qua Vercel Serverless Function và tạo một GitHub Issue.

## Deploy trên Vercel
1. Push toàn bộ thư mục này lên repository GitHub `bbq-date-invitation`.
2. Import repository vào Vercel và deploy.
3. Vercel > Project > Settings > Environment Variables, thêm:
   - `GITHUB_TOKEN`: GitHub fine-grained personal access token (KHÔNG commit token vào source).
   - `GITHUB_OWNER`: `namvtk34-boop` (optional; source đã có default).
   - `GITHUB_REPO`: `bbq-date-invitation` (optional; source đã có default).
4. Redeploy sau khi thêm environment variables.

## Quyền GitHub token
Tạo Fine-grained personal access token, chỉ cấp quyền cho repository `bbq-date-invitation`, với repository permission **Issues: Read and write**. Không đưa token vào `index.html`, commit, screenshot công khai hay chat.

## Test
Mở URL Vercel, chọn ngày + giờ > Xác nhận > `終わりりり`. Sau đó vào GitHub repository > Issues để kiểm tra issue mới.
