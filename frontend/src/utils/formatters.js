export const capitalizeWords = (str) =>
    str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

export const trimWords = (str) => str.trim();

export const formatCurrency = (value) => new Intl.NumberFormat('vi-VN').format(value);
export const equalsIgnoreCaseCustom = (v1, v2) => (v1 + '').trim().toUpperCase() === (v2 + '').trim().toUpperCase()

export const formatResponseLocalDate = (dateAsArr) => dateAsArr ? dateAsArr.map(n => String(n).padStart(2, '0')).join('-') : dateAsArr;

export const formatResponseLocalDateTime = (timeAsArr) => timeAsArr ? new Date(...timeAsArr).toISOString().split(".")[0] : timeAsArr;

export const checkIsBlank = value => value !== 0 && value !== "0" && value !== "false" && value !== false && !value;

// Xuất thêm các hàm khác nếu cần
