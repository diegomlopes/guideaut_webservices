import {Category} from "../types/category";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (category: Category, callback: Function) => {
    const queryString = "INSERT INTO tb_categories (usr_id, cat_description, cat_is_mandatory_reference) VALUES (?, ?, ?)"

    console.log(category.idUser);
    
    db.query(
      queryString,
      [category.idUser, category.description, category.isMandatoryReference],
      (err, result) => {
        if (err) {callback(err)};
  
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
};

export const findAll = (callback: Function) => {
  console.log("Entrou aqui");
    const queryString = `
      SELECT *
      FROM tb_categories`
  
    db.query(queryString, (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const categories: Category[] = [];
  
      rows.forEach(row => {
        const category: Category =  {
            id: row.cat_id,
            idUser: row.usr_id, 
            description: row.cat_description, 
            isMandatoryReference: row.cat_is_mandatory_reference
        }
        categories.push(category);
      });
      callback(null, categories);
    });
  }