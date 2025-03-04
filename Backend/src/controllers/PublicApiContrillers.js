import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createNewsCategoryQuery } from "../models/PublicApiModel.js";

const createNewsCategory = (req, res) => {
  const values = [uuidv4(), req.body.categoryName];
  db.query(createNewsCategoryQuery, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

export { createNewsCategory };
