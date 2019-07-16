import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Helpers {
  static generateToken(id, is_admin) {
    const token = jwt.sign({ id, is_admin }, process.env.SIGN_SECRET, {
      expiresIn: "24h"
    });
    return token;
  }
}

export default Helpers;
