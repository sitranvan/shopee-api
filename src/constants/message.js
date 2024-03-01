const userMessage = {
    EMAIL_NOT_EMPTY: 'Email không được bỏ trống',
    EMAIL_INVALID: 'Email không hợp lệ',
    PASSWORD_NOT_EMPTY: 'Mật khẩu không được bỏ trống',
    PASSWORD_STRONG: 'Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
    CONFIRM_PASSWORD_NOT_EMPTY: 'Xác nhận mật khẩu không được bỏ trống',
    CONFIRM_PASSWORD_NOT_MATCH: 'Mật khẩu không khớp',
    REGISTER_SUCCESS: 'Đăng ký tài khoản thành công',
    EMAIL_EXISTED: 'Email đã tồn tại trong hệ thống',
    EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email hoặc mật khẩu không chính xác',
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
    REFRESH_TOKEN_INVALID: 'Refresh token không tồn tại hoặc đã hết hạn',
    REFRESH_TOKEN_NOT_EMPTY: 'Refresh token không được bỏ trống'
}

const serverMessage = {
    INTERNAL_SERVER_ERROR: 'Lỗi không xác định',
    NOT_FOUND: 'Không tìm thấy tài nguyên',
    FORBIDDEN: 'Không có quyền truy cập'
}

module.exports = {
    userMessage,
    serverMessage
}
