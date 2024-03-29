const userMessage = {
    EMAIL_NOT_EMPTY: 'Email không được bỏ trống',
    EMAIL_INVALID: 'Email không hợp lệ',
    PASSWORD_NOT_EMPTY: 'Mật khẩu không được bỏ trống',
    PASSWORD_STRONG: 'Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
    CONFIRM_PASSWORD_NOT_EMPTY: 'Xác nhận mật khẩu không được bỏ trống',
    CONFIRM_PASSWORD_NOT_MATCH: 'Mật khẩu không khớp'
}

const serverMessage = {
    INTERNAL_SERVER_ERROR: 'Lỗi không xác định'
}

module.exports = {
    userMessage,
    serverMessage
}
