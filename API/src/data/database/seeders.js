import bcrypt from "bcrypt";

const seeder = `
INSERT INTO users (first_name, last_name, email, phone_number, address, password_hash, is_admin)
VALUES ('oyinkansola', 'alabi', 'alabi.oyinkansola14@outlook.com', '08023182344', '22, ellen road abesan estate', '${bcrypt.hashSync(
  "halabee",
  8
)}', 'false');

`;

export default seeder;
