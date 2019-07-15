import properties from "../data/property";

class PropertyController {
  static async postAProperty(req, res) {
    try {
      const { price, state, city, address, type, purpose } = req.body;
      let { status } = req.body;
      const author = req.data.id;
      const { url } = req.file;
      let id = 0;
      if (properties.length === 0) {
        id = 1;
      } else {
        const lastIndex = properties.length - 1;
        id = properties[lastIndex].id + 1;
      }
      if (!status) status = "Available";
      const property = {
        id,
        author,
        price,
        state,
        city,
        address,
        type,
        purpose,
        status,
        image_url: url,
        created_on: new Date().toLocaleString()
      };
      const { created_on } = property;
      await property.save();
      return res.status(201).json({
        status: "Success",
        data: {
          id,
          status,
          type,
          state,
          city,
          address,
          price,
          created_on,
          image_url: url,
          purpose
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: "500 Server Interval Error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }
}

export default PropertyController;