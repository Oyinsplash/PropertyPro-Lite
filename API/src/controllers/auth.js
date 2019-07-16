import bcrypt from "bcrypt";
// import users from "../data/users";
import Helpers from "../helpers/helpers";
// import tokenValidator from "../middleware/validateToken";
import User from "../model/user";

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

      const userExist = await User.searchByEmail(email);
      console.log(userExist);
      if (userExist)
        return res.status(409).json({
          status: "409 Conflict",
          error: "Email Already Exists"
        });

      const password_hash = await bcrypt.hash(password, 8);

      const newUser = await User.AddUser(
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        address
      );
      console.log(newUser);

      const { id } = newUser;
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
      console.log(err.stack);
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

      const userExist = await User.searchByEmail(email);
      if (!userExist) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error: "Access is denied due to invalid credentials."
        });
      }
      const validPassword = await bcrypt.compare(
        password,
        userExist.password_hash
      );
      if (!validPassword) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error:
            "Access is denied due to invalid credentials, check and try again."
        });
      }
      const { id, first_name, last_name, is_admin } = userExist;
      const token = Helpers.generateToken(id, is_admin);
      return res.status(200).json({
        status: "Success",
        message: `Welcome ${first_name}, you have successfully logged in`,
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
      console.log(e.stack);
      return res.status(500).json({
        status: "500 Internal Server Error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }
}

export default UserController;
