import bcrypt from "bcrypt";

const users = [
  {
    id: 1,
    first_name: "oyinkansola",
    last_name: "alabi",
    email: "alabi.oyinkansola14@outlook.com",
    phoneNumber: "07033282723",
    address: "3, Skrest Road, Lagos, Nigeria",
    password: bcrypt.hashSync("halabee", 8),
    is_admin: false
  },
  {
    id: 2,
    first_name: "jessica",
    last_name: "alabi",
    email: "alabi.oyinkansola@outlook.com",
    phoneNumber: "07033282563",
    address: "3, Skrest Street, Lagos, Nigeria",
    password: bcrypt.hashSync("alahbee", 8),
    is_admin: false
  }
];

export default users;
