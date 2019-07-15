import properties from "../data/property";
import cloud from "../helpers/cloudinary";
import users from "../data/users";

class PropertyController {
  static async postProperty(req, res) {
    try {
      const { price, state, city, address, type, purpose } = req.body;
      const { status } = req.body;
      const owner = req.data.id;
      const { url: image_url, public_id: image_id } = req.file;

      const floatPrice = parse(price);
      const newProperty = {
        id: properties[properties.length - 1].id + 1,
        owner,
        price: floatPrice,
        state,
        city,
        address,
        type,
        status: "available",
        created_on: new Date().toLocaleString(),
        image_url,
        image_id
      };
      properties.push(newProperty);

      return res.status(201).json({
        status: "success",
        message: "Your property advert has been created successfully",
        data: [newProperty]
      });
    } catch (error) {
      return res.status(500).json({
        status: "500 Server Interval Error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }

  static async updateProperty(req, res) {
    try {
      const { id } = req.params;
      const { price, state, city, address, type, status } = req.body;
      const property = properties.find(
        propId => propId.id === parseInt(id, 10)
      );
      if (!property) {
        return res.status(404).json({
          status: "404 Not Found",
          error: "Property Id not found"
        });
      }
      let image_id;
      let image_url;
      if (req.file) {
        const { public_id, url } = req.file;
        image_id = public_id;
        image_url = url;
      }

      const updatedProperty = {
        id: property.id,
        owner: property.owner,
        price: price || property.price,
        state: state || property.state,
        city: city || property.city,
        address: address || property.address,
        type: type || property.type,
        status: status || property.status,
        image_id: image_id || property.image_id,
        image_url: image_url || property.image_url,
        created_on: property.created_on
      };
      const propertyIndex = properties.findIndex(
        propId => propId.id === parseInt(id, 10)
      );
      properties.splice(propertyIndex, 1, updatedProperty);
      return res.status(200).json({
        status: "success",
        success: "Property has being updated successfully",
        data: updatedProperty
      });
    } catch (error) {
      return res.status(500).json({
        status: "500 internal server error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }

  static async getAllProperties(req, res) {
    try {
      const allProperties = properties.map(property => {
        const {
          id,
          owner,
          price,
          state,
          city,
          address,
          type,
          status,
          created_on,
          image_url,
          image_id
        } = property;
        const {
          email: owner_email,
          phone_number: owner_phone_number
        } = userData.find(({ id: propertyId }) => propertyId === owner);
        return {
          id,
          price,
          state,
          city,
          address,
          type,
          status,
          created_on,
          image_url,
          owner_email,
          owner_phone_number
        };
      });
      return res.status(200).send({
        status: "200 success",
        message: "Successfully retrieved all properties",
        data: allProperties
      });
    } catch (error) {
      return res.status(404).json({
        status: "404 Not Found",
        error: "Property Not Found"
      });
    }
  }

  static async getAProperty(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const aProperty = properties.find(getProperty => getProperty.id === id);
      if (!aProperty) {
        return res.status(404).json({
          status: "Not found",
          error: "Property Id not found"
        });
      }
      const {
        id: currentId,
        status,
        price,
        state,
        city,
        address,
        type,
        created_on,
        image_url,
        owner
      } = aProperty;
      const {
        email: owner_email,
        phone_number: owner_phone_number
      } = userData.find(({ id: propertyId }) => propertyId === owner);
      const newProperty = {
        id: currentId,
        status,
        price,
        state,
        city,
        address,
        type,
        created_on,
        image_url,
        owner_email,
        owner_phone_number
      };
      return res.status(200).json({
        status: 200,
        message: "Property has been successfully retrieved",
        data: newProperty
      });
    } catch (error) {
      return res.status(404).json({
        status: "404 Not found",
        error: "Property does not exist"
      });
    }
  }

  static async markSoldProperty(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const getProperty = properties.find(findPropId => findPropId.id === id);
      if (!getProperty) {
        return res.status(404).json({
          status: "404 Not found",
          error: "Property not found"
        });
      }
      const newlyCreatedPropertyDetails = {
        id: getProperty.id,
        status: "sold",
        owner: getProperty.owner,
        type: getProperty.type,
        state: getProperty.state,
        city: getProperty.city,
        address: getProperty.address,
        price: getProperty.price,
        created_on: getProperty.created_on,
        image_url: getProperty.image_url
      };
      const indexValue = Property.findIndex(propIndex => propIndex.id === id);
      properties.splice(indexValue, 1, newlyCreatedPropertyDetails);
      return res.status(200).json({
        status: "success",
        success: "Property has being updated successfully",
        data: {
          id,
          status: "sold",
          type: getProperty.type,
          state: getProperty.state,
          city: getProperty.city,
          address: getProperty.address,
          price: getProperty.price,
          created_on: getProperty.created_on,
          image_url: getProperty.image_url
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: "500 internal server error",
        error: "Something went wrong, Please try again soon."
      });
    }
  }
  static async deleteProperty(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const index = properties.findIndex(deletedData => deletedData.id === id);
      if (!index) {
        return res.status(404).json({
          status: '404 Not found',
          error: 'Property Not Found'
        });  
      }
      Property.splice(index, 1);
      return res.status(200).json({
        status: 'success',
        message: 'Property has been deleted successfully'
      });
    }catch(error) {
      return res.status(500).send({
        status: '500 Server Internal Error',
        error: '"Something went wrong, Please try again soon."'
      })
    }

}

export default PropertyController;
