import bcrypt from "bcrypt";
import users from "../data/users";
import Helpers from "../helpers/helpers";

class UserController {
  /* eslint camelcase: 0 */
  static async createAccount(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        phoneNumber,
        address,
        password
      } = req.body;

      const userExist = users.find(
        ({ email: currentEmail }) => email === currentEmail
      );
      if (userExist)
        return res.status(409).json({
          status: "409 Conflict",
          error: "Email has been taken"
        });
      let id = 0;
      if (users.length === 0) {
        id = 1;
      } else {
        const lastIndex = users.length - 1;
        id = users[lastIndex].id + 1;
      }
      const passwordHash = await bcrypt.hash(password, 8);
      const user = {
        id,
        first_name,
        last_name,
        email,
        phoneNumber,
        address,
        password: passwordHash,
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
          email
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: "500 Server Error",
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
          error: "Access is denied due to invalid credentials."
        });
      }
      const { id, first_name, last_name, isAdmin } = userExist;
      const token = Helpers.generateToken(id, isAdmin);
      return res.status(200).json({
        status: "Success",
        data: {
          token,
          id,
          first_name,
          last_name,
          email
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
