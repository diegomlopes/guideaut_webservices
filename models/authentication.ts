import {Authentication} from "../types/authentication";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const signup = (authentication: Authentication, callback: Function) => {
    const querySelectString = "SELECT usr_id, usr_email, usr_password, usr_type from tb_users WHERE usr_email=?"
    var error = false;
    db.query(
        querySelectString,
        [authentication.email],
        (err, result) => {
          if (err) {callback(err)};
    
          const rows = <RowDataPacket[]> result;

          if (rows.length > 0) {
              callback("Email already registered.");
              error = true;
          }

          if (!error) {
            const queryString = "INSERT INTO tb_users (usr_email, usr_password, usr_type) VALUES (?, ?, 2)"
    
            db.query(
            queryString,
            [authentication.email, authentication.password],
            (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    const insertId = (<OkPacket> result).insertId;
                    const newAuthentication: Authentication =  {
                        id: insertId,
                        email: authentication.email,
                        password: authentication.password,
                        type: 2
                    }
                    callback(null, newAuthentication);
                }
            }
            );
            }
        }
    );

};

export const signin = (authentication: Authentication, callback: Function) => {
    const queryString = "SELECT usr_id, usr_email, usr_password, usr_type from tb_users WHERE usr_email=? and usr_password=?"
    
    db.query(
      queryString,
      [authentication.email, authentication.password],
      (err, result) => {
        if (err) {callback(err)};
  
        const rows = <RowDataPacket[]> result;
        const users: Authentication[] = [];

        if (rows.length < 1) {
            callback("User not found");
        } else {
            rows.forEach(row => {
                const authentication: Authentication =  {
                    id: row.usr_id,
                    email: row.usr_email,
                    password: row.usr_password,
                    type: row.usr_type
                }
                users.push(authentication);
            });
            callback(null, users[0]);
        }
      }
    );
};