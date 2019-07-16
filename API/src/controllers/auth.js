import bcrypt from "bcrypt";
import users from "../data/users";
import Helpers from "../helpers/helpers";
import tokenValidator from "../middleware/validateToken";

class UserController {
  /* eslint camelcase: 0 */
  static async createAccount(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        address,
        password
      } = req.body;

      const userExist = users.find(
        ({ email: currentEmail }) => email === currentEmail
      );
      if (userExist)
        return res.status(409).json({
          status: "409 Conflict",
          error: "Email Already Exists"
        });
      let id = 0;
      if (users.length === 0) {
        id = 1;
      } else {
        const lastIndex = users.length - 1;
        id = users[lastIndex].id + 1;
      }
      const password_hash = await bcrypt.hash(password, 8);
      const user = {
        id,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        password: password_hash,
        is_admin: false
      };
      users.push(user);
      const token = Helpers.generateToken(id, false);
      return res.status(201).json({
        status: "Success",
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
          phone_number,
          address
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: "500 Server Internal Error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }

  //  Signin
  static async loginAccount(req, res) {
    try {
      const { email, password } = req.body;

      const userExist = users.find(
        ({ email: currentEmail }) => email === currentEmail
      );
      if (!userExist) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error: "Access is denied due to invalid credentials."
        });
      }
      const validPassword = await bcrypt.compare(password, userExist.password);
      if (!validPassword) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error: "Access is denied due to invalid credentials, check and try again."
        });
      }
      const { id, first_name, last_name, is_admin } = userExist;
      const token = Helpers.generateToken(id, is_admin);
      return res.status(200).json({
        status: "Success",
        data: {
          token,
          id,
          first_name,
          last_name,
          email,
          is_admin
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: "500 Internal Server Error",
        error:
          "The server encountered an internal error or misconfiguration and was unable to complete your request."
      });
    }
  }
}

export default UserController;
