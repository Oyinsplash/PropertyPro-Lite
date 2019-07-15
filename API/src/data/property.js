import faker from "faker";

const properties = [
  {
    id: 1,
    owner: 1,
    price: 450000.0,
    state: "Lagos",
    city: "Surulere",
    address: "7, Shonde Street Off Odubiyi",
    type: "4 bedroom flat",
    image_url: faker.image.imageUrl(),
    purpose: "For Rent",
    status: "Available",
    created_on: new Date().toLocaleString()
  },
  {
    id: 2,
    owner: 1,
    price: 1500000.0,
    state: "Lagos",
    city: "Isolo",
    address: "3, Shodehinde Street",
    type: "5 bedroom duplex",
    image_url: faker.image.imageUrl(),
    purpose: "For Rent",
    status: "Available",
    created_on: new Date().toLocaleString()
  },
  {
    id: 3,
    owner: 2,
    price: 1500000.0,
    state: "Lagos",
    city: "Surulere",
    address: "5, Aborishade Street",
    type: "miniflat",
    image_url: faker.image.imageUrl(),
    purpose: "For Rent",
    status: "Available",
    created_on: new Date().toLocaleString()
  }
];

export default properties;
