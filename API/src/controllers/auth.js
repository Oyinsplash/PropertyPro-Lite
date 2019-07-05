import bcrypt from "bcrypt";
import users from "../data/users";
import Helpers from "../helpers/helpers";

class UserController {
  /* eslint camelcase: 0 */
  static async createAccount(req, res) {
    try {
      const { first_name, last_name, email, phoneNumber, address, password } = req.body;
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
        error: "Something went wrong, Please try again soon"
      });
    }
  }
}

export default UserController;
