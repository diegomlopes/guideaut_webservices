"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.create = void 0;
const db_1 = require("../db");
const create = (category, callback) => {
    const queryString = "INSERT INTO tb_categories (usr_id, cat_description, cat_is_mandatory_reference) VALUES (?, ?, ?)";
    console.log(category.idUser);
    db_1.db.query(queryString, [category.idUser, category.description, category.isMandatoryReference], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findAll = (callback) => {
    console.log("Entrou aqui");
    const queryString = `
      SELECT *
      FROM tb_categories`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const categories = [];
        rows.forEach(row => {
            const category = {
                id: row.cat_id,
                idUser: row.usr_id,
                description: row.cat_description,
                isMandatoryReference: row.cat_is_mandatory_reference
            };
            categories.push(category);
        });
        callback(null, categories);
    });
};
exports.findAll = findAll;
