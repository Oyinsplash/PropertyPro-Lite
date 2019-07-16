import db from "../data/database/index";

class User {
  static async AddUser(
    first_name,
    last_name,
    email,
    password_hash,
    phone_number,
    address
  ) {
    const table = `INSERT INTO
            users(first_name, last_name, email, password_hash, phone_number, address)
            VALUES($1, $2, $3, $4, $5, $6)
            returning *`;
    const values = [
      first_name,
      last_name,
      email,
      password_hash,
      phone_number,
      address
    ];
    const { rows } = await db.query(table, values);
    return rows[0];
  }

  static async searchByEmail(email) {
    const table = `
          SELECT * FROM users WHERE email = $1
      `;
    const values = [email];
    const { rows } = await db.query(table, values);
    return rows[0];
  }

  static async searchById(id) {
    const table = `
          SELECT * FROM users WHERE id = $1
    `;
    const values = [id];
    const { rows } = await db.query(table, values);
    return rows[0];
  }
}

export default User;
