class Customer {
    constructor(maNguoiDung, username, password, email, CCCD, status, name) {
        this.maNguoiDung = maNguoiDung;
        this.name = name;
        this.CCCD = CCCD;
        this.email = email
        this.status = status;
        this.username = username;
        this.password = password;
    }
}

module.exports = Customer