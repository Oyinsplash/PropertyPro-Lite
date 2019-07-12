import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class Helpers {
  static generateToken(userid, isAdmin) {
    const token = jwt.sign({ userid, isAdmin }, process.env.SIGN_SECRET, {
      expiresIn: "24h"
    });
    return token;
  }
}

export default Helpers;