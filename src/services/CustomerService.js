const customer = require('../models/customer');
const pool = require('../database/client');
const bcrypt = require('bcrypt');


class CustomerService {
    getAll = async (cond = null) => {
        try {
            let query = `SELECT * FROM user`;
            if (cond) {
                query += cond;
            }

            const [result, fields] = await pool.execute(query);
            return result.map(row => {
                return new customer(
                    row.id,
                    row.username,
                    row.password,
                    row.email,
                    row.CCCD,
                    row.status,
                    row.name
                );
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }
    // tìm kiếm tất cả khách hàng với điều kiện
    find = async (id) => {
        const cond = ` WHERE id = ${id}`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return null;
        }
        const customerItem = tmp[0];
        return customerItem;
    }

    // tìm khách hàng theo email
    findByEmail = async (email) => {
        const cond = ` WHERE \`email\` = '${email}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const customerItem = tmp[0];
        return customerItem;
    }

    // tìm khách hàng theo username
    findByUsername = async (username) => {
        const cond = ` WHERE \`username\` = '${username}'`;
        const tmp = await this.getAll(cond);
        if (tmp.length == 0) {
            return false;
        }
        const customerItem = tmp[0];
        return customerItem;
    }

    // thêm mới khách hàng
    save = async (customerData) => {
        // console.log(customerData);
        // const query = ;
        // const values = [
        //     customerData.name,//
        //     customerData.status,//
        //     customerData.password,//
        //     customerData.username//
        // ];
        // console.log(values)
        try {
            const [result] = await pool.execute(`INSERT INTO user (name, username, password, email, status, CCCD) VALUES (?, ?, ?, ?, ?, ?)`, [customerData.name,
            customerData.username,
            customerData.password,
            customerData.email,
            customerData.status,
                '123123123123123'
            ]);
            return result.insertId;;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    // kích hoạt tài khoản
    setActiveStatus = async (email) => {
        const query = `UPDATE user SET status = 1 WHERE email = ?`;
        try {
            const [result] = await pool.execute(query, [email]);
            return result.affectedRows > 0;
        } catch (err) {
            console.error(err);
            return false;
        }
    }




    // cập nhật thông tin khách hàng
    // update = async (customerData) => {
    //     // console.log(customerData);
    //     const query = `UPDATE customer SET name = ?, phone = ?, email = ?, ward_id = ?, status = ?, housenumber_street = ?, shipping_name = ?, shipping_mobile = ?, password = ?, username = ? WHERE id = ?`;
    //     const values = [
    //         customerData.name,
    //         customerData.phone,
    //         customerData.email,
    //         customerData.ward_id,
    //         customerData.status,
    //         customerData.housenumber_street,
    //         customerData.shipping_name,
    //         customerData.shipping_mobile,
    //         customerData.password,
    //         customerData.username,
    //         customerData.id
    //     ];
    //     try {
    //         const [result] = await pool.execute(query, values);
    //         return result.affectedRows > 0;
    //     } catch (err) {
    //         console.error(err);
    //         return false;
    //     }
    // }

    // xóa khách hàng
    // destroy = async (id) => {
    //     const query = `DELETE FROM customer WHERE id = ?`;
    //     try {
    //         const [result] = await pool.execute(query, [id]);
    //         return result.affectedRows > 0;
    //     } catch (err) {
    //         console.error(err);
    //         return false;
    //     }
    // }
}


module.exports = CustomerService;