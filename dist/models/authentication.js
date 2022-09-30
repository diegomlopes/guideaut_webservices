"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const db_1 = require("../db");
const signup = (authentication, callback) => {
    const querySelectString = "SELECT usr_id, usr_email, usr_password, usr_type from tb_users WHERE usr_email=?";
    var error = false;
    db_1.db.query(querySelectString, [authentication.email], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const rows = result;
        if (rows.length > 0) {
            callback("Email already registered.");
            error = true;
        }
        if (!error) {
            const queryString = "INSERT INTO tb_users (usr_email, usr_password, usr_type) VALUES (?, ?, 2)";
            db_1.db.query(queryString, [authentication.email, authentication.password], (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    const insertId = result.insertId;
                    const newAuthentication = {
                        id: insertId,
                        email: authentication.email,
                        password: authentication.password,
                        type: 2
                    };
                    callback(null, newAuthentication);
                }
            });
        }
    });
};
exports.signup = signup;
const signin = (authentication, callback) => {
    const queryString = "SELECT usr_id, usr_email, usr_password, usr_type from tb_users WHERE usr_email=? and usr_password=?";
    db_1.db.query(queryString, [authentication.email, authentication.password], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const rows = result;
        const users = [];
        if (rows.length < 1) {
            callback("User not found");
        }
        else {
            rows.forEach(row => {
                const authentication = {
                    id: row.usr_id,
                    email: row.usr_email,
                    password: row.usr_password,
                    type: row.usr_type
                };
                users.push(authentication);
            });
            callback(null, users[0]);
        }
    });
};
exports.signin = signin;
