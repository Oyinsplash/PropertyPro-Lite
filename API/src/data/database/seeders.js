import bcrypt from "bcrypt";

const seeder = `
INSERT INTO users (first_name, last_name, email, phone_number, address, password)
VALUES ('oyinkansola', 'alabi', 'alabi.oyinkansola14@outlook.com', '08023182344', '22, ellen road abesan estate', '${bcrypt.hashSync(
  "halabee",
  8
)}');

INSERT INTO properties (owner, price, state, city, address, type, image_url)
VALUES ('1','450000', 'Lagos', 'Surulere', '7, Shonde Street Off Odubiyi', '4 bedroom flat', 'https://res.cloudinary.com/ppropertypro-lite/image/upload/v1562519617/property/images/gbws7csjx' ),
('1','1500000', 'Lagos', 'Isolo', '3, Shodehinde Street', 'Duplex', 'https://res.cloudinary.com/ppropertypro-lite/image/upload' ),
('1','1500000', 'Lagos', 'Surulere', '5, Aborishade Street', 'Mini flat', 'https://res.cloudinary.com/ppropertypro-lite/image/upload/v1562519617/property/images' ); 
`;

export default seeder;
