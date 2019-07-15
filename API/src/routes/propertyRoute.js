import { Router } from 'express';
import propertyController from '../controllers/propertyController';
import UploadImage from '../middleware/imageUpload';
import ValidateProperty from '../middleware/validateProperty';
import validateToken from '../middleware/validateToken';

const router = express.Router();

router.post(
    '/',
    validateToken,
    UploadImage.
)