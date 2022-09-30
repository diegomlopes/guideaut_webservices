import {Recomendation} from "../types/recomendation";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (recomendation: Recomendation, callback: Function) => {
    const queryString = "INSERT INTO tb_categories (usr_id, cat_description, cat_is_mandatory_reference) VALUES (?, ?, ?)"

    db.beginTransaction(function(err) {
        if (err) { throw err; }
        db.query('INSERT INTO tb_recomendations SET rec_title=?,rec_text=?,usr_id=?', 
            [recomendation.title, 
            recomendation.text, 
            recomendation.user.id],
            function(err, result) {
                if (err) { 
                    db.rollback(function() {
                      throw err;
                    });
                } 

                for(var category in recomendation.categories) {
                    db.query('INSERT INTO tb_recomendations_categories SET rec_id=?,cat_id=?', 
                        [recomendation.id, 
                        category],
                        function(err, result) {
                            if (err) { 
                                db.rollback(function() {
                                throw err;
                                });
                            }

                            recomendation.references.forEach((reference) => {
                                db.query('INSERT INTO tb_references SET ref_description=?,ref_link=?,ref_doi', 
                                    [reference.description, 
                                    reference.link,
                                    reference.doi],
                                    function(err, result) {
                                        if (err) { 
                                            db.rollback(function() {
                                            throw err;
                                            });
                                        } 
                                    }
                                );
                            });
                            
                        }
                    );
                }
            }
        );
    });
    // db.query(
    //   queryString,
    //   [category.idUser, category.description, category.isMandatoryReference],
    //   (err, result) => {
    //     if (err) {callback(err)};
  
    //     const insertId = (<OkPacket> result).insertId;
    //     callback(null, insertId);
    //   }
    // );
};